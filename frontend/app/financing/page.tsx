"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import {
  Briefcase,
  UserCheck,
  Sprout,
  Zap,
  Check,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  LucideIcon,
  Star,
  ShieldCheck,
  Clock,
  FileText,
} from "lucide-react";

export interface LoanProduct {
  id: string;
  title: string;
  categoryTag: string;
  description: string;
  icon: LucideIcon;
  theme: {
    iconBg: string;
    iconColor: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
  };
  features: string[];
  requirements: string[];
  applyLink: string;
}

const PRODUCTS: LoanProduct[] = [
  {
    id: "cash-advance",
    title: "Cash Advance",
    categoryTag: "Same-day approval",
    description:
      "Instant short-term cash for urgent daily needs.",
    icon: Zap,
    theme: {
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-800",
      buttonBg: "bg-[#D97706] hover:bg-[#B45309] text-white",
    },
    features: [
      "Repayment in 1–3 months",
      "Minimal paperwork required",
      "No hidden fees",
      "RWF 50,000 – 500,000",
    ],
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Proof of income or active business",
      "Recent 3 months bank or mobile money statements",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
    applyLink: "/apply?product=cash-advance",
  },
  {
    id: "personal-loan",
    title: "Personal Loan",
    categoryTag: "Decision within 24 hours",
    description:
      "Finance education, health, or household improvements.",
    icon: UserCheck,
    theme: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
      buttonBg: "bg-[#D97706] hover:bg-[#B45309] text-white",
    },
    features: [
      "Repayment up to 12 months",
      "Competitive 10% monthly rate",
      "Dedicated credit officer",
      "RWF 200,000 – 2,000,000",
    ],
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Proof of salary or documented income source",
      "Recent 3 months bank statements or pay slips",
      "Local residence certificate",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
    applyLink: "/apply?product=personal",
  },
  {
    id: "startup-business-loan",
    title: "Startup Business Loan",
    categoryTag: "Approved in 48 hours",
    description:
      "Kickstart your new business with confidence.",
    icon: Sprout,
    theme: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
      buttonBg: "bg-[#D97706] hover:bg-[#B45309] text-white",
    },
    features: [
      "Repayment up to 18 months",
      "Business plan review support",
      "Flexible draw-down schedule",
      "RWF 500,000 – 5,000,000",
    ],
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Business plan or operational overview",
      "RRA Registration / TIN certificate",
      "Local sector leadership recommendation letter",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
    applyLink: "/apply?product=startup-business",
  },
  {
    id: "business-growth-loan",
    title: "Business Growth Loan",
    categoryTag: "Processing in 3–5 days",
    description:
      "Scale your existing business to the next level.",
    icon: Briefcase,
    theme: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
      buttonBg: "bg-[#D97706] hover:bg-[#B45309] text-white",
    },
    features: [
      "Repayment up to 24 months",
      "CRB-verified fast processing",
      "Dedicated relationship manager",
      "RWF 2,000,000 – 20,000,000",
    ],
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Proof of business activity (RRA Registration / TIN)",
      "6 months bank or mobile money statements",
      "Collateral or guarantor documentation",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
    applyLink: "/apply?product=business-growth",
  },
];

const FAQS = [
  {
    question: "What are the interest rates for BAHO loan products?",
    answer:
      "Our interest rates are competitive and strictly regulated under National Bank of Rwanda (BNR) guidelines. Rates depend on the product type, loan duration, and credit assessment. All rates and total repayment schedules are fully disclosed up front with zero hidden fees.",
  },
  {
    question: "How fast is loan approval and disbursement?",
    answer:
      "Loan approval timelines vary by product: Cash Advance is approved same-day, Personal Loans within 24 hours, Startup Business Loans in 48 hours, and Business Growth Loans within 3–5 days after full document submission.",
  },
  {
    question: "What type of collateral or guarantees do I need?",
    answer:
      "We accept flexible collateral including property title deeds, vehicle registration cards, equipment, or verified personal/business guarantors, depending on the loan category and amount requested.",
  },
  {
    question: "Can I repay my loan early before the term ends?",
    answer:
      "Yes! You can repay your loan early at any time with zero early settlement penalties or extra charges.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "You can start your application online by clicking 'Apply Now' on any product, visiting any BAHO branch (Kigali Head Office in Kabuga, Ruyenzi Branch, or Nyagatare Branches in Rwimiyaga & Rukomo), or calling our dedicated client advisors.",
  },
];

export default function FinancingPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredProducts =
    activeTab === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.id === activeTab);

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
              Financing Products
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              Flexible, transparent financing solutions designed around your needs.
            </p>
          </Container>
        </section>

        {/* Section 2: Interactive Tabs & Products List */}
        <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
          <Container className="space-y-12">
            {/* Filter Navigation Tabs */}
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 pt-1 border-b border-slate-200 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-[#0B1B33] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                All Products
              </button>

              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setActiveTab(prod.id)}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    activeTab === prod.id
                      ? "bg-[#0B1B33] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {prod.title}
                </button>
              ))}
            </div>

            {/* Products List Grid */}
            <div className="space-y-12">
              {filteredProducts.map((product) => {
                const IconComponent = product.icon;

                return (
                  <div
                    key={product.id}
                    id={product.id}
                    className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-8"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                      <div className="flex items-start space-x-5">
                        <div
                          className={`w-14 h-14 rounded-2xl ${product.theme.iconBg} ${product.theme.iconColor} flex items-center justify-center flex-shrink-0 shadow-sm`}
                        >
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <span
                            className={`inline-block text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${product.theme.badgeBg} ${product.theme.badgeText}`}
                          >
                            {product.categoryTag}
                          </span>
                          <h2 className="text-3xl font-extrabold text-baho-navy-dark tracking-tight">
                            {product.title}
                          </h2>
                        </div>
                      </div>

                      <Link href={product.applyLink}>
                        <Button
                          variant="gold"
                          size="lg"
                          className="font-bold shadow-md"
                        >
                          Apply For {product.title}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                      {product.description}
                    </p>

                    {/* 2 Column Layout: Left (KEY FEATURES) & Right (REQUIREMENTS CARD) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Key Features */}
                      <div className="lg:col-span-6 space-y-4">
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          KEY FEATURES
                        </h3>

                        <div className="space-y-3">
                          {product.features.map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3 text-base font-semibold text-slate-800"
                            >
                              <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Requirements Box (Light slate box matching reference screenshot) */}
                      <div className="lg:col-span-6 bg-slate-50/90 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
                        <div className="flex items-center space-x-2 text-baho-navy-dark font-extrabold text-lg">
                          <FileText className="w-5 h-5 text-baho-gold" />
                          <h3>Requirements</h3>
                        </div>

                        <ul className="space-y-2.5">
                          {product.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-3 text-sm font-medium text-slate-700 leading-normal"
                            >
                              <span className="w-2 h-2 rounded-full bg-baho-gold mt-1.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Section 3: Frequently Asked Questions */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-200/70">
          <Container className="max-w-4xl space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                <span>QUESTIONS & ANSWERS</span>
                <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaqIndex(isOpen ? null : idx)
                      }
                      className="w-full p-6 text-left flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      <span className="text-lg font-bold text-baho-navy-dark pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-baho-navy" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-6 pt-2 text-slate-600 text-base leading-relaxed border-t border-slate-100 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>


      </main>

      <Footer />
    </div>
  );
}
