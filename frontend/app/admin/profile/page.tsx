"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser, AdminUserSession } from "@/lib/auth";
import { fetchApi } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { User, KeyRound, Shield, Save, CheckCircle2, Lock } from "lucide-react";

export default function AdminProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(null);

  // Profile Form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Security Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const user = getAdminUser();
    const token = getAdminToken();

    if (!token || !user) {
      router.push("/admin/login");
      return;
    }

    setAdminUser(user);
    setFullName(user.fullName);
    setEmail(user.email);
  }, [router]);

  const getInitials = (name: string): string => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    setIsUpdatingProfile(true);
    const token = getAdminToken();

    try {
      const res = await fetchApi<{ success: boolean; data: any }>(`/auth/users/${adminUser.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fullName, email }),
      });

      // Update local storage session
      const updatedSession: AdminUserSession = {
        ...adminUser,
        fullName: res.data.fullName,
        email: res.data.email,
      };
      localStorage.setItem("baho_admin_user", JSON.stringify(updatedSession));
      setAdminUser(updatedSession);

      toast.success("Profile Updated", "Your profile details have been saved successfully.");
    } catch (err: any) {
      toast.error("Update Failed", err.message || "Failed to update profile details.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Weak Password", "New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password Mismatch", "New password and confirmation do not match.");
      return;
    }

    setIsChangingPassword(true);
    const token = getAdminToken();

    try {
      await fetchApi<{ success: boolean }>(`/auth/me/change-password`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Password Changed", "Your password has been updated securely.");
    } catch (err: any) {
      toast.error("Password Change Failed", err.message || "Incorrect current password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Header */}
      <AdminHeader activePage="profile" title="ADMIN USER PROFILE & SECURITY" />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Banner */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 rounded-full bg-baho-gold text-slate-950 font-black text-2xl flex items-center justify-center border-4 border-baho-gold/30 shadow-md flex-shrink-0">
            {getInitials(fullName)}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-baho-navy-dark">{fullName}</h1>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                {adminUser?.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-baho-navy/10 flex items-center justify-center text-baho-navy">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-baho-navy-dark">Personal Information</h2>
                <p className="text-xs text-slate-500 font-medium">Update your account name and email address</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isUpdatingProfile}
                  variant="gold"
                  className="w-full font-bold text-slate-950 shadow-md py-3"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isUpdatingProfile ? "Saving Profile..." : "Save Profile Details"}
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-baho-navy-dark">Security & Password</h2>
                <p className="text-xs text-slate-500 font-medium">Change your current admin sign-in password</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">New Password (Min 6 chars)</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Confirm New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  variant="gold"
                  className="w-full font-bold text-slate-950 shadow-md py-3"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isChangingPassword ? "Updating Password..." : "Update Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
