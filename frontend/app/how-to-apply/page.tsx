"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import { Check, ArrowRight } from "lucide-react";

const ELIGIBILITY_CRITERIA = [
  "Rwandan citizen or resident aged 18–65",
  "Regular income or documented business activity",
  "No active non-performing loans",
  "Valid national ID or passport",
  "Resident in Kigali, Kamonyi, or Nyagatare (or nearby area)",
  "Willingness to provide required documentation",
];

const REQUIRED_DOCUMENTS = [
  {
    category: "Identity",
    items: ["National ID or Passport", "Local / Kebele ID", "2 Passport Photos"],
  },
  {
    category: "Financial",
    items: [
      "3 months bank statements",
      "Payslips or business records",
      "RRA tax clearance (if applicable)",
    ],
  },
  {
    category: "Collateral",
    items: [
      "Property title deed",
      "Vehicle registration",
      "Guarantor documents",
    ],
  },
];

const STEP_BY_STEP = [
  {
    number: "1",
    title: "Submit Your Application",
    description:
      "Complete our simple application form online or visit any BAHO branch. Provide your personal details and specify your financing needs.",
  },
  {
    number: "2",
    title: "Document Review",
    description:
      "Our credit team reviews your documents and assesses eligibility. We may contact you for additional information within 24 hours.",
  },
  {
    number: "3",
    title: "Receive Your Funds",
    description:
      "Once approved, funds are disbursed directly to your bank account or in person at your nearest BAHO branch — same day.",
  },
];

const EXPECTED_TIMELINE = [
  { day: "Day 1", title: "Application Submitted" },
  { day: "Day 1–2", title: "Document Review" },
  { day: "Day 2–3", title: "Credit Assessment" },
  { day: "Day 3–4", title: "Funds Disbursed" },
];

export default function HowToApplyPage() {
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
              How to Apply
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              A simple, transparent process to get you the financing you need.
            </p>
          </Container>
        </section>

        {/* Section 2: Who Can Apply? */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>ELIGIBILITY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                Who Can Apply?
              </h2>
            </div>

            {/* 6 Eligibility Criteria Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ELIGIBILITY_CRITERIA.map((criterion, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-100/90 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-base font-semibold text-slate-800">
                    {criterion}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 3: Required Documents */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>DOCUMENTATION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                Required Documents
              </h2>
            </div>

            {/* 3 Document Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REQUIRED_DOCUMENTS.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4"
                >
                  <h3 className="text-xl font-bold text-baho-navy-dark border-b border-slate-100 pb-3">
                    {doc.category}
                  </h3>

                  <ul className="space-y-3">
                    {doc.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-center space-x-2 text-sm font-medium text-slate-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-baho-gold flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 4: Step-by-Step Application Process */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-200/70">
          <Container className="space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>PROCESS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                Step-by-Step Guide
              </h2>
            </div>

            {/* Vertical Process Timeline */}
            <div className="space-y-8 max-w-4xl">
              {STEP_BY_STEP.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-6">
                  {/* Step Number Circle */}
                  <div className="w-14 h-14 rounded-full bg-baho-navy-dark text-white font-black text-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    {step.number}
                  </div>

                  {/* Step Info */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-2xl font-bold text-baho-navy-dark tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section 5: Expected Timeline */}
        <section className="py-20 lg:py-24 bg-white">
          <Container>
            <div className="bg-[#0B1B33] text-white rounded-3xl p-10 sm:p-14 shadow-2xl space-y-10 border border-slate-800">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
                Expected Timeline
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 text-center">
                {EXPECTED_TIMELINE.map((item, idx) => (
                  <div key={idx} className={`space-y-2 ${idx > 0 ? "pt-6 md:pt-0" : ""}`}>
                    <div className="text-2xl sm:text-3xl font-black text-baho-gold tracking-tight">
                      {item.day}
                    </div>
                    <div className="text-sm font-semibold text-slate-200">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 6: Final Call to Action */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
