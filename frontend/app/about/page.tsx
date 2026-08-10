"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  ShieldCheck,
  Target,
  Compass,
  Users,
  TrendingUp,
  Clock,
  User,
} from "lucide-react";
const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity & Transparency",
    description:
      "We operate with 100% pricing clarity, no hidden charges, and straightforward contract terms for every client.",
  },
  {
    icon: Clock,
    title: "Speed & Efficiency",
    description:
      "We understand time is capital. Our streamlined credit review delivers loan decisions within 24 hours.",
  },
  {
    icon: Users,
    title: "Client-Centricity",
    description:
      "Every financial product is tailored to meet the real-world operational and personal needs of our clients in Rwanda.",
  },
  {
    icon: TrendingUp,
    title: "Economic Impact",
    description:
      "We prioritize loans that foster business growth, job creation, asset accumulation, and community development.",
  },
];

const MILESTONES = [
  {
    year: "2025 Q1",
    title: "Incorporation & BNR Licensing",
    description:
      "BAHO Financial Ltd. was officially established in Kigali as a licensed Non-Deposit Financial Institution (NDFI).",
  },
  {
    year: "2025 Q2",
    title: "Branch Network Launch",
    description:
      "Opened branch operations across Kigali (Headquarters), Kamonyi (Ruyenzi), and Nyagatare (Rwimiyaga & Rukomo) to reach regional entrepreneurs.",
  },
  {
    year: "2025 Q3",
    title: "RWF 80M+ Disbursement Milestone",
    description:
      "Crossed 100+ active borrowers supported across agriculture, retail, transport, and SME commercial projects.",
  },
  {
    year: "2026 & Beyond",
    title: "Digital Loan Platform & Expansion",
    description:
      "Expanding mobile loan management, digital application portals, and deepening capital deployment across Rwanda.",
  },
];

const LEADERSHIP_TEAM = [
  {
    name: "Joshua Intwari",
    role: "Managing Director & CEO",
    bio: "Over 15 years of senior executive experience in Rwandan banking, microfinance risk management, and SME growth strategy.",
    image: "",
  },
  {
    name: "Jacky",
    role: "Operations and Business Manager",
    bio: "Expert in retail lending, credit underwriting, and branch operations, driving 90%+ portfolio quality across all regions.",
    image: "",
  },
  {
    name: "Emmanuel",
    role: "Finance & Administration Manager",
    bio: "Specialist in regulatory compliance, NDFI financial governance, and financial consumer protection under BNR guidelines.",
    image: "",
  },
];

export default function AboutPage() {
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
              <span>BAHO FINANCIAL / ABOUT US</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
              Empowering Rwandan Businesses & Communities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              BAHO Financial Ltd. is a licensed Non-Deposit Financial Institution (NDFI) dedicated to offering accessible, transparent, and flexible credit solutions to drive sustainable growth.
            </p>
          </Container>
        </section>

        {/* Section 2: Institutional Story & Overview */}
        <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/70">
          <Container className="space-y-8">
            {/* Story Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>OUR FOUNDATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
                Bridging the Financing Gap with Trust and Innovation
              </h2>

              <div className="space-y-4 text-slate-600 leading-relaxed font-normal text-sm sm:text-base max-w-4xl">
                <p>
                  Established in 2025, BAHO Financial Ltd. was founded on a clear conviction: micro, small, and medium enterprises (MSMEs) and working individuals in Rwanda deserve credit products designed for speed, flexibility, and fairness.
                </p>
                <p>
                  Unlike traditional deposit-taking institutions with rigid bureaucratic procedures, we specialize exclusively in non-deposit financial products—allowing us to focus 100% of our operations on rapid credit assessment, personalized advisory, and efficient disbursement.
                </p>
                <p>
                  From our headquarters in Kigali to our regional branches in Kamonyi and Nyagatare, we walk alongside our clients through every step of their growth journey.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-2xl font-black text-baho-navy">RWF 80M+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capital Disbursed</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-2xl font-black text-baho-navy">90%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Repayment Rate</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-2xl font-black text-baho-navy">50+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Clients</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-2xl font-black text-baho-navy">Licensed NDFI</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Regulated by BNR</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 3: Vision & Mission Cards */}
        <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>PURPOSE & DIRECTION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
                Our Vision & Mission
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-5 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-baho-navy flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-baho-navy-dark tracking-tight">
                  Our Vision
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                  To be Rwanda&apos;s most trusted, accessible, and agile non-deposit microfinance institution—catalyzing economic independence for thousands of entrepreneurs and families by 2030.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-5 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-baho-gold flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-baho-navy-dark tracking-tight">
                  Our Mission
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                  To deliver fast, transparent, and tailor-made financing solutions backed by responsible lending practices, dedicated client support, and continuous financial innovation.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 4: Core Values Grid */}
        <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>GUIDING PRINCIPLES</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_VALUES.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-baho-navy/20 hover:shadow-md transition-all space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-baho-navy text-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-baho-navy-dark tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Section 5: Corporate Journey & Milestones */}
        <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>MILESTONES</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
                Our Journey So Far
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MILESTONES.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 relative shadow-sm"
                >
                  <div className="inline-block px-3 py-1 bg-baho-gold/15 text-baho-gold font-extrabold text-xs rounded-full">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-bold text-baho-navy-dark tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 6: Leadership Team */}
        <section id="team" className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>LEADERSHIP</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
                Executive Leadership Team
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                Guided by experienced Rwandan banking professionals committed to operational excellence and financial governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADERSHIP_TEAM.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-baho-navy/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-b from-blue-50/80 to-slate-100/90 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-blue-100 text-baho-navy flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <User className="w-12 h-12 stroke-[1.5]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 bg-white border-t border-slate-100">
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-baho-navy-dark tracking-tight leading-snug group-hover:text-baho-navy transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-slate-700">
                        {member.role}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-xs font-bold text-baho-gold tracking-wider uppercase">
                        {member.role.includes("CEO")
                          ? "EXECUTIVE MANAGEMENT"
                          : member.role.includes("Operations")
                            ? "OPERATIONS & BUSINESS"
                            : "FINANCE & ADMINISTRATION"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 7: Final Call to Action */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
