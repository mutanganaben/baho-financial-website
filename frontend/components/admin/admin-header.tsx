"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAdminUser, clearAdminSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Building2,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Briefcase,
  MapPin,
  User,
  Settings,
  ChevronDown,
  Users as UsersIcon,
} from "lucide-react";

interface AdminHeaderProps {
  activePage: "dashboard" | "products" | "branches" | "users" | "profile" | "settings";
  title?: string;
}

export function AdminHeader({ activePage, title }: AdminHeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const adminUser = getAdminUser();

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name: string): string => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const subtitle =
    title ||
    (activePage === "dashboard"
      ? "ADMIN UNDERWRITING PORTAL"
      : activePage === "products"
      ? "PRODUCTS CATALOG MANAGEMENT"
      : activePage === "branches"
      ? "BRANCHES DIRECTORY MANAGEMENT"
      : "STAFF & USER ACCOUNT MANAGEMENT");

  return (
    <header className="bg-[#0B1B33] text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left Brand Title */}
        <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-blue-300 group-hover:scale-105 transition-transform flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-wider text-white block leading-none">
              BAHO FINANCIAL
            </span>
            <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase">
              {subtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link href="/admin/dashboard">
            <Button
              size="sm"
              className={
                activePage === "dashboard"
                  ? "bg-[#132A4F] text-white font-bold text-xs shadow-sm border border-blue-500/40"
                  : "border border-slate-700/80 text-slate-300 hover:bg-[#132A4F] hover:text-white text-xs font-bold transition-colors"
              }
            >
              <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
              Dashboard
            </Button>
          </Link>

          <Link href="/admin/products">
            <Button
              size="sm"
              className={
                activePage === "products"
                  ? "bg-[#132A4F] text-white font-bold text-xs shadow-sm border border-blue-500/40"
                  : "border border-slate-700/80 text-slate-300 hover:bg-[#132A4F] hover:text-white text-xs font-bold transition-colors"
              }
            >
              <Briefcase className="w-3.5 h-3.5 mr-1.5" />
              Products
            </Button>
          </Link>

          <Link href="/admin/branches">
            <Button
              size="sm"
              className={
                activePage === "branches"
                  ? "bg-[#132A4F] text-white font-bold text-xs shadow-sm border border-blue-500/40"
                  : "border border-slate-700/80 text-slate-300 hover:bg-[#132A4F] hover:text-white text-xs font-bold transition-colors"
              }
            >
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Branches
            </Button>
          </Link>

          <Link href="/admin/users">
            <Button
              size="sm"
              className={
                activePage === "users"
                  ? "bg-[#132A4F] text-white font-bold text-xs shadow-sm border border-blue-500/40"
                  : "border border-slate-700/80 text-slate-300 hover:bg-[#132A4F] hover:text-white text-xs font-bold transition-colors"
              }
            >
              <UsersIcon className="w-3.5 h-3.5 mr-1.5" />
              Staff
            </Button>
          </Link>

          {/* Clickable Admin User Profile Dropdown */}
          {adminUser && (
            <div className="relative pl-3 border-l border-slate-800" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-900 transition-colors focus:outline-none group"
              >
                {/* Circular Avatar with Initials */}
                <div className="w-9 h-9 rounded-full bg-[#132A4F] text-white font-black text-xs flex items-center justify-center border-2 border-blue-500/40 shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                  {getInitials(adminUser.fullName)}
                </div>

                <div className="text-left hidden xl:block">
                  <div className="text-xs font-bold text-white leading-none">
                    {adminUser.fullName}
                  </div>
                  <div className="text-[10px] text-blue-300 font-semibold uppercase mt-0.5">
                    {adminUser.role.replace("_", " ")}
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 text-slate-800 p-2 space-y-1 animate-in fade-in-50 zoom-in-95 duration-150">
                  {/* User Profile Header */}
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                    <div className="text-xs font-extrabold text-[#0B1B33]">
                      {adminUser.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      {adminUser.email}
                    </div>
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 mt-1">
                      {adminUser.role}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 my-1" />

                  {/* Menu Items */}
                  <Link
                    href="/admin/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center space-x-2.5"
                  >
                    <User className="w-4 h-4 text-[#0B1B33]" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/admin/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center space-x-2.5"
                  >
                    <Settings className="w-4 h-4 text-[#0B1B33]" />
                    <span>Settings</span>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center space-x-2.5"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button (Visible only on Mobile/Tablet) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-white hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071325] border-b border-slate-800 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {adminUser && (
            <div className="pb-3 border-b border-slate-800/80 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#132A4F] text-white font-black text-xs flex items-center justify-center border-2 border-blue-500/40 shadow-sm flex-shrink-0">
                {getInitials(adminUser.fullName)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-extrabold text-white">{adminUser.fullName}</div>
                <div className="text-xs text-slate-400 font-medium">{adminUser.email}</div>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-blue-900/60 text-blue-200 border border-blue-700/50">
                {adminUser.role}
              </span>
            </div>
          )}

          <nav className="flex flex-col space-y-2">
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activePage === "dashboard"
                  ? "bg-[#132A4F] text-white border border-blue-500/40 font-black"
                  : "bg-slate-900/80 text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activePage === "products"
                  ? "bg-[#132A4F] text-white border border-blue-500/40 font-black"
                  : "bg-slate-900/80 text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Products</span>
            </Link>

            <Link
              href="/admin/branches"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activePage === "branches"
                  ? "bg-[#132A4F] text-white border border-blue-500/40 font-black"
                  : "bg-slate-900/80 text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Branches</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                activePage === "users"
                  ? "bg-[#132A4F] text-white border border-blue-500/40 font-black"
                  : "bg-slate-900/80 text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <UsersIcon className="w-4 h-4" />
              <span>Staff Accounts</span>
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full font-bold text-xs text-white bg-[#132A4F] hover:bg-[#1C3B6E] justify-center py-3 mt-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
