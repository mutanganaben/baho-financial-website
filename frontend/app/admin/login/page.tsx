"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchApi } from "@/lib/api";
import { setAdminSession } from "@/lib/auth";
import { AlertCircle, Eye, EyeOff, Building2 } from "lucide-react";

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
    <div className="min-h-screen bg-[#0B1B33] flex items-center justify-center p-4 sm:p-6">
      {/* Centered White Login Card */}
      <div className="w-full max-w-[400px] bg-white rounded-2xl p-7 sm:p-9 shadow-2xl space-y-6">
        {/* Logo & Brand Label Header */}
        <div className="text-center space-y-2">
          {/* Logo Container */}
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center p-1.5 mx-auto shadow-sm">
            <Image
              src="/images/BAHO FINANCIAL LTD.png"
              alt="BAHO Financial Ltd. Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          {/* Small Brand Tag */}
          <div className="text-[11px] font-bold tracking-widest text-[#0066CC] uppercase pt-1">
            BAHO ADMIN
          </div>

          {/* Page Heading */}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Sign in to continue
          </h1>
        </div>

        {/* Error Message Banner */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start space-x-2.5 text-rose-800 text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4 pt-1">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              EMAIL
            </label>
            <input
              type="email"
              required
              autoComplete="off"
              placeholder="baho@info.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:border-[#0B1B33] focus:ring-1 focus:ring-[#0B1B33] transition-colors"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:border-[#0B1B33] focus:ring-1 focus:ring-[#0B1B33] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0B1B33] hover:bg-[#071324] text-white font-bold text-sm shadow-sm transition-colors disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
