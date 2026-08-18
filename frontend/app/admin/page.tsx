"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { getAdminToken, getAdminUser, clearAdminSession, AdminUserSession } from "@/lib/auth";
import { fetchApi, ApiBranch } from "@/lib/api";
import {
  Plus,
  Upload,
  Trash2,
  LogOut,
} from "lucide-react";

// --- TYPES & INTERFACES ---
export type AdminTab = "settings" | "branches" | "team" | "applications" | "inquiries";

export interface SettingsForm {
  companyName: string;
  phone: string;
  email: string;
  address: string;
}

export interface BranchRecord {
  id: string;
  name: string;
  district: string;
  phone: string;
  managerName: string;
  managerPhoto?: string;
  code?: string;
}

export interface TeamMemberRecord {
  id: string;
  fullName: string;
  roleEnglish: string;
  roleKinyarwanda: string;
  photo?: string;
}

export interface LoanApplicationRecord {
  id: string;
  referenceNumber: string;
  fullName: string;
  productSlug: string;
  productName?: string;
  amountRequested: number;
  durationMonths: number;
  phone: string;
  email?: string;
  preferredBranch?: string;
  loanPurpose: string;
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  fullName: string;
  phone?: string;
  email: string;
  subject?: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: string;
}

// Initial Seed Data
const DEFAULT_SETTINGS: SettingsForm = {
  companyName: "BAHO Financial Ltd.",
  phone: "+250 788 367 900",
  email: "info@bahofinancial.com",
  address: "KG 9 Ave, Kigali, Rwanda",
};

const INITIAL_BRANCHES: BranchRecord[] = [
  {
    id: "branch-1",
    name: "Kigali Head Office (Kabuga)",
    district: "Kicukiro / Gasabo",
    phone: "+250 788 367 900",
    managerName: "Jean Paul Nsabimana",
    managerPhoto: "",
  },
  {
    id: "branch-2",
    name: "Kamonyi Branch (Ruyenzi)",
    district: "Kamonyi",
    phone: "+250 788 367 901",
    managerName: "Alice Uwamahoro",
    managerPhoto: "",
  },
  {
    id: "branch-3",
    name: "Nyagatare Branch (Rwimiyaga)",
    district: "Nyagatare",
    phone: "+250 788 367 902",
    managerName: "Eric Mugisha",
    managerPhoto: "",
  },
  {
    id: "branch-4",
    name: "Nyagatare Branch (Rukomo)",
    district: "Nyagatare",
    phone: "+250 788 367 903",
    managerName: "Divine Uwase",
    managerPhoto: "",
  },
];

const INITIAL_TEAM: TeamMemberRecord[] = [
  {
    id: "team-1",
    fullName: "Operations and Business Manager",
    roleEnglish: "Operations and Business Manager",
    roleKinyarwanda: "Umuyobozi w'Ibikorwa n'Ubucuruzi",
    photo: "",
  },
  {
    id: "team-2",
    fullName: "Finance & Administration",
    roleEnglish: "Finance & Administration Manager",
    roleKinyarwanda: "Umuyobozi w'Imari n'Ubuyobozi",
    photo: "",
  },
  {
    id: "team-3",
    fullName: "Managing Director",
    roleEnglish: "Managing Director & CEO",
    roleKinyarwanda: "Umuyobozi Mukuru",
    photo: "",
  },
];

function AdminPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const activeTabParam = (searchParams.get("tab") as AdminTab) || "settings";
  const [activeTab, setActiveTab] = useState<AdminTab>(activeTabParam);

  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<SettingsForm>(DEFAULT_SETTINGS);

  // Branches State
  const [branches, setBranches] = useState<BranchRecord[]>(INITIAL_BRANCHES);

  // Team State
  const [teamMembers, setTeamMembers] = useState<TeamMemberRecord[]>(INITIAL_TEAM);

  // Applications State
  const [applications, setApplications] = useState<LoanApplicationRecord[]>([]);

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);

  // File Input Refs for Branch & Team Photo Uploads
  const branchFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const teamFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const user = getAdminUser();
    const token = getAdminToken();

    if (!token || !user) {
      router.push("/admin/login");
      return;
    }
    setAdminUser(user);

    const t = searchParams.get("tab") as AdminTab;
    if (t && ["settings", "branches", "team", "applications", "inquiries"].includes(t)) {
      setActiveTab(t);
    }

    loadAdminData();
  }, [searchParams, router]);

  const loadAdminData = async () => {
    setIsLoading(true);
    const token = getAdminToken();

    try {
      const [appsData, contactsData, branchesData] = await Promise.all([
        fetchApi<any[]>("/applications", {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => null),
        fetchApi<any[]>("/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => null),
        fetchApi<any[]>("/branches").catch(() => null),
      ]);

      if (appsData && Array.isArray(appsData)) {
        setApplications(
          appsData.map((item) => ({
            id: item.id,
            referenceNumber: item.referenceNumber || `REF-${item.id.slice(0, 6)}`,
            fullName: item.fullName,
            productSlug: item.productSlug,
            productName: item.productSlug ? item.productSlug.replace("-", " ").toUpperCase() : "LOAN",
            amountRequested: item.amountRequested,
            durationMonths: item.durationMonths,
            phone: item.phone,
            email: item.email,
            preferredBranch: item.preferredBranch || "Kigali Head Office",
            loanPurpose: item.loanPurpose,
            status: item.status || "PENDING",
            createdAt: item.createdAt || new Date().toISOString(),
          }))
        );
      }

      if (contactsData && Array.isArray(contactsData)) {
        setInquiries(
          contactsData.map((item) => ({
            id: item.id,
            fullName: item.fullName,
            phone: item.phone,
            email: item.email,
            subject: item.subject || "General Contact Inquiry",
            message: item.message,
            status: item.status || "UNREAD",
            createdAt: item.createdAt || new Date().toISOString(),
          }))
        );
      }

      if (branchesData && Array.isArray(branchesData) && branchesData.length > 0) {
        setBranches(
          branchesData.map((b) => ({
            id: b.id,
            name: b.name,
            district: b.district,
            phone: b.phone,
            managerName: b.managerName || "Branch Manager",
            managerPhoto: b.managerPhoto || "",
            code: b.code,
          }))
        );
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    router.push(`/admin?tab=${tab}`);
  };

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings Saved", "Company overview configuration updated successfully.");
  };

  // --- BRANCHES HANDLERS ---
  const handleBranchChange = (id: string, field: keyof BranchRecord, value: string) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleAddBranch = () => {
    const newId = `branch-${Date.now()}`;
    const newBranch: BranchRecord = {
      id: newId,
      name: "New Regional Branch",
      district: "Kigali",
      phone: "+250 788 000 000",
      managerName: "Branch Manager",
      managerPhoto: "",
    };
    setBranches((prev) => [...prev, newBranch]);
    toast.success("Branch Created", "New branch block added. Fill details and click Save.");
  };

  const handleSaveBranch = (id: string) => {
    const branch = branches.find((b) => b.id === id);
    toast.success("Branch Saved", `Saved changes for ${branch?.name || "branch"}.`);
  };

  const handleBranchPhotoUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      handleBranchChange(id, "managerPhoto", dataUrl);
      toast.success("Photo Uploaded", "Manager photo updated.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBranchPhoto = (id: string) => {
    handleBranchChange(id, "managerPhoto", "");
    toast.success("Photo Removed", "Manager photo removed.");
  };

  const handleDeleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    toast.success("Branch Removed", "Branch block deleted.");
  };

  // --- TEAM HANDLERS ---
  const handleTeamChange = (id: string, field: keyof TeamMemberRecord, value: string) => {
    setTeamMembers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleAddTeamMember = () => {
    const newId = `team-${Date.now()}`;
    const newMember: TeamMemberRecord = {
      id: newId,
      fullName: "New Team Position",
      roleEnglish: "Department Manager",
      roleKinyarwanda: "Umuyobozi w'Ishami",
      photo: "",
    };
    setTeamMembers((prev) => [...prev, newMember]);
    toast.success("Member Added", "New leadership member block created.");
  };

  const handleSaveTeamMember = (id: string) => {
    const member = teamMembers.find((t) => t.id === id);
    toast.success("Member Saved", `Saved details for ${member?.roleEnglish || "member"}.`);
  };

  const handleTeamPhotoUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      handleTeamChange(id, "photo", dataUrl);
      toast.success("Photo Uploaded", "Leadership photo updated.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveTeamPhoto = (id: string) => {
    handleTeamChange(id, "photo", "");
    toast.success("Photo Removed", "Leadership photo removed.");
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((t) => t.id !== id));
    toast.success("Member Removed", "Leadership block deleted.");
  };

  // --- LOAN APPLICATIONS HANDLERS ---
  const handleUpdateAppStatus = async (
    id: string,
    newStatus: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED"
  ) => {
    const token = getAdminToken();
    try {
      if (token) {
        await fetchApi(`/applications/${id}/status`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status: newStatus }),
        }).catch(() => null);
      }

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      toast.success("Status Updated", `Loan application status changed to ${newStatus}.`);
    } catch (err) {
      toast.error("Error", "Failed to update application status.");
    }
  };

  // --- INQUIRIES HANDLERS ---
  const handleToggleInquiryRead = async (id: string) => {
    const inquiry = inquiries.find((i) => i.id === id);
    if (!inquiry) return;
    const newStatus = inquiry.status === "UNREAD" ? "READ" : "UNREAD";
    const token = getAdminToken();

    try {
      if (token) {
        await fetchApi(`/contacts/${id}/status`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status: newStatus }),
        }).catch(() => null);
      }

      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      toast.success(
        "Message Status Updated",
        `Inquiry marked as ${newStatus.toLowerCase()}.`
      );
    } catch (err) {
      toast.error("Error", "Failed to update inquiry status.");
    }
  };

  const unreadInquiriesCount = inquiries.filter((i) => i.status === "UNREAD").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Standard Website Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Banner Section */}
        <section className="bg-[#0B1B33] text-white py-12 sm:py-16 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-3 text-slate-300 font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-slate-300 inline-block" />
              <span>CONTROL PANEL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Admin
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed">
              Update settings, team and branches below. Changes render immediately.
            </p>

            <div className="pt-2">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-600 text-white hover:bg-white hover:text-slate-900 font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Log out
              </Button>
            </div>
          </Container>
        </section>

        {/* Section 2: Flat Tab Bar Navigation */}
        <div className="bg-white pt-8 sm:pt-12 border-b border-slate-200">
          <Container>
            <div className="flex items-center space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none">
              {/* Tab 1: Settings */}
              <button
                onClick={() => handleTabChange("settings")}
                className={`py-4 text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 border-b-2 ${
                  activeTab === "settings"
                    ? "border-baho-navy text-baho-navy -mb-px"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Settings</span>
              </button>

              {/* Tab 2: Branches */}
              <button
                onClick={() => handleTabChange("branches")}
                className={`py-4 text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 border-b-2 ${
                  activeTab === "branches"
                    ? "border-baho-navy text-baho-navy -mb-px"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Branches ({branches.length})</span>
              </button>

              {/* Tab 3: Team */}
              <button
                onClick={() => handleTabChange("team")}
                className={`py-4 text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 border-b-2 ${
                  activeTab === "team"
                    ? "border-baho-navy text-baho-navy -mb-px"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Team ({teamMembers.length})</span>
              </button>

              {/* Tab 4: Loan Applications */}
              <button
                onClick={() => handleTabChange("applications")}
                className={`py-4 text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 border-b-2 ${
                  activeTab === "applications"
                    ? "border-baho-navy text-baho-navy -mb-px"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Loan Applications ({applications.length})</span>
              </button>

              {/* Tab 5: Inquiries */}
              <button
                onClick={() => handleTabChange("inquiries")}
                className={`py-4 text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap flex items-center space-x-2 border-b-2 ${
                  activeTab === "inquiries"
                    ? "border-baho-navy text-baho-navy -mb-px"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Inquiries ({inquiries.length})</span>
              </button>
            </div>
          </Container>
        </div>

        {/* Section 3: CMS Tab Content Views */}
        <Container className="py-8 sm:py-10">
          <div className="max-w-5xl">
            {/* ========================================================================= */}
            {/* TAB 1: SETTINGS (Overview Form) */}
            {/* ========================================================================= */}
            {activeTab === "settings" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <h2 className="text-xl sm:text-2xl font-bold text-baho-navy-dark">Overview</h2>

                <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm max-w-2xl">
                  {/* Field 1: Company Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                      required
                    />
                  </div>

                  {/* Field 2: Phone */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                      required
                    />
                  </div>

                  {/* Field 3: Email */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                      required
                    />
                  </div>

                  {/* Field 4: Address */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                      Address
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                      required
                    />
                  </div>

                  {/* Save Changes Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="bg-baho-navy hover:bg-[#183B6B] text-white font-bold py-3 px-8 rounded-xl shadow-sm text-sm"
                    >
                      Save changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: BRANCHES (2-Column Grid) */}
            {/* ========================================================================= */}
            {activeTab === "branches" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-baho-navy-dark">Regional Branches</h2>
                  <Button
                    onClick={handleAddBranch}
                    className="bg-baho-navy hover:bg-[#183B6B] text-white font-bold px-5 py-2.5 rounded-xl shadow-sm text-xs sm:text-sm inline-flex items-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add branch</span>
                  </Button>
                </div>

                {/* 2-Column Branch Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {branches.map((branch) => (
                    <div
                      key={branch.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Branch Name */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Branch Name
                          </label>
                          <input
                            type="text"
                            value={branch.name}
                            onChange={(e) => handleBranchChange(branch.id, "name", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                          />
                        </div>

                        {/* District */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            District
                          </label>
                          <input
                            type="text"
                            value={branch.district}
                            onChange={(e) => handleBranchChange(branch.id, "district", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Phone
                          </label>
                          <input
                            type="text"
                            value={branch.phone}
                            onChange={(e) => handleBranchChange(branch.id, "phone", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                          />
                        </div>

                        {/* Branch Manager Name */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Branch Manager Name
                          </label>
                          <input
                            type="text"
                            value={branch.managerName}
                            onChange={(e) => handleBranchChange(branch.id, "managerName", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                          />
                        </div>

                        {/* Manager Photo Upload Field */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Manager Photo
                          </label>

                          {branch.managerPhoto && (
                            <div className="mb-2 relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                              <Image src={branch.managerPhoto} alt="Manager" fill className="object-cover" />
                            </div>
                          )}

                          <input
                            type="file"
                            accept="image/*"
                            ref={(el) => { branchFileInputRefs.current[branch.id] = el; }}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleBranchPhotoUpload(branch.id, e.target.files[0]);
                              }
                            }}
                          />

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => branchFileInputRefs.current[branch.id]?.click()}
                            className="w-full justify-center border-slate-300 text-slate-700 font-bold text-xs py-2 rounded-xl hover:bg-white hover:text-slate-700 hover:border-slate-300 shadow-none"
                          >
                            <Upload className="w-3.5 h-3.5 mr-1.5" />
                            <span>{branch.managerPhoto ? "Change photo" : "Upload photo"}</span>
                          </Button>

                          {branch.managerPhoto && (
                            <button
                              type="button"
                              onClick={() => handleRemoveBranchPhoto(branch.id)}
                              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer inline-block mt-1.5"
                            >
                              Remove photo
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Independent Save Button for this Branch */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <Button
                          type="button"
                          onClick={() => handleSaveBranch(branch.id)}
                          className="bg-baho-navy hover:bg-[#183B6B] text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm"
                        >
                          Save changes
                        </Button>

                        <button
                          type="button"
                          onClick={() => handleDeleteBranch(branch.id)}
                          className="text-slate-400 hover:text-rose-600 p-2"
                          title="Delete Branch"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: TEAM (2-Column Grid) */}
            {/* ========================================================================= */}
            {activeTab === "team" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-baho-navy-dark">Our Leadership Team</h2>
                  <Button
                    onClick={handleAddTeamMember}
                    className="bg-baho-navy hover:bg-[#183B6B] text-white font-bold px-5 py-2.5 rounded-xl shadow-sm text-xs sm:text-sm inline-flex items-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add member</span>
                  </Button>
                </div>

                {/* 2-Column Team Member Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={member.fullName}
                            onChange={(e) => handleTeamChange(member.id, "fullName", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                          />
                        </div>

                        {/* Role */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Role
                          </label>
                          <input
                            type="text"
                            value={member.roleEnglish}
                            onChange={(e) => handleTeamChange(member.id, "roleEnglish", e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy"
                          />
                        </div>

                        {/* Photo Upload Field */}
                        <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                            Photo
                          </label>

                          {member.photo && (
                            <div className="mb-2 relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                              <Image src={member.photo} alt="Team Member" fill className="object-cover" />
                            </div>
                          )}

                          <input
                            type="file"
                            accept="image/*"
                            ref={(el) => { teamFileInputRefs.current[member.id] = el; }}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleTeamPhotoUpload(member.id, e.target.files[0]);
                              }
                            }}
                          />

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => teamFileInputRefs.current[member.id]?.click()}
                            className="w-full justify-center border-slate-300 text-slate-700 font-bold text-xs py-2 rounded-xl hover:bg-white hover:text-slate-700 hover:border-slate-300 shadow-none"
                          >
                            <Upload className="w-3.5 h-3.5 mr-1.5" />
                            <span>{member.photo ? "Change photo" : "Upload photo"}</span>
                          </Button>

                          {member.photo && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTeamPhoto(member.id)}
                              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer inline-block mt-1.5"
                            >
                              Remove photo
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Independent Save Button for this Member */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <Button
                          type="button"
                          onClick={() => handleSaveTeamMember(member.id)}
                          className="bg-baho-navy hover:bg-[#183B6B] text-white font-bold py-2.5 px-6 rounded-xl text-xs sm:text-sm"
                        >
                          Save changes
                        </Button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTeamMember(member.id)}
                          className="text-slate-400 hover:text-rose-600 p-2"
                          title="Delete Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: LOAN APPLICATIONS (Plain List - No Card Shell) */}
            {/* ========================================================================= */}
            {activeTab === "applications" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <h2 className="text-xl sm:text-2xl font-bold text-baho-navy-dark">Recent Applications</h2>

                <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
                  {applications.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 font-medium">
                      No loan applications submitted yet.
                    </div>
                  ) : (
                    applications.map((app) => (
                      <div key={app.id} className="py-5 sm:py-6 space-y-2">
                        {/* Applicant Name (Bold) */}
                        <div className="text-base font-bold text-baho-navy-dark">
                          {app.fullName}
                        </div>

                        {/* Loan Type · Amount */}
                        <div className="text-sm font-semibold text-slate-900">
                          {app.productName} · <span className="font-extrabold text-baho-navy">RWF {app.amountRequested.toLocaleString()}</span> ({app.durationMonths} Months)
                        </div>

                        {/* Phone · Email */}
                        <div className="text-xs text-slate-600 font-medium">
                          {app.phone} {app.email ? `· ${app.email}` : ""}
                        </div>

                        {/* Branch · Date submitted */}
                        <div className="text-xs text-slate-400 font-medium">
                          {app.preferredBranch || "Kigali Head Office"} · {new Date(app.createdAt).toLocaleDateString()}
                        </div>

                        {/* Purpose as Italic Text */}
                        {app.loanPurpose && (
                          <div className="text-sm text-slate-600 italic font-normal pt-1">
                            &quot;{app.loanPurpose}&quot;
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 5: INQUIRIES (Plain List - No Card Shell) */}
            {/* ========================================================================= */}
            {activeTab === "inquiries" && (
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                <h2 className="text-xl sm:text-2xl font-bold text-baho-navy-dark">Client Inquiries</h2>

                <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
                  {inquiries.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 font-medium">
                      No contact inquiries received yet.
                    </div>
                  ) : (
                    inquiries.map((msg) => (
                      <div
                        key={msg.id}
                        className="py-5 sm:py-6 space-y-2"
                      >
                        {/* Sender Full Name (Bold) */}
                        <div className="text-base font-bold text-baho-navy-dark">
                          {msg.fullName}
                        </div>

                        {/* Phone · Email */}
                        <div className="text-xs text-slate-600 font-medium">
                          {msg.phone || "No phone"} · <span className="text-blue-600 font-semibold">{msg.email}</span>
                        </div>

                        {/* Date Submitted */}
                        <div className="text-xs text-slate-400 font-medium">
                          Submitted: {new Date(msg.createdAt).toLocaleDateString()}
                        </div>

                        {/* Message Content as Italic Text */}
                        <div className="text-sm text-slate-600 italic font-normal pt-1">
                          &quot;{msg.message}&quot;
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>

      {/* Standard Website Footer */}
      <Footer />
    </div>
  );
}

export default function AdminPortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">Loading Admin Portal...</div>}>
      <AdminPortalContent />
    </Suspense>
  );
}
