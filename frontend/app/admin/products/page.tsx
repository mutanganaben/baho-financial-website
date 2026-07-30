"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser } from "@/lib/auth";
import { fetchApi, ApiProduct } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Pagination } from "@/components/ui/pagination";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  AlertCircle,
  RefreshCw,
  X,
  Percent,
  Banknote,
  Calendar,
} from "lucide-react";

export default function AdminProductsPage() {
  const router = useRouter();
  const toast = useToast();

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirm Dialog State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ApiProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "CASH_ADVANCE",
    description: "",
    interestRate: "12",
    interestPeriod: "per month",
    minAmount: "50000",
    maxAmount: "5000000",
    maxTenureMonths: "6",
    featuresText: "",
    isActive: true,
  });

  useEffect(() => {
    const user = getAdminUser();
    const token = getAdminToken();

    if (!token || !user) {
      router.push("/admin/login");
      return;
    }

    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const token = getAdminToken();

    if (!token) return;

    try {
      const data = await fetchApi<ApiProduct[]>("/products/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data || []);
    } catch (err: any) {
      console.error("Failed to load products:", err);
      setErrorMessage(err.message || "Failed to load products list.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      category: "CASH_ADVANCE",
      description: "",
      interestRate: "12",
      interestPeriod: "per month",
      minAmount: "50000",
      maxAmount: "5000000",
      maxTenureMonths: "6",
      featuresText: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: ApiProduct) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      category: p.category,
      description: p.description,
      interestRate: String(p.interestRate),
      interestPeriod: p.interestPeriod || "per month",
      minAmount: String(p.minAmount),
      maxAmount: String(p.maxAmount),
      maxTenureMonths: String(p.maxTenureMonths),
      featuresText: Array.isArray(p.features) ? p.features.join("\n") : "",
      isActive: p.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = getAdminToken();

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: formData.category,
      description: formData.description,
      interestRate: parseFloat(formData.interestRate),
      interestPeriod: formData.interestPeriod,
      minAmount: parseFloat(formData.minAmount),
      maxAmount: parseFloat(formData.maxAmount),
      maxTenureMonths: parseInt(formData.maxTenureMonths, 10),
      features: formData.featuresText
        ? formData.featuresText.split("\n").filter((f) => f.trim().length > 0)
        : [],
      isActive: formData.isActive,
    };

    try {
      if (editingProduct) {
        await fetchApi<{ success: boolean }>(`/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        toast.success("Product Updated", `"${formData.name}" has been updated.`);
      } else {
        await fetchApi<{ success: boolean }>("/products", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        toast.success("Product Created", `"${formData.name}" added to products catalog.`);
      }

      setIsModalOpen(false);
      loadProducts();
    } catch (err: any) {
      toast.error("Save Failed", err.message || "Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (product: ApiProduct) => {
    const token = getAdminToken();
    try {
      await fetchApi<{ success: boolean }>(`/products/${product.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      toast.info(
        `Product ${!product.isActive ? "Activated" : "Deactivated"}`,
        `"${product.name}" is now ${!product.isActive ? "ACTIVE" : "INACTIVE"}.`
      );
      loadProducts();
    } catch (err: any) {
      toast.error("Toggle Failed", err.message || "Failed to toggle status.");
    }
  };

  const promptDelete = (p: ApiProduct) => {
    setProductToDelete(p);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    const token = getAdminToken();
    try {
      await fetchApi<{ success: boolean }>(`/products/${productToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product Deleted", `"${productToDelete.name}" was removed.`);
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
      loadProducts();
    } catch (err: any) {
      toast.error("Delete Failed", err.message || "Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Products
  const filteredProducts = products
    .filter((p) => {
      if (statusFilter === "ACTIVE") return p.isActive;
      if (statusFilter === "INACTIVE") return !p.isActive;
      return true;
    })
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <AdminHeader activePage="products" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Actions & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-baho-navy-dark">Loan Products Directory</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage interest rates, loan limits, tenure terms, and public visibility.
            </p>
          </div>

          <Button
            onClick={handleOpenCreateModal}
            variant="gold"
            className="font-bold text-xs text-slate-950 flex items-center justify-center shadow-md w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Product
          </Button>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            {(["ALL", "ACTIVE", "INACTIVE"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setStatusFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
                  statusFilter === filter
                    ? "bg-[#0B1B33] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {filter === "ALL" ? "ALL PRODUCTS" : filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between text-rose-800 text-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <Button onClick={loadProducts} size="sm" variant="outline" className="border-rose-300 text-rose-900">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
            </Button>
          </div>
        )}

        {/* Products Table */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-baho-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs text-slate-500 font-bold uppercase">Loading Products...</div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm p-4">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Interest Rate</th>
                    <th className="p-4">Loan Limits</th>
                    <th className="p-4">Max Tenure</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                        No products match your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="font-extrabold text-baho-navy-dark text-sm">{p.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{p.slug}</div>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {p.category.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-emerald-700 font-bold">
                            <Percent className="w-3.5 h-3.5 mr-1" />
                            {p.interestRate}% <span className="text-[10px] text-slate-400 ml-1 font-normal">{p.interestPeriod || "per month"}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">
                            RWF {p.minAmount.toLocaleString()} - {p.maxAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-slate-600 font-semibold">
                            <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {p.maxTenureMonths} Months
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleActive(p)}
                            className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full transition-colors ${
                              p.isActive
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {p.isActive ? "ACTIVE" : "INACTIVE"}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <Button
                            onClick={() => handleOpenEditModal(p)}
                            variant="outline"
                            size="sm"
                            className="border-slate-300 text-[#0B1B33] font-bold text-xs hover:bg-[#0B1B33] hover:text-white hover:border-[#0B1B33] transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>

                          <Button
                            onClick={() => promptDelete(p)}
                            variant="outline"
                            size="sm"
                            className="border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors text-xs font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Loan Product"
        description={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteConfirmOpen(false)}
      />

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative text-slate-800 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-baho-gold uppercase">
                {editingProduct ? "Edit Product" : "Create Product"}
              </span>
              <h2 className="text-xl font-extrabold text-baho-navy-dark">
                {editingProduct ? editingProduct.name : "New Financing Product"}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salary Advance Loan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-baho-navy"
                  >
                    <option value="CASH_ADVANCE">CASH ADVANCE</option>
                    <option value="PERSONAL_LOAN">PERSONAL LOAN</option>
                    <option value="STARTUP_BUSINESS_LOAN">STARTUP BUSINESS LOAN</option>
                    <option value="BUSINESS_GROWTH_LOAN">BUSINESS GROWTH LOAN</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short marketing description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Min Amount (RWF)</label>
                  <input
                    type="number"
                    required
                    value={formData.minAmount}
                    onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Max Amount (RWF)</label>
                  <input
                    type="number"
                    required
                    value={formData.maxAmount}
                    onChange={(e) => setFormData({ ...formData, maxAmount: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Max Tenure (Months)</label>
                  <input
                    type="number"
                    required
                    value={formData.maxTenureMonths}
                    onChange={(e) => setFormData({ ...formData, maxTenureMonths: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Features (One per line)</label>
                  <textarea
                    rows={2}
                    placeholder="Quick processing&#10;Flexible terms"
                    value={formData.featuresText}
                    onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-baho-navy rounded focus:ring-baho-navy"
                />
                <label htmlFor="isActive" className="font-bold text-slate-800">
                  Active (Visible on public website)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="border-slate-300 text-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  variant="gold"
                  className="font-bold text-slate-950 shadow-md"
                >
                  {isSaving ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
