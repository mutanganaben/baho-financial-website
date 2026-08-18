"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import { fetchApi, ApiProduct } from "@/lib/api";

import {
  Briefcase,
  UserCheck,
  Sprout,
  Zap,
  Check,
  ChevronDown,
  LucideIcon,
  AlertCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const PRODUCT_THEMES: Record<
  string,
  {
    badge: string;
    icon: LucideIcon;
    theme: {
      iconBg: string;
      iconColor: string;
      checkColor: string;
    };
  }
> = {
  "cash-advance": {
    badge: "Same-day approval",
    icon: Zap,
    theme: {
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      checkColor: "text-rose-600 bg-rose-50",
    },
  },
  "personal-loan": {
    badge: "Decision within 24 hours",
    icon: UserCheck,
    theme: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      checkColor: "text-emerald-600 bg-emerald-50",
    },
  },
  "startup-business-loan": {
    badge: "Approved in 48 hours",
    icon: Sprout,
    theme: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      checkColor: "text-amber-600 bg-amber-50",
    },
  },
  "business-growth-loan": {
    badge: "Decision within 1–2 days",
    icon: Briefcase,
    theme: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      checkColor: "text-blue-600 bg-blue-50",
    },
  },
};

const REQUIRED_DOCUMENTS = [
  { number: "01", title: "Valid national ID or passport" },
  { number: "02", title: "Proof of residence (utility bill or sector certificate)" },
  { number: "03", title: "Recent 3 months bank or mobile money statements / income proof" },
  { number: "04", title: "CRB clearance certificate" },
  { number: "05", title: "Two guarantors with valid IDs / collateral documents" },
  { number: "06", title: "Completed BAHO loan application form" },
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
      "Loan approval timelines vary by product: Cash Advance is approved same-day, Personal Loans within 24 hours, Startup Business Loans in 48 hours, and Business Growth Loans within 1–2 days after full document submission.",
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
      "You can start your application online by clicking 'Apply For Loan' on the navigation bar, visiting any BAHO branch (Kigali Head Office in Kabuga, Ruyenzi Branch, or Nyagatare Branches in Rwimiyaga & Rukomo), or calling our dedicated client advisors.",
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
        <section className="bg-[#0B1B33] text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-6 h-0.5 bg-baho-gold inline-block" />
              <span>BAHO FINANCIAL LTD.</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
              Financing Products
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-normal leading-relaxed">
              Flexible, transparent financing solutions designed around your needs.
            </p>
          </Container>
        </section>

        {/* Section 2: Interactive Tabs & Products Grid */}
        <section className="py-16 lg:py-20 bg-white border-b border-slate-200/70">
          <Container className="space-y-10">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-7 border border-slate-200 animate-pulse space-y-5"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100" />
                    <div className="h-6 bg-slate-100 rounded w-3/4" />
                    <div className="h-16 bg-slate-100 rounded w-full" />
                    <div className="h-10 bg-slate-100 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : activeTab === "all" ? (
              /* All Products Responsive Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => {
                  const meta = PRODUCT_THEMES[product.slug] || {
                    badge: "Fast Approval",
                    icon: Zap,
                    theme: {
                      iconBg: "bg-blue-50",
                      iconColor: "text-blue-600",
                      checkColor: "text-blue-600 bg-blue-50",
                    },
                  };

                  const IconComponent = meta.icon;

                  const features = [
                    `Repayment up to ${product.maxTenureMonths} month${product.maxTenureMonths > 1 ? "s" : ""}`,
                    `Competitive ${product.interestRate}% rate`,
                    `RWF ${product.minAmount.toLocaleString()} – ${product.maxAmount.toLocaleString()}`,
                  ];

                  return (
                    <div
                      key={product.id}
                      id={product.slug}
                      onClick={() => setActiveTab(product.slug)}
                      className="bg-white rounded-2xl p-7 border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="space-y-5">
                        {/* Category Icon Badge & Processing Time Tag */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-14 h-14 rounded-2xl ${meta.theme.iconBg} ${meta.theme.iconColor} flex items-center justify-center p-3 transition-transform group-hover:scale-110`}
                          >
                            <IconComponent className="w-7 h-7" strokeWidth={1.75} />
                          </div>
                          <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                            {meta.badge}
                          </span>
                        </div>

                        {/* Product Title */}
                        <h3 className="text-2xl font-bold text-baho-navy-dark tracking-tight">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-600 leading-relaxed min-h-[72px]">
                          {product.description}
                        </p>

                        {/* Key Details Checklist */}
                        <div className="space-y-2.5 pt-4 border-t border-slate-100">
                          {features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2.5 text-xs font-semibold text-slate-700"
                            >
                              <div
                                className={`p-1 rounded-full ${meta.theme.checkColor} flex-shrink-0`}
                              >
                                <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
                              </div>
                              <span
                                className={
                                  feature.startsWith("RWF")
                                    ? "font-bold text-baho-navy-dark"
                                    : ""
                                }
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between text-xs font-bold text-baho-navy group-hover:text-baho-gold transition-colors border-t border-slate-100 mt-5">
                        <span>Click to view requirements</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Single Selected Product + Requirements Side-by-Side Split View */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Selected Product Details */}
                {filteredProducts.map((product) => {
                  const meta = PRODUCT_THEMES[product.slug] || {
                    badge: "Fast Approval",
                    icon: Zap,
                    theme: {
                      iconBg: "bg-blue-50",
                      iconColor: "text-blue-600",
                      checkColor: "text-blue-600 bg-blue-50",
                    },
                  };

                  const IconComponent = meta.icon;

                  const features = [
                    `Repayment up to ${product.maxTenureMonths} month${product.maxTenureMonths > 1 ? "s" : ""}`,
                    `Competitive ${product.interestRate}% interest rate`,
                    `Financing amount: RWF ${product.minAmount.toLocaleString()} – ${product.maxAmount.toLocaleString()}`,
                  ];

                  return (
                    <div key={product.id} className="lg:col-span-5 flex flex-col">
                      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full space-y-5">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div
                              className={`w-12 h-12 rounded-2xl ${meta.theme.iconBg} ${meta.theme.iconColor} flex items-center justify-center p-3`}
                            >
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                              {meta.badge}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-baho-navy-dark tracking-tight">
                              {product.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 font-normal">
                              {product.description}
                            </p>
                          </div>

                          <div className="space-y-2.5 pt-3.5 border-t border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                              Key Product Terms
                            </span>
                            {features.map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2.5 text-xs sm:text-sm font-semibold text-slate-700"
                              >
                                <div
                                  className={`p-1 rounded-full ${meta.theme.checkColor} flex-shrink-0`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                                <span
                                  className={
                                    feature.startsWith("Financing amount:")
                                      ? "font-bold text-baho-navy-dark"
                                      : ""
                                  }
                                >
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 mt-auto">
                          <Link href={`/apply?product=${product.slug}`}>
                            <Button size="md" className="w-full font-bold shadow-sm py-2.5 text-sm">
                              <span>Apply for {product.name}</span>
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Right Column: Loan Requirements Card covering the empty right space */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-1 border-b border-slate-100 pb-4">
                      <div className="inline-flex items-center space-x-2 text-baho-gold font-bold text-xs tracking-wider uppercase">
                        <span className="w-6 h-0.5 bg-baho-gold inline-block" />
                        <span>REQUIRED DOCUMENTS</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-baho-navy-dark tracking-tight">
                        Loan Requirements
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal">
                        Required documentation to prepare for your loan application.
                      </p>
                    </div>

                    <div className="space-y-0 divide-y divide-slate-100">
                      {REQUIRED_DOCUMENTS.map((doc) => (
                        <div key={doc.number} className="flex items-center space-x-3.5 py-2.5">
                          <span className="text-baho-navy font-bold text-xs sm:text-sm tracking-wider flex-shrink-0 w-6">
                            {doc.number}
                          </span>
                          <span className="text-slate-800 font-medium text-xs sm:text-sm">
                            {doc.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between mt-auto">
                    <div className="space-y-0.5 pr-3">
                      <div className="text-xs font-bold text-slate-900">Need help preparing documents?</div>
                      <div className="text-xs text-slate-500">Visit any BAHO branch for free advisor assistance.</div>
                    </div>
                    <Link href="/contact" className="flex-shrink-0">
                      <Button variant="outline" size="sm" className="font-bold text-xs bg-white h-8 px-3">
                        Contact Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* Section 3: Required Documents / Loan Requirements (Shown when All Products tab is active) */}
        {activeTab === "all" && (
          <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/70">
            <Container className="space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                  <span className="w-6 h-0.5 bg-baho-gold inline-block" />
                  <span>REQUIRED DOCUMENTS</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
                  Loan Requirements
                </h2>
              </div>

              {/* Clean Numbered List matching reference layout */}
              <div className="max-w-3xl space-y-0 divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
                {REQUIRED_DOCUMENTS.map((doc) => (
                  <div key={doc.number} className="flex items-center space-x-6 py-3.5 sm:py-4">
                    <span className="text-baho-navy font-bold text-sm sm:text-base tracking-wider flex-shrink-0 w-8">
                      {doc.number}
                    </span>
                    <span className="text-slate-800 font-medium text-sm sm:text-base">
                      {doc.title}
                    </span>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Section 4: Frequently Asked Questions */}
        <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-b border-slate-200/70">
          <Container className="max-w-4xl space-y-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                <span className="w-6 h-0.5 bg-baho-gold inline-block" />
                <span>QUESTIONS & ANSWERS</span>
                <span className="w-6 h-0.5 bg-baho-gold inline-block" />
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight">
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
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none"
                    >
                      <span className="text-base sm:text-lg font-semibold text-slate-800 pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-baho-navy" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-5 sm:p-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed font-normal border-t border-slate-100 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Section 5: Call to Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
