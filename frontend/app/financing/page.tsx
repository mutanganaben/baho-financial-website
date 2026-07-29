"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fetchApi, ApiProduct } from "@/lib/api";

import {
  Briefcase,
  UserCheck,
  Sprout,
  Zap,
  Check,
  ArrowRight,
  ChevronDown,
  LucideIcon,
  FileText,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const PRODUCT_THEMES: Record<
  string,
  {
    icon: LucideIcon;
    categoryTag: string;
    theme: {
      iconBg: string;
      iconColor: string;
      badgeBg: string;
      badgeText: string;
    };
    requirements: string[];
  }
> = {
  "cash-advance": {
    icon: Zap,
    categoryTag: "Same-day approval",
    theme: {
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-800",
    },
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Proof of income or active business",
      "Recent 3 months bank or mobile money statements",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
  },
  "personal-loan": {
    icon: UserCheck,
    categoryTag: "Decision within 24 hours",
    theme: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-800",
    },
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Proof of salary or documented income source",
      "Recent 3 months bank statements or pay slips",
      "Local residence certificate",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
  },
  "startup-business-loan": {
    icon: Sprout,
    categoryTag: "Approved in 48 hours",
    theme: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-800",
    },
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Business plan or operational overview",
      "RRA Registration / TIN certificate",
      "Local sector leadership recommendation letter",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
  },
  "business-growth-loan": {
    icon: Briefcase,
    categoryTag: "Processing in 3–5 days",
    theme: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-800",
    },
    requirements: [
      "Valid Rwandan National ID or Passport",
      "Proof of business activity (RRA Registration / TIN)",
      "6 months bank or mobile money statements",
      "Collateral or guarantor documentation",
      "Completed BAHO loan application form",
      "Two passport-size photographs",
    ],
  },
};

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
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchApi<ApiProduct[]>("/products");
      setProducts(data);
    } catch (err: any) {
      console.error("Failed to load products from server:", err);
      setErrorMessage(
        err.message || "Failed to load loan products. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.slug === activeTab);

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

              {products.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setActiveTab(prod.slug)}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    activeTab === prod.slug
                      ? "bg-[#0B1B33] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  {prod.name}
                </button>
              ))}
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
                  onClick={loadProducts}
                  className="font-bold border-rose-300 text-rose-900 hover:bg-rose-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Connection
                </Button>
              </div>
            )}

            {/* Loading Skeleton State */}
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm animate-pulse space-y-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100" />
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-100 rounded w-24" />
                        <div className="h-7 bg-slate-100 rounded w-48" />
                      </div>
                    </div>
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="h-24 bg-slate-100 rounded-2xl" />
                      <div className="h-24 bg-slate-100 rounded-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Live Products List Grid */
              <div className="space-y-12">
                {filteredProducts.map((product) => {
                  const meta = PRODUCT_THEMES[product.slug] || {
                    icon: Zap,
                    categoryTag: "Standard Financing",
                    theme: {
                      iconBg: "bg-blue-50",
                      iconColor: "text-blue-600",
                      badgeBg: "bg-blue-100",
                      badgeText: "text-blue-800",
                    },
                    requirements: [
                      "Valid Rwandan National ID or Passport",
                      "Proof of income or business statements",
                      "Completed BAHO loan application form",
                    ],
                  };

                  const IconComponent = meta.icon;

                  const dynamicFeatures = [
                    `Repayment up to ${product.maxTenureMonths} month${product.maxTenureMonths > 1 ? "s" : ""}`,
                    `Competitive ${product.interestRate}% monthly rate`,
                    `RWF ${product.minAmount.toLocaleString()} – ${product.maxAmount.toLocaleString()}`,
                    "No hidden administrative fees",
                  ];

                  return (
                    <div
                      key={product.id}
                      id={product.slug}
                      className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-8"
                    >
                      {/* Header Row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                        <div className="flex items-start space-x-5">
                          <div
                            className={`w-14 h-14 rounded-2xl ${meta.theme.iconBg} ${meta.theme.iconColor} flex items-center justify-center flex-shrink-0 shadow-sm`}
                          >
                            <IconComponent className="w-7 h-7" />
                          </div>
                          <div className="space-y-1">
                            <span
                              className={`inline-block text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${meta.theme.badgeBg} ${meta.theme.badgeText}`}
                            >
                              {meta.categoryTag}
                            </span>
                            <h2 className="text-3xl font-extrabold text-baho-navy-dark tracking-tight">
                              {product.name}
                            </h2>
                          </div>
                        </div>

                        <Link href={`/apply?product=${product.slug}`}>
                          <Button
                            variant="gold"
                            size="lg"
                            className="font-bold shadow-md"
                          >
                            Apply For {product.name}
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
                            {dynamicFeatures.map((feat, idx) => (
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

                        {/* Right: Requirements Box */}
                        <div className="lg:col-span-6 bg-slate-50/90 rounded-2xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
                          <div className="flex items-center space-x-2 text-baho-navy-dark font-extrabold text-lg">
                            <FileText className="w-5 h-5 text-baho-gold" />
                            <h3>Requirements</h3>
                          </div>

                          <ul className="space-y-2.5">
                            {meta.requirements.map((req, idx) => (
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
            )}
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
