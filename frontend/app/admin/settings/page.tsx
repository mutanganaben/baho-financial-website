"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, getAdminUser } from "@/lib/auth";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Settings, Sliders, Bell, ShieldCheck, Database, Save, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const toast = useToast();

  const [systemName, setSystemName] = useState("BAHO Financial Underwriting Portal");
  const [currencySymbol, setCurrencySymbol] = useState("RWF");
  const [referencePrefix, setReferencePrefix] = useState("APP");
  const [defaultInterestRate, setDefaultInterestRate] = useState("12.5");
  const [autoApproveLimit, setAutoApproveLimit] = useState("500000");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [auditLogging, setAuditLogging] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    const user = getAdminUser();
    if (!token || !user) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success("System Settings Saved", "All system configuration parameters have been updated.");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Header */}
      <AdminHeader activePage="settings" title="SYSTEM CONFIGURATION & SETTINGS" />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-baho-navy-dark">System Configuration</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage global underwriting rules, currency preferences, and portal configurations.
            </p>
          </div>

          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            variant="gold"
            className="font-bold text-xs text-slate-950 shadow-md"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General System Preferences */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-baho-navy/10 flex items-center justify-center text-baho-navy">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-baho-navy-dark">General & Financial Preferences</h2>
                <p className="text-xs text-slate-500 font-medium">Underwriting defaults and application reference formats</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">System Name</label>
                <input
                  type="text"
                  required
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Currency Code</label>
                  <input
                    type="text"
                    required
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Ref Code Prefix</label>
                  <input
                    type="text"
                    required
                    value={referencePrefix}
                    onChange={(e) => setReferencePrefix(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Default Interest Rate (%/yr)</label>
                  <input
                    type="text"
                    required
                    value={defaultInterestRate}
                    onChange={(e) => setDefaultInterestRate(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Fast-Track Limit (RWF)</label>
                  <input
                    type="text"
                    required
                    value={autoApproveLimit}
                    onChange={(e) => setAutoApproveLimit(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-baho-navy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications & Security Logs */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-700">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-baho-navy-dark">Notifications & Audit Logs</h2>
                <p className="text-xs text-slate-500 font-medium">Automated alerts and underwriting activity logs</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <div className="font-extrabold text-slate-900">Email Notifications</div>
                  <div className="text-slate-500 text-[11px]">Send automatic email alerts on loan status updates</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 text-baho-navy rounded focus:ring-baho-navy"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <div className="font-extrabold text-slate-900">SMS Notifications</div>
                  <div className="text-slate-500 text-[11px]">Send SMS alerts for high-value loan submissions</div>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-5 h-5 text-baho-navy rounded focus:ring-baho-navy"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <div className="font-extrabold text-slate-900">Audit Logging</div>
                  <div className="text-slate-500 text-[11px]">Log all credit officer status modifications</div>
                </div>
                <input
                  type="checkbox"
                  checked={auditLogging}
                  onChange={(e) => setAuditLogging(e.target.checked)}
                  className="w-5 h-5 text-baho-navy rounded focus:ring-baho-navy"
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
