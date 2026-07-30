"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdminToken, getAdminUser, clearAdminSession, AdminUserSession } from "@/lib/auth";
import { fetchApi, ApiProduct, ApiBranch } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Pagination } from "@/components/ui/pagination";
import {
  Building2,
  LogOut,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  Check,
  X,
  Briefcase,
} from "lucide-react";

export interface ApplicationRecord {
  id: string;
  referenceNumber: string;
  productSlug: string;
  amountRequested: number;
  durationMonths: number;
  fullName: string;
  email?: string;
  phone: string;
  nationalId: string;
  district: string;
  loanPurpose: string;
  preferredBranch?: string;
  notes?: string;
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export interface ContactRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(null);

  const [activeTab, setActiveTab] = useState<"applications" | "contacts">("applications");
  const [appFilter, setAppFilter] = useState<string>("ALL");
  const [contactFilter, setContactFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [branches, setBranches] = useState<ApiBranch[]>([]);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pagination State
  const [appCurrentPage, setAppCurrentPage] = useState(1);
  const [contactCurrentPage, setContactCurrentPage] = useState(1);
  const pageSize = 5;

  // Selected Detail Modals
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    const user = getAdminUser();
    const token = getAdminToken();

    if (!token || !user) {
      router.push("/admin/login");
      return;
    }

    setAdminUser(user);
    loadDashboardData();
  }, [router]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const token = getAdminToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const [appsData, contactsData, productsData, branchesData] = await Promise.all([
        fetchApi<ApplicationRecord[]>("/applications", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetchApi<ContactRecord[]>("/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetchApi<ApiProduct[]>("/products"),
        fetchApi<ApiBranch[]>("/branches"),
      ]);

      setApplications(appsData || []);
      setContacts(contactsData || []);
      setProducts(productsData || []);
      setBranches(branchesData || []);
    } catch (err: any) {
      console.error("Failed to load dashboard data:", err);
      if (err.message?.includes("401") || err.message?.includes("Unauthorized")) {
        clearAdminSession();
        router.push("/admin/login");
      } else {
        setErrorMessage(err.message || "Failed to load records from backend.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  const handleUpdateAppStatus = async (
    id: string,
    newStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  ) => {
    setIsUpdatingStatus(true);
    const token = getAdminToken();

    try {
      await fetchApi<{ success: boolean }>(`/applications/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );

      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }

      toast.success("Application Updated", `Loan application status changed to ${newStatus}.`);
    } catch (err: any) {
      toast.error("Update Failed", err.message || "Failed to update application status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleUpdateContactStatus = async (
    id: string,
    newStatus: "UNREAD" | "READ" | "REPLIED"
  ) => {
    setIsUpdatingStatus(true);
    const token = getAdminToken();

    try {
      await fetchApi<{ success: boolean }>(`/contacts/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );

      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }

      toast.success("Message Updated", `Contact message marked as ${newStatus}.`);
    } catch (err: any) {
      toast.error("Update Failed", err.message || "Failed to update contact message status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Metric Computations
  const pendingAppsCount = applications.filter((a) => a.status === "PENDING").length;
  const approvedAppsCount = applications.filter((a) => a.status === "APPROVED").length;
  const activeProductsCount = products.filter((p) => p.isActive).length;
  const activeBranchesCount = branches.filter((b) => b.isActive).length;
  const unreadContactsCount = contacts.filter((c) => c.status === "UNREAD").length;

  // Filtered Applications
  const filteredApps = applications
    .filter((app) => (appFilter === "ALL" ? true : app.status === appFilter))
    .filter((app) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        app.fullName.toLowerCase().includes(q) ||
        app.referenceNumber.toLowerCase().includes(q) ||
        app.nationalId.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q) ||
        app.district.toLowerCase().includes(q)
      );
    });

  const appTotalPages = Math.ceil(filteredApps.length / pageSize);
  const paginatedApps = filteredApps.slice(
    (appCurrentPage - 1) * pageSize,
    appCurrentPage * pageSize
  );

  // Filtered Contacts
  const filteredContacts = contacts
    .filter((c) => (contactFilter === "ALL" ? true : c.status === contactFilter))
    .filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q)
      );
    });

  const contactTotalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = filteredContacts.slice(
    (contactCurrentPage - 1) * pageSize,
    contactCurrentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Admin Top Navy Header Navigation */}
      <AdminHeader activePage="dashboard" />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 space-y-8">
        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between text-rose-800 text-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <Button
              onClick={loadDashboardData}
              size="sm"
              variant="outline"
              className="border-rose-300 text-rose-900 hover:bg-rose-600 hover:text-white transition-colors font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Retry
            </Button>
          </div>
        )}

        {/* Top Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Total Applications */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
              <span>Total Applications</span>
              <FileText className="w-4 h-4 text-[#0B1B33]" />
            </div>
            <div className="text-3xl font-black text-baho-navy-dark">{applications.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Loan Requests Received</div>
          </div>

          {/* Card 2: Pending Underwriting */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
              <span>Pending Review</span>
              <Clock className="w-4 h-4 text-[#0B1B33]" />
            </div>
            <div className="text-3xl font-black text-baho-navy-dark">{pendingAppsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Awaiting Officer Review</div>
          </div>

          {/* Card 3: Approved Loans */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
              <span>Approved Loans</span>
              <CheckCircle2 className="w-4 h-4 text-[#0B1B33]" />
            </div>
            <div className="text-3xl font-black text-baho-navy-dark">{approvedAppsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Successfully Approved Loans</div>
          </div>

          {/* Card 4: Active Loan Products */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
              <span>Active Products</span>
              <Briefcase className="w-4 h-4 text-[#0B1B33]" />
            </div>
            <div className="text-3xl font-black text-baho-navy-dark">{activeProductsCount}</div>
            <div className="text-xs text-slate-500 font-medium">Available Financing Options</div>
          </div>

          {/* Card 5: Active Branch Locations */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
              <span>Active Branches</span>
              <MapPin className="w-4 h-4 text-[#0B1B33]" />
            </div>
            <div className="text-3xl font-black text-baho-navy-dark">{activeBranchesCount}</div>
            <div className="text-xs text-slate-500 font-medium">Operational Branch Locations</div>
          </div>

          {/* Card 6: Unread Contact Messages */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
              <span>Unread Messages</span>
              <MessageSquare className="w-4 h-4 text-[#0B1B33]" />
            </div>
            <div className="text-3xl font-black text-baho-navy-dark">{unreadContactsCount}</div>
            <div className="text-xs text-slate-500 font-medium">New Client Inquiries</div>
          </div>
        </div>

        {/* Tab Selector Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
                activeTab === "applications"
                  ? "bg-[#0B1B33] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Loan Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
                activeTab === "contacts"
                  ? "bg-[#0B1B33] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                Contact Inquiries ({contacts.length})
                {unreadContactsCount > 0 && (
                  <span className="ml-1.5 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {unreadContactsCount}
                  </span>
                )}
              </span>
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Loading Spinner State */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-baho-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
              Loading Database Records...
            </div>
          </div>
        ) : activeTab === "applications" ? (
          /* APPLICATIONS TAB CONTENT */
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1 text-[#0B1B33]" /> Filter Status:
              </span>
              {["ALL", "PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setAppFilter(status)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    appFilter === status
                      ? "bg-[#0B1B33] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {status === "ALL" ? "ALL STATUSES" : status.replace("_", " ")}
                </button>
              ))}
            </div>

            {/* Applications Table */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                      <th className="p-4">Reference</th>
                      <th className="p-4">Applicant Name</th>
                      <th className="p-4">Phone / Location</th>
                      <th className="p-4">Product Slug</th>
                      <th className="p-4">Amount Requested</th>
                      <th className="p-4">Term</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {paginatedApps.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 font-bold">
                          No loan applications match your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedApps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-mono font-bold text-baho-navy-dark">
                            {app.referenceNumber}
                          </td>
                          <td className="p-4 font-bold text-baho-navy-dark">{app.fullName}</td>
                          <td className="p-4 space-y-0.5">
                            <div className="font-semibold">{app.phone}</div>
                            <div className="text-[10px] text-slate-500">{app.district}</div>
                          </td>
                          <td className="p-4">
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded border border-slate-200/80 uppercase">
                              {app.productSlug}
                            </span>
                          </td>
                          <td className="p-4 font-extrabold text-baho-navy-dark">
                            RWF {app.amountRequested.toLocaleString()}
                          </td>
                          <td className="p-4">{app.durationMonths} Months</td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                app.status === "PENDING"
                                  ? "bg-slate-100 text-slate-800 border border-slate-200"
                                  : app.status === "UNDER_REVIEW"
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : app.status === "APPROVED"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : "bg-rose-100 text-rose-800 border border-rose-200"
                              }`}
                            >
                              {app.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              onClick={() => setSelectedApp(app)}
                              variant="outline"
                              size="sm"
                              className="border-slate-300 text-[#0B1B33] font-bold text-xs hover:bg-[#0B1B33] hover:text-white hover:border-[#0B1B33] transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100">
                <Pagination
                  currentPage={appCurrentPage}
                  totalPages={appTotalPages}
                  totalItems={filteredApps.length}
                  pageSize={pageSize}
                  onPageChange={(page) => setAppCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        ) : (
          /* CONTACT MESSAGES TAB CONTENT */
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1 text-[#0B1B33]" /> Filter Status:
              </span>
              {["ALL", "UNREAD", "READ", "REPLIED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setContactFilter(status)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    contactFilter === status
                      ? "bg-[#0B1B33] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Contacts Table */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                      <th className="p-4">Date</th>
                      <th className="p-4">Sender Name</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Message Snippet</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {paginatedContacts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                          No contact inquiry messages match your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedContacts.map((msg) => (
                        <tr key={msg.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 text-slate-500 text-[11px]">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 font-bold text-baho-navy-dark">{msg.fullName}</td>
                          <td className="p-4 space-y-0.5">
                            <div className="font-semibold text-blue-600">{msg.email}</div>
                            <div className="text-[10px] text-slate-500">{msg.phone || "—"}</div>
                          </td>
                          <td className="p-4 font-semibold text-slate-900">{msg.subject}</td>
                          <td className="p-4 text-slate-600 max-w-xs truncate">
                            {msg.message}
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                msg.status === "UNREAD"
                                  ? "bg-blue-100 text-blue-900 border border-blue-200"
                                  : msg.status === "READ"
                                  ? "bg-slate-100 text-slate-700 border border-slate-200"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              }`}
                            >
                              {msg.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              onClick={() => setSelectedContact(msg)}
                              variant="outline"
                              size="sm"
                              className="border-slate-300 text-[#0B1B33] font-bold text-xs hover:bg-[#0B1B33] hover:text-white hover:border-[#0B1B33] transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              View Message
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-100">
                <Pagination
                  currentPage={contactCurrentPage}
                  totalPages={contactTotalPages}
                  totalItems={filteredContacts.length}
                  pageSize={pageSize}
                  onPageChange={(page) => setContactCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: APPLICATION DETAILS & UNDERWRITING ACTIONS */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-extrabold text-[#0B1B33] uppercase tracking-wider">
                {selectedApp.referenceNumber}
              </span>
              <h2 className="text-2xl font-extrabold text-baho-navy-dark">
                Loan Application Underwriting
              </h2>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Applicant Full Name</div>
                <div className="text-sm font-black text-baho-navy-dark">{selectedApp.fullName}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">National ID (16 Digits)</div>
                <div className="text-sm font-mono font-bold text-slate-900">{selectedApp.nationalId}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Phone Number</div>
                <div className="text-sm font-bold text-blue-600">{selectedApp.phone}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Residential Location</div>
                <div className="text-sm font-bold text-slate-900">{selectedApp.district}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Product Category</div>
                <div className="text-sm font-bold text-baho-navy-dark uppercase">{selectedApp.productSlug}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Requested Amount</div>
                <div className="text-sm font-black text-baho-navy-dark">
                  RWF {selectedApp.amountRequested.toLocaleString()} ({selectedApp.durationMonths} Months)
                </div>
              </div>

              <div className="sm:col-span-2 p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Loan Purpose & Business Description</div>
                <div className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedApp.loanPurpose}
                </div>
              </div>
            </div>

            {/* Underwriting Status Action Controls */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Change Underwriting Status:
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  disabled={isUpdatingStatus || selectedApp.status === "UNDER_REVIEW"}
                  onClick={() => handleUpdateAppStatus(selectedApp.id, "UNDER_REVIEW")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Mark Under Review
                </Button>

                <Button
                  disabled={isUpdatingStatus || selectedApp.status === "APPROVED"}
                  onClick={() => handleUpdateAppStatus(selectedApp.id, "APPROVED")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Approve Application
                </Button>

                <Button
                  disabled={isUpdatingStatus || selectedApp.status === "REJECTED"}
                  onClick={() => handleUpdateAppStatus(selectedApp.id, "REJECTED")}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  Reject Application
                </Button>

                <Button
                  disabled={isUpdatingStatus || selectedApp.status === "PENDING"}
                  onClick={() => handleUpdateAppStatus(selectedApp.id, "PENDING")}
                  variant="outline"
                  className="border-slate-300 text-slate-800 hover:bg-slate-800 hover:text-white transition-colors text-xs font-bold"
                >
                  Reset to Pending
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONTACT MESSAGE DETAILS */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-[#0B1B33] uppercase">
                {selectedContact.subject}
              </span>
              <h2 className="text-2xl font-extrabold text-baho-navy-dark">
                Contact Inquiry Message
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="text-slate-500 font-bold">Sender Details</div>
                <div className="text-sm font-bold text-baho-navy-dark">{selectedContact.fullName}</div>
                <div className="text-blue-600 font-medium">{selectedContact.email}</div>
                <div className="text-slate-600 font-medium">{selectedContact.phone || "No phone provided"}</div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <div className="text-slate-500 font-bold">Message Content</div>
                <div className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Received on {new Date(selectedContact.createdAt).toLocaleString()}
              </div>

              <div className="flex space-x-2">
                {selectedContact.status !== "READ" && (
                  <Button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateContactStatus(selectedContact.id, "READ")}
                    variant="outline"
                    className="border-slate-300 text-slate-800 hover:bg-slate-800 hover:text-white transition-colors text-xs font-bold"
                  >
                    Mark as Read
                  </Button>
                )}

                {selectedContact.status !== "REPLIED" && (
                  <Button
                    disabled={isUpdatingStatus}
                    onClick={() => handleUpdateContactStatus(selectedContact.id, "REPLIED")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Mark as Replied
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
