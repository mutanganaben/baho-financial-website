"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { setAdminSession } from "@/lib/auth";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetchApi<{
        success: boolean;
        accessToken: string;
        user: { id: string; email: string; fullName: string; role: string };
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.accessToken) {
        setAdminSession(res.accessToken, res.user);
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      console.error("Admin login error:", err);
      setErrorMessage(
        err.message || "Invalid credentials. Please verify your admin email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative">
      {/* Top Header Navigation */}
      <header className="bg-[#0B1B33] text-white p-6 sm:p-7 flex items-center justify-between border-b border-slate-800 shadow-md">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-baho-gold/10 border border-baho-gold/30 flex items-center justify-center text-baho-gold group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-wider text-white block leading-none">
              BAHO FINANCIAL
            </span>
            <span className="text-[10px] font-bold tracking-widest text-baho-gold uppercase">
              ADMIN PORTAL
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-bold text-slate-300 hover:text-baho-gold transition-colors flex items-center space-x-1"
        >
          <span>Return to Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">

          {/* Card Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-baho-gold mx-auto shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-baho-navy-dark tracking-tight">
                BAHO Financial Admin
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Sign in to continue
              </p>
            </div>
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 text-rose-800 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="off"
                  placeholder="admin@bahofinancial.rw"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all"
                />
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              variant="secondary"
              size="lg"
              className="w-full font-bold shadow-md justify-center py-4 rounded-xl text-white bg-[#0B1B33] hover:bg-[#122b4d]"
            >
              {isLoading ? (
                <span>Authenticating Admin...</span>
              ) : (
                <span className="flex items-center">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </Button>
          </form>


        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-6 text-center text-xs text-slate-500 font-medium">
        © 2026 BAHO Financial Ltd. All rights reserved.
      </footer>
    </div>
  );
}
