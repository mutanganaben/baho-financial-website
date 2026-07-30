"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser } from "@/lib/auth";
import { fetchApi, ApiBranch } from "@/lib/api";
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
  MapPin,
  Phone,
  Clock,
  Building,
} from "lucide-react";

export default function AdminBranchesPage() {
  const router = useRouter();
  const toast = useToast();

  const [branches, setBranches] = useState<ApiBranch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<ApiBranch | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirm Dialog State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<ApiBranch | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    province: "KIGALI",
    district: "Nyarugenge",
    address: "",
    phone: "",
    email: "",
    openingHours: "Mon - Fri: 8:00 AM - 5:00 PM",
    latitude: "-1.9441",
    longitude: "30.0619",
    isActive: true,
  });

  useEffect(() => {
    const user = getAdminUser();
    const token = getAdminToken();

    if (!token || !user) {
      router.push("/admin/login");
      return;
    }

    loadBranches();
  }, [router]);

  const loadBranches = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const token = getAdminToken();

    if (!token) return;

    try {
      const data = await fetchApi<ApiBranch[]>("/branches/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(data || []);
    } catch (err: any) {
      console.error("Failed to load branches:", err);
      setErrorMessage(err.message || "Failed to load branches list.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingBranch(null);
    setFormData({
      name: "",
      code: "",
      province: "KIGALI",
      district: "Nyarugenge",
      address: "",
      phone: "",
      email: "",
      openingHours: "Mon - Fri: 8:00 AM - 5:00 PM",
      latitude: "-1.9441",
      longitude: "30.0619",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (b: ApiBranch) => {
    setEditingBranch(b);
    setFormData({
      name: b.name,
      code: b.code,
      province: b.province,
      district: b.district,
      address: b.address,
      phone: b.phone,
      email: b.email || "",
      openingHours: b.openingHours || "Mon - Fri: 8:00 AM - 5:00 PM",
      latitude: b.latitude !== null && b.latitude !== undefined ? String(b.latitude) : "-1.9441",
      longitude: b.longitude !== null && b.longitude !== undefined ? String(b.longitude) : "30.0619",
      isActive: b.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = getAdminToken();

    const payload = {
      name: formData.name,
      code: formData.code || formData.name.substring(0, 3).toUpperCase(),
      province: formData.province,
      district: formData.district,
      address: formData.address,
      phone: formData.phone,
      email: formData.email || undefined,
      openingHours: formData.openingHours,
      latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
      longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      isActive: formData.isActive,
    };

    try {
      if (editingBranch) {
        await fetchApi<{ success: boolean }>(`/branches/${editingBranch.id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        toast.success("Branch Updated", `"${formData.name}" has been updated.`);
      } else {
        await fetchApi<{ success: boolean }>("/branches", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        toast.success("Branch Created", `"${formData.name}" added to branches directory.`);
      }

      setIsModalOpen(false);
      loadBranches();
    } catch (err: any) {
      toast.error("Save Failed", err.message || "Failed to save branch office.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (branch: ApiBranch) => {
    const token = getAdminToken();
    try {
      await fetchApi<{ success: boolean }>(`/branches/${branch.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !branch.isActive }),
      });
      toast.info(
        `Branch ${!branch.isActive ? "Activated" : "Deactivated"}`,
        `"${branch.name}" is now ${!branch.isActive ? "ACTIVE" : "INACTIVE"}.`
      );
      loadBranches();
    } catch (err: any) {
      toast.error("Toggle Failed", err.message || "Failed to toggle branch status.");
    }
  };

  const promptDelete = (b: ApiBranch) => {
    setBranchToDelete(b);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!branchToDelete) return;

    setIsDeleting(true);
    const token = getAdminToken();
    try {
      await fetchApi<{ success: boolean }>(`/branches/${branchToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Branch Deleted", `"${branchToDelete.name}" was removed.`);
      setDeleteConfirmOpen(false);
      setBranchToDelete(null);
      loadBranches();
    } catch (err: any) {
      toast.error("Delete Failed", err.message || "Failed to delete branch office.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Branches
  const filteredBranches = branches
    .filter((b) => {
      if (statusFilter === "ACTIVE") return b.isActive;
      if (statusFilter === "INACTIVE") return !b.isActive;
      return true;
    })
    .filter((b) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.district.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q)
      );
    });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredBranches.length / pageSize);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <AdminHeader activePage="branches" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Actions & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-baho-navy-dark">Regional Branches Directory</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage office locations, contact phone numbers, operating hours, and coordinates.
            </p>
          </div>

          <Button
            onClick={handleOpenCreateModal}
            variant="gold"
            className="font-bold text-xs text-slate-950 flex items-center justify-center shadow-md w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Branch
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
                {filter === "ALL" ? "ALL BRANCHES" : filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search branches..."
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
            <Button onClick={loadBranches} size="sm" variant="outline" className="border-rose-300 text-rose-900">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
            </Button>
          </div>
        )}

        {/* Branches Table */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-baho-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs text-slate-500 font-bold uppercase">Loading Branches...</div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm p-4">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                    <th className="p-4">Branch Office</th>
                    <th className="p-4">Province & District</th>
                    <th className="p-4">Physical Address</th>
                    <th className="p-4">Contact Phone</th>
                    <th className="p-4">Hours</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {paginatedBranches.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                        No branch offices match your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedBranches.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="font-extrabold text-baho-navy-dark text-sm">{b.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{b.code}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{b.district}</div>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {b.province}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-slate-700">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 flex-shrink-0" />
                            <span>{b.address}</span>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-blue-600">
                          <div className="flex items-center">
                            <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            <span>{b.phone}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 text-[11px]">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            <span>{b.openingHours || "Mon - Fri: 8:00 AM - 5:00 PM"}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleActive(b)}
                            className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full transition-colors ${
                              b.isActive
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {b.isActive ? "ACTIVE" : "INACTIVE"}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <Button
                            onClick={() => handleOpenEditModal(b)}
                            variant="outline"
                            size="sm"
                            className="border-slate-300 text-[#0B1B33] font-bold text-xs hover:bg-[#0B1B33] hover:text-white hover:border-[#0B1B33] transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>

                          <Button
                            onClick={() => promptDelete(b)}
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
              totalItems={filteredBranches.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Branch Office"
        description={`Are you sure you want to delete "${branchToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Branch"
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
                {editingBranch ? "Edit Branch" : "Create Branch"}
              </span>
              <h2 className="text-xl font-extrabold text-baho-navy-dark">
                {editingBranch ? editingBranch.name : "New Branch Office"}
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Branch Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Musanze Branch"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Branch Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MSZ-01"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Province</label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-baho-navy"
                  >
                    <option value="KIGALI">KIGALI</option>
                    <option value="SOUTH">SOUTH</option>
                    <option value="WEST">WEST</option>
                    <option value="NORTH">NORTH</option>
                    <option value="EAST">EAST</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">District</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Musanze"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Physical Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Musanze Commercial Center, Room 102"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Contact Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+250 788 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Opening Hours</label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isBranchActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-baho-navy rounded focus:ring-baho-navy"
                />
                <label htmlFor="isBranchActive" className="font-bold text-slate-800">
                  Active (Visible on public branch map)
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
                  {isSaving ? "Saving..." : editingBranch ? "Update Branch" : "Create Branch"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
