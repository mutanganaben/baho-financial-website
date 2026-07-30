"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser, AdminUserSession } from "@/lib/auth";
import { fetchApi } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Pagination } from "@/components/ui/pagination";
import {
  UserPlus,
  Search,
  Edit,
  Trash2,
  KeyRound,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";

export interface AdminUserRecord {
  id: string;
  email: string;
  fullName: string;
  role: "SUPER_ADMIN" | "CREDIT_OFFICER";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const toast = useToast();
  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(null);

  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "SUPER_ADMIN" | "CREDIT_OFFICER">("ALL");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Create / Edit Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [userFormData, setUserFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "CREDIT_OFFICER" as "SUPER_ADMIN" | "CREDIT_OFFICER",
    isActive: true,
  });

  // Reset Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState<AdminUserRecord | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Delete Confirm Dialog State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUserRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const user = getAdminUser();
    const token = getAdminToken();

    if (!token || !user) {
      router.push("/admin/login");
      return;
    }

    setAdminUser(user);
    loadUsers();
  }, [router]);

  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    const token = getAdminToken();

    if (!token) return;

    try {
      const data = await fetchApi<AdminUserRecord[]>("/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data || []);
    } catch (err: any) {
      console.error("Failed to load admin users:", err);
      setErrorMessage(err.message || "Failed to load staff list.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string): string => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setUserFormData({
      fullName: "",
      email: "",
      password: "",
      role: "CREDIT_OFFICER",
      isActive: true,
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditModal = (user: AdminUserRecord) => {
    setEditingUser(user);
    setUserFormData({
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const token = getAdminToken();

    try {
      if (editingUser) {
        await fetchApi<{ success: boolean }>(`/auth/users/${editingUser.id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            fullName: userFormData.fullName,
            email: userFormData.email,
            role: userFormData.role,
            isActive: userFormData.isActive,
          }),
        });
        toast.success("Account Updated", `"${userFormData.fullName}" updated successfully.`);
      } else {
        await fetchApi<{ success: boolean }>("/auth/users", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(userFormData),
        });
        toast.success("Account Created", `"${userFormData.fullName}" added as ${userFormData.role}.`);
      }

      setIsUserModalOpen(false);
      loadUsers();
    } catch (err: any) {
      toast.error("Save Failed", err.message || "Failed to save staff account.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (user: AdminUserRecord) => {
    if (adminUser && user.email.toLowerCase() === adminUser.email.toLowerCase() && user.isActive) {
      toast.warning("Action Restricted", "You cannot deactivate your own logged-in admin account.");
      return;
    }

    const token = getAdminToken();
    try {
      await fetchApi<{ success: boolean }>(`/auth/users/${user.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      toast.info(
        `Staff Account ${!user.isActive ? "Activated" : "Deactivated"}`,
        `"${user.fullName}" access is now ${!user.isActive ? "ACTIVE" : "INACTIVE"}.`
      );
      loadUsers();
    } catch (err: any) {
      toast.error("Toggle Failed", err.message || "Failed to toggle status.");
    }
  };

  const handleOpenResetPasswordModal = (user: AdminUserRecord) => {
    setResetTargetUser(user);
    setNewPassword("");
    setIsPasswordModalOpen(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetTargetUser || !newPassword || newPassword.length < 6) {
      toast.warning("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    setIsResettingPassword(true);
    const token = getAdminToken();

    try {
      await fetchApi<{ success: boolean }>(`/auth/users/${resetTargetUser.id}/reset-password`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ newPassword }),
      });

      toast.success("Password Reset", `Password for "${resetTargetUser.fullName}" updated.`);
      setIsPasswordModalOpen(false);
    } catch (err: any) {
      toast.error("Reset Failed", err.message || "Failed to reset password.");
    } finally {
      setIsResettingPassword(false);
    }
  };

  const promptDeleteUser = (user: AdminUserRecord) => {
    if (adminUser && user.email.toLowerCase() === adminUser.email.toLowerCase()) {
      toast.warning("Action Restricted", "You cannot delete your own logged-in admin account.");
      return;
    }
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    const token = getAdminToken();
    try {
      await fetchApi<{ success: boolean }>(`/auth/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Staff Account Deleted", `"${userToDelete.fullName}" was removed.`);
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
      loadUsers();
    } catch (err: any) {
      toast.error("Delete Failed", err.message || "Failed to delete staff account.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Users
  const filteredUsers = users
    .filter((u) => {
      if (roleFilter === "SUPER_ADMIN") return u.role === "SUPER_ADMIN";
      if (roleFilter === "CREDIT_OFFICER") return u.role === "CREDIT_OFFICER";
      return true;
    })
    .filter((u) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    });

  // Pagination Calculation
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <AdminHeader activePage="users" title="STAFF & USER ACCOUNT MANAGEMENT" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Actions & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-baho-navy-dark">Admin Staff & Credit Officers</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage back-office underwriting staff accounts, roles, access permissions, and passwords.
            </p>
          </div>

          <Button
            onClick={handleOpenCreateModal}
            variant="gold"
            className="font-bold text-xs text-slate-950 flex items-center justify-center shadow-md w-full sm:w-auto"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Create Staff Account
          </Button>
        </div>

        {/* Search & Role Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {(["ALL", "SUPER_ADMIN", "CREDIT_OFFICER"] as const).map((role) => (
              <button
                key={role}
                onClick={() => {
                  setRoleFilter(role);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold uppercase transition-colors whitespace-nowrap ${
                  roleFilter === role
                    ? "bg-[#0B1B33] text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {role === "ALL" ? "ALL ROLES" : role.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search staff..."
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
            <Button onClick={loadUsers} size="sm" variant="outline" className="border-rose-300 text-rose-900">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
            </Button>
          </div>
        )}

        {/* Users Table */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-baho-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs text-slate-500 font-bold uppercase">Loading Staff List...</div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm p-4">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-200">
                    <th className="p-4">Staff Member</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Added</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  {paginatedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 font-bold">
                        No admin staff accounts match your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-[#132A4F] text-white font-black text-xs flex items-center justify-center border-2 border-blue-500/30 flex-shrink-0">
                              {getInitials(u.fullName)}
                            </div>
                            <div className="font-extrabold text-baho-navy-dark text-sm">{u.fullName}</div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-blue-600">{u.email}</td>
                        <td className="p-4">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                              u.role === "SUPER_ADMIN"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                            }`}
                          >
                            {u.role.replace("_", " ")}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleActive(u)}
                            className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full transition-colors ${
                              u.isActive
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                            }`}
                          >
                            {u.isActive ? "ACTIVE" : "INACTIVE"}
                          </button>
                        </td>
                        <td className="p-4 text-slate-500 text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          <Button
                            onClick={() => handleOpenEditModal(u)}
                            variant="outline"
                            size="sm"
                            className="border-slate-300 text-[#0B1B33] font-bold text-xs hover:bg-[#0B1B33] hover:text-white hover:border-[#0B1B33] transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>

                          <Button
                            onClick={() => handleOpenResetPasswordModal(u)}
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-500 hover:text-slate-950 transition-colors"
                          >
                            <KeyRound className="w-3.5 h-3.5 mr-1" />
                            Reset Password
                          </Button>

                          <Button
                            onClick={() => promptDeleteUser(u)}
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
              totalItems={filteredUsers.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Staff Account"
        description={`Are you sure you want to delete "${userToDelete?.fullName}"? This action cannot be undone.`}
        confirmText="Delete Account"
        isLoading={isDeleting}
        onConfirm={confirmDeleteUser}
        onClose={() => setDeleteConfirmOpen(false)}
      />

      {/* CREATE / EDIT USER MODAL */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setIsUserModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-baho-gold uppercase">
                {editingUser ? "Edit Staff Account" : "Create Staff Account"}
              </span>
              <h2 className="text-xl font-extrabold text-baho-navy-dark">
                {editingUser ? editingUser.fullName : "New Admin Staff Member"}
              </h2>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Divine Mukamana"
                  value={userFormData.fullName}
                  onChange={(e) => setUserFormData({ ...userFormData, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="staff@bahofinancial.rw"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              {!editingUser && (
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Password (Min 6 characters)</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••••••"
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Access Role</label>
                <select
                  value={userFormData.role}
                  onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value as any })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:ring-2 focus:ring-baho-navy"
                >
                  <option value="CREDIT_OFFICER">CREDIT OFFICER</option>
                  <option value="SUPER_ADMIN">SUPER ADMIN</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isUserActive"
                  checked={userFormData.isActive}
                  onChange={(e) => setUserFormData({ ...userFormData, isActive: e.target.checked })}
                  className="w-4 h-4 text-baho-navy rounded focus:ring-baho-navy"
                />
                <label htmlFor="isUserActive" className="font-bold text-slate-800">
                  Active (Allowed to sign in to Admin Portal)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
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
                  {isSaving ? "Saving..." : editingUser ? "Update Account" : "Create Account"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {isPasswordModalOpen && resetTargetUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase">
                Reset Password
              </span>
              <h2 className="text-xl font-extrabold text-baho-navy-dark">
                {resetTargetUser.fullName}
              </h2>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">New Password (Min 6 chars)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  variant="outline"
                  className="border-slate-300 text-slate-700"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isResettingPassword}
                  variant="gold"
                  className="font-bold text-slate-950 shadow-md"
                >
                  {isResettingPassword ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
