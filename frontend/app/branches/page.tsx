"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import { fetchApi } from "@/lib/api";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export interface ApiBranch {
  id: string;
  code: string;
  name: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  email?: string;
  openingHours: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
}

// Utility to format province Enum for friendly UI display
function formatProvince(province: string): string {
  switch (province) {
    case "KIGALI":
      return "Kigali City";
    case "SOUTH":
      return "Southern Province";
    case "EAST":
      return "Eastern Province";
    case "NORTH":
      return "Northern Province";
    case "WEST":
      return "Western Province";
    default:
      return province;
  }
}

export default function BranchesPage() {
  const [branches, setBranches] = useState<ApiBranch[]>([]);
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>("kigali-kabuga");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadBranches = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchApi<ApiBranch[]>("/branches");
      setBranches(data);

      if (data && data.length > 0) {
        // Default select Kigali HQ if available, or first branch
        const hq = data.find((b) => b.code === "kigali-kabuga") || data[0];
        setSelectedBranchCode(hq.code);
      }
    } catch (err: any) {
      console.error("Failed to load branches from API:", err);
      setErrorMessage(
        err.message || "Failed to load branch network from server. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const selectedBranch =
    branches.find((b) => b.code === selectedBranchCode) || branches[0];

  return (
    <div className="min-h-screen flex flex-col bg-baho-bg">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Banner */}
        <section className="bg-[#0B1B33] text-white py-10 sm:py-12 lg:py-14 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>BAHO FINANCIAL</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Our Branches
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              Regional Branches serving communities across Rwanda.
            </p>
          </Container>
        </section>

        {/* Section 2: Branch Directory Cards Grid */}
        <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>NATIONWIDE NETWORK</span>
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
                Find Your Nearest BAHO Branch
              </h2>
            </div>

            {/* Error Banner State */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 max-w-2xl mx-auto text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-rose-800 font-bold">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={loadBranches}
                  className="font-bold border-rose-300 text-rose-900 hover:bg-rose-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Connection
                </Button>
              </div>
            )}

            {/* Loading Skeleton Grid State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm animate-pulse space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-100" />
                    <div className="h-6 bg-slate-100 rounded-md w-3/4" />
                    <div className="space-y-2 pt-2">
                      <div className="h-4 bg-slate-100 rounded w-full" />
                      <div className="h-4 bg-slate-100 rounded w-2/3" />
                      <div className="h-4 bg-slate-100 rounded w-4/5" />
                    </div>
                    <div className="h-10 bg-slate-100 rounded-xl w-full pt-4" />
                  </div>
                ))}
              </div>
            ) : (
              /* Live Branch Cards Grid */
              branches.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {branches.map((branch) => {
                    const isSelected = selectedBranchCode === branch.code;
                    const isHq =
                      branch.code === "kigali-kabuga" ||
                      branch.name.toLowerCase().includes("head office");

                    return (
                      <div
                        key={branch.id}
                        onClick={() => setSelectedBranchCode(branch.code)}
                        className={`bg-white rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 ${
                          isSelected
                            ? "border-blue-600 ring-2 ring-blue-600/20 shadow-lg scale-[1.02]"
                            : "border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300"
                        }`}
                      >
                        <div className="space-y-5">
                          {/* Icon Badge & Type Tag */}
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                              {isHq ? (
                                <Building2 className="w-6 h-6" />
                              ) : (
                                <MapPin className="w-6 h-6" />
                              )}
                            </div>

                            <span
                              className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                                isHq
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {isHq ? "Headquarters" : "Branch"}
                            </span>
                          </div>

                          {/* Branch Name */}
                          <h3 className="text-xl font-bold text-baho-navy-dark tracking-tight leading-snug">
                            {branch.name}
                          </h3>

                          {/* Contact Details List */}
                          <div className="space-y-3 pt-2 text-sm">
                            {/* Address */}
                            <div className="flex items-start space-x-3 text-slate-600">
                              <MapPin className="w-4 h-4 text-baho-gold flex-shrink-0 mt-0.5" />
                              <span className="font-medium text-slate-700 leading-snug">
                                {branch.address} ({branch.district})
                              </span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-3 text-slate-600">
                              <Phone className="w-4 h-4 text-baho-gold flex-shrink-0" />
                              <a
                                href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                                className="font-semibold text-baho-navy hover:text-baho-gold hover:underline transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {branch.phone}
                              </a>
                            </div>

                            {/* Email (only rendered if official email exists) */}
                            {branch.email && (
                              <div className="flex items-center space-x-3 text-slate-600">
                                <Mail className="w-4 h-4 text-baho-gold flex-shrink-0" />
                                <a
                                  href={`mailto:${branch.email}`}
                                  className="font-medium text-baho-navy hover:text-baho-gold hover:underline truncate transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {branch.email}
                                </a>
                              </div>
                            )}

                            {/* Operating Hours */}
                            <div className="flex items-center space-x-3 text-slate-500">
                              <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              <span className="font-medium text-xs text-slate-600">
                                {branch.openingHours}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Button */}
                        <div className="pt-2 border-t border-slate-100">
                          <Button
                            variant={isSelected ? "primary" : "outline"}
                            size="sm"
                            className="w-full justify-center text-xs font-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBranchCode(branch.code);
                            }}
                          >
                            {isSelected ? "Selected Branch" : "View Details"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </Container>
        </section>

        {/* Section 3: Detailed Location & Directions Section */}
        {selectedBranch && !isLoading && (
          <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/70">
            <Container>
              <div className="bg-[#0B1B33] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-800 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Detail Panel */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                      <span className="w-6 h-0.5 bg-baho-gold inline-block" />
                      <span>ACTIVE LOCATION DETAILS</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      {selectedBranch.name}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                      Visit our dedicated loan officers at {selectedBranch.name} for instant credit consultation, document submission, and fast financing support.
                    </p>

                    <div className="space-y-3.5 pt-1">
                      <div className="flex items-start space-x-3 text-sm text-slate-200">
                        <MapPin className="w-5 h-5 text-baho-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white text-sm">Location Address</div>
                          <div className="font-normal text-slate-300 text-xs sm:text-sm">{selectedBranch.address}</div>
                          <div className="text-xs text-slate-400">
                            {selectedBranch.district}, {formatProvince(selectedBranch.province)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-sm text-slate-200">
                        <Phone className="w-5 h-5 text-baho-gold flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-white text-sm">Direct Line</div>
                          <a
                            href={`tel:${selectedBranch.phone.replace(/\s+/g, "")}`}
                            className="font-normal text-slate-300 text-xs sm:text-sm hover:text-baho-gold transition-colors"
                          >
                            {selectedBranch.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-sm text-slate-200">
                        <Clock className="w-5 h-5 text-baho-gold flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-white text-sm">Branch Working Hours</div>
                          <div className="font-normal text-slate-300 text-xs sm:text-sm">{selectedBranch.openingHours}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${selectedBranch.address}, ${selectedBranch.district}, Rwanda`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="gold" size="md" className="font-bold shadow-md text-xs sm:text-sm">
                          Get Directions on Google Maps
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>

                      <Link href={`/contact?branch=${selectedBranch.code}`}>
                        <Button
                          variant="outline"
                          size="md"
                          className="font-bold border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
                        >
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Interactive Google Maps Embed Container */}
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-[260px] sm:h-[300px] lg:h-[320px] bg-slate-900 border border-white/10 shadow-inner">
                    <iframe
                      title={`Google Map for ${selectedBranch.name}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        `${selectedBranch.address}, ${selectedBranch.district}, Rwanda`
                      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Section 4: Call to Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
