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
  UserRound,
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
    role: "Operations and Business Manager",
    department: "OPERATIONS AND BUSINESS MANAGER",
  },
  {
    role: "Finance & Administration",
    department: "FINANCE & ADMINISTRATION",
  },
  {
    role: "Managing Director",
    department: "MD",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-baho-bg">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Banner */}
        <section className="bg-[#0B1B33] text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-4">
            <div className="text-slate-300 font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span>Who we are</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight max-w-4xl">
              About Baho Financial Ltd.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-normal leading-relaxed">
              Our mission is to empower Rwandans with reliable capital from small daily cash needs to large business investments.
            </p>
          </Container>
        </section>

        {/* Section 2: Institutional Story & Overview */}
        <section className="py-16 lg:py-20 bg-white border-b border-slate-200/70">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Story Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="text-baho-navy font-bold text-xs sm:text-sm tracking-wider uppercase">
                  <span>ABOUT BAHO FINANCIAL LTD.</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
                  Our story
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  BAHO Financial Ltd. is a micro-lending institution based in Rwanda, offering accessible and transparent loans to individuals, entrepreneurs, and businesses through our 4 branches.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/apply">
                    <Button variant="gold" size="md" className="font-bold px-6 py-2.5 shadow-md">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/branches">
                    <Button
                      variant="outline"
                      size="md"
                      className="border-baho-navy text-baho-navy hover:bg-baho-navy hover:text-white font-bold px-6 py-2.5 transition-colors"
                    >
                      Find a branch
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Stat Cards Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100/80 space-y-1 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-baho-navy">4</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Branches</div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100/80 space-y-1 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-baho-navy">&lt; 24h</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Decision Speed</div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100/80 space-y-1 text-center sm:col-span-2">
                  <div className="text-2xl sm:text-3xl font-bold text-baho-navy">10%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Interest</div>
                </div>

                <div className="sm:col-span-2 bg-[#183B6B] text-white rounded-2xl p-6 text-center shadow-md flex items-center justify-center">
                  <div className="text-base sm:text-lg font-bold text-white">4 branches across Rwanda</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 3: Vision & Mission Cards */}
        <section className="py-16 lg:py-20 bg-[#f4f7fa] border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-navy font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-navy inline-block" />
                <span>PURPOSE & DIRECTION</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
                Our Vision & Mission
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision Card */}
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-5 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-baho-navy flex items-center justify-center">
                  <Compass className="w-7 h-7" strokeWidth={1.75} />
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
                  <Target className="w-7 h-7" strokeWidth={1.75} />
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
        <section className="py-16 lg:py-20 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-navy font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-navy inline-block" />
                <span>GUIDING PRINCIPLES</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
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
                      <Icon className="w-6 h-6" strokeWidth={1.75} />
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
        <section className="py-16 lg:py-20 bg-[#f4f7fa] border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-navy font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-navy inline-block" />
                <span>MILESTONES</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
                Our Journey So Far
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MILESTONES.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 relative shadow-sm"
                >
                  <div className="inline-block px-3 py-1 bg-baho-navy/10 text-baho-navy font-extrabold text-xs rounded-full">
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
        <section id="team" className="py-16 lg:py-20 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-navy font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-navy inline-block" />
                <span>LEADERSHIP</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
                Executive Leadership Team
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                Guided by experienced Rwandan banking professionals committed to operational excellence and financial governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {LEADERSHIP_TEAM.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[4/3] bg-slate-100/90 flex items-center justify-center overflow-hidden border-b border-slate-100">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-baho-navy transition-transform group-hover:scale-105 duration-300">
                      <UserRound className="w-16 h-16 sm:w-20 sm:h-20 fill-current" strokeWidth={0} />
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 bg-white border-t border-slate-100">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-baho-navy-dark tracking-tight leading-snug">
                        {member.role}
                      </h3>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                        {member.department}
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
