"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  UserCheck,
  Sprout,
  Zap,
  Check,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

export interface FinancingProduct {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  theme: {
    iconBg: string;
    iconColor: string;
    badgeBorder: string;
    checkColor: string;
    buttonBg: string;
  };
  features: string[];
  applyLink: string;
}

const PRODUCTS: FinancingProduct[] = [
  {
    id: "cash-advance",
    badge: "Same-day approval",
    title: "Cash Advance",
    description: "Instant short-term cash for urgent daily needs.",
    icon: Zap,
    theme: {
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      badgeBorder: "border-rose-100",
      checkColor: "text-rose-600 bg-rose-50",
      buttonBg: "bg-rose-600 hover:bg-rose-700 text-white",
    },
    features: [
      "Repayment in 1–3 months",
      "Minimal paperwork required",
      "No hidden fees",
      "RWF 50,000 – 500,000",
    ],
    applyLink: "/apply?product=cash-advance",
  },
  {
    id: "personal-loan",
    badge: "Decision within 24 hours",
    title: "Personal Loan",
    description: "Finance education, health, or household improvements.",
    icon: UserCheck,
    theme: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badgeBorder: "border-emerald-100",
      checkColor: "text-emerald-600 bg-emerald-50",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
    features: [
      "Repayment up to 12 months",
      "Competitive 10% monthly rate",
      "Dedicated credit officer",
      "RWF 200,000 – 2,000,000",
    ],
    applyLink: "/apply?product=personal",
  },
  {
    id: "startup-business-loan",
    badge: "Approved in 48 hours",
    title: "Startup Business Loan",
    description: "Kickstart your new business with confidence.",
    icon: Sprout,
    theme: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badgeBorder: "border-amber-100",
      checkColor: "text-amber-600 bg-amber-50",
      buttonBg: "bg-amber-500 hover:bg-amber-600 text-white",
    },
    features: [
      "Repayment up to 18 months",
      "Business plan review support",
      "Flexible draw-down schedule",
      "RWF 500,000 – 5,000,000",
    ],
    applyLink: "/apply?product=startup-business",
  },
  {
    id: "business-growth-loan",
    badge: "Processing in 3–5 days",
    title: "Business Growth Loan",
    description: "Scale your existing business to the next level.",
    icon: Briefcase,
    theme: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      badgeBorder: "border-blue-100",
      checkColor: "text-blue-600 bg-blue-50",
      buttonBg: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    features: [
      "Repayment up to 24 months",
      "CRB-verified fast processing",
      "Dedicated relationship manager",
      "RWF 2,000,000 – 20,000,000",
    ],
    applyLink: "/apply?product=business-growth",
  },
];

export const FinancingProducts: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-b border-slate-200/70">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
            <span className="w-8 h-0.5 bg-baho-gold inline-block" />
            <span>OUR FINANCING PRODUCTS</span>
            <span className="w-8 h-0.5 bg-baho-gold inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
            Tailored Financial Solutions
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore our diverse suite of loan products structured to support personal milestones, agricultural harvests, and corporate expansion across Rwanda.
          </p>
        </div>

        {/* 4 Products Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => {
            const IconComponent = product.icon;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Category Icon Badge & Processing Time Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl ${product.theme.iconBg} ${product.theme.iconColor} flex items-center justify-center p-3 transition-transform group-hover:scale-110`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                      {product.badge}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-2xl font-bold text-baho-navy-dark tracking-tight">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed min-h-[72px]">
                    {product.description}
                  </p>

                  {/* Key Details Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 text-xs font-semibold text-slate-700">
                        <div className={`p-1 rounded-full ${product.theme.checkColor} flex-shrink-0`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className={feature.startsWith("RWF") ? "font-bold text-baho-navy-dark" : ""}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Action Button */}
                <div className="pt-8">
                  <Link href={product.applyLink} className="block">
                    <Button
                      className={`w-full justify-center font-bold py-3.5 rounded-xl transition-all shadow-sm ${product.theme.buttonBg}`}
                    >
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom All Products Link */}
        <div className="text-center pt-12">
          <Link href="/financing" className="inline-flex items-center space-x-2 text-baho-navy hover:text-baho-gold font-bold text-base transition-colors group">
            <span>Explore Full Product Details</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
};
