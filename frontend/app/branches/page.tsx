"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Navigation,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export interface Branch {
  id: string;
  name: string;
  type: "Headquarters" | "Branch";
  province: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapQuery: string;
}

const BRANCHES: Branch[] = [
  {
    id: "kigali-kabuga",
    name: "Kigali — Head Office",
    type: "Headquarters",
    province: "Kigali City",
    district: "Kabuga",
    address: "Kabuga",
    phone: "+250 788 123 456",
    email: "kabuga.hq@bahofinancial.rw",
    hours: "Mon–Fri: 8:00am – 5:00pm",
    mapQuery: "Kabuga, Kigali, Rwanda",
  },
  {
    id: "ruyenzi",
    name: "Ruyenzi Branch",
    type: "Branch",
    province: "Southern Province",
    district: "Kamonyi District",
    address: "Ruyenzi",
    phone: "+250 788 234 567",
    email: "ruyenzi@bahofinancial.rw",
    hours: "Mon–Fri: 8:00am – 5:00pm",
    mapQuery: "Ruyenzi, Kamonyi, Rwanda",
  },
  {
    id: "nyagatare-rwimiyaga",
    name: "Nyagatare — Rwimiyaga Branch",
    type: "Branch",
    province: "Eastern Province",
    district: "Nyagatare District",
    address: "Rwimiyaga",
    phone: "+250 788 345 678",
    email: "rwimiyaga@bahofinancial.rw",
    hours: "Mon–Fri: 8:00am – 5:00pm",
    mapQuery: "Rwimiyaga, Nyagatare, Rwanda",
  },
  {
    id: "nyagatare-rukomo",
    name: "Nyagatare — Rukomo Branch",
    type: "Branch",
    province: "Eastern Province",
    district: "Nyagatare District",
    address: "Rukomo",
    phone: "+250 788 456 789",
    email: "rukomo@bahofinancial.rw",
    hours: "Mon–Fri: 8:00am – 5:00pm",
    mapQuery: "Rukomo, Nyagatare, Rwanda",
  },
];

export default function BranchesPage() {
  const [selectedBranchId, setSelectedBranchId] = useState<string>("kigali-kabuga");

  const selectedBranch =
    BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

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

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Our Branches
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              4 Regional Branches serving communities across Rwanda.
            </p>
          </Container>
        </section>

        {/* Section 2: Branch Directory Cards Grid */}
        <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>NATIONWIDE NETWORK</span>
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                Find Your Nearest BAHO Branch
              </h2>
            </div>

            {/* 4 Branch Cards Grid (Matching reference screenshot styling) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRANCHES.map((branch) => {
                const isSelected = selectedBranchId === branch.id;

                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranchId(branch.id)}
                    className={`bg-white rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-6 ${isSelected
                      ? "border-blue-600 ring-2 ring-blue-600/20 shadow-lg scale-[1.02]"
                      : "border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300"
                      }`}
                  >
                    <div className="space-y-5">
                      {/* Icon Badge & Type Tag */}
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          {branch.type === "Headquarters" ? (
                            <Building2 className="w-6 h-6" />
                          ) : (
                            <MapPin className="w-6 h-6" />
                          )}
                        </div>

                        <span
                          className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${branch.type === "Headquarters"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                            }`}
                        >
                          {branch.type}
                        </span>
                      </div>

                      {/* Branch Name */}
                      <h3 className="text-xl font-bold text-baho-navy-dark leading-snug">
                        {branch.name}
                      </h3>

                      {/* Contact Details List (Matching reference screenshot layout) */}
                      <div className="space-y-3 pt-2 text-sm">
                        {/* Address */}
                        <div className="flex items-start space-x-3 text-slate-600">
                          <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                          <span className="font-medium leading-tight">
                            {branch.address}
                          </span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Phone className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          <a
                            href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                            className="font-semibold text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {branch.phone}
                          </a>
                        </div>

                        {/* Email */}
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <a
                            href={`mailto:${branch.email}`}
                            className="font-medium text-blue-600 hover:underline truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {branch.email}
                          </a>
                        </div>

                        {/* Operating Hours */}
                        <div className="flex items-center space-x-3 text-slate-500">
                          <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="font-medium text-xs">
                            {branch.hours}
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
                          setSelectedBranchId(branch.id);
                        }}
                      >
                        {isSelected ? "Selected Branch" : "View Details"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Section 3: Detailed Location & Directions Section */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-200/70">
          <Container>
            <div className="bg-[#0B1B33] text-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-slate-800 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Detail Panel */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center space-x-2 text-baho-gold font-bold text-xs uppercase tracking-wider">
                    <span className="w-6 h-0.5 bg-baho-gold inline-block" />
                    <span>ACTIVE LOCATION DETAILS</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {selectedBranch.name}
                  </h2>

                  <p className="text-slate-300 text-base leading-relaxed">
                    Visit our dedicated loan officers at {selectedBranch.name} for instant credit consultation, document submission, and fast financing support.
                  </p>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-start space-x-3 text-sm text-slate-200">
                      <MapPin className="w-5 h-5 text-baho-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Location Address</div>
                        <div>{selectedBranch.address}</div>
                        <div className="text-xs text-slate-400">{selectedBranch.district}, {selectedBranch.province}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-slate-200">
                      <Phone className="w-5 h-5 text-baho-gold flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white">Direct Line</div>
                        <a href={`tel:${selectedBranch.phone.replace(/\s+/g, "")}`} className="hover:text-baho-gold transition-colors">
                          {selectedBranch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-slate-200">
                      <Clock className="w-5 h-5 text-baho-gold flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white">Branch Working Hours</div>
                        <div>{selectedBranch.hours}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedBranch.mapQuery
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="gold" size="md" className="font-bold shadow-md">
                        Get Directions on Google Maps
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>

                    <Link href={`/contact?branch=${selectedBranch.id}`}>
                      <Button variant="outline" size="md" className="font-bold border-white/20 text-white hover:bg-white/10">
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Interactive Google Maps Embed Container */}
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/10 shadow-inner">
                  <iframe
                    title={`Google Map for ${selectedBranch.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      selectedBranch.mapQuery
                    )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 4: Call to Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
