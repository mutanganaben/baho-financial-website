"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Zap,
  ShieldCheck,
  Handshake,
  Lightbulb,
  FileText,
  Search,
  CreditCard,
  LucideIcon,
  ArrowRight,
} from "lucide-react";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: FeatureItem[] = [
  {
    id: "fast-approval",
    title: "Fast Approval",
    description: "Get a credit decision within 24 hours of submitting your complete application.",
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "licensed-regulated",
    title: "Licensed & Regulated",
    description: "Fully licensed NDFI regulated by the National Bank of Rwanda (BNR).",
    icon: ShieldCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "flexible-terms",
    title: "Flexible Repayment",
    description: "Tailored schedules structured to fit your unique business or personal cash flow.",
    icon: Handshake,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "expert-guidance",
    title: "Dedicated Support",
    description: "Experienced loan officers provide guidance from application to disbursement.",
    icon: Lightbulb,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Submit Application",
    description: "Apply online or visit any BAHO branch with your basic identification and details.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Document Review",
    description: "Our credit team reviews your file and confirms eligibility within 24 hours.",
    icon: Search,
  },
  {
    number: "03",
    title: "Receive Funds",
    description: "Once approved, funds are disbursed directly to your account or at a local branch.",
    icon: CreditCard,
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#f4f7fa] border-t border-b border-slate-200/70 overflow-hidden">
      <Container className="space-y-16">
        {/* Part 1: Why Choose BAHO (Trust Features) */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>WHY CHOOSE BAHO</span>
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
              Built for Your Financial Needs
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We serve individuals, entrepreneurs, and businesses across Rwanda who need reliable capital with clear terms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => {
              const IconComponent = feature.icon;

              return (
                <div
                  key={feature.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-baho-navy/30 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center p-3 transition-transform group-hover:scale-105`}
                  >
                    <IconComponent className="w-6 h-6" strokeWidth={1.75} />
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-bold text-baho-navy-dark tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: How Financing Works (3-Step Process) */}
        <div className="pt-8 border-t border-slate-200/80 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs tracking-wider uppercase">
              <span className="w-6 h-0.5 bg-baho-gold inline-block" />
              <span>SIMPLE 3-STEP PROCESS</span>
              <span className="w-6 h-0.5 bg-baho-gold inline-block" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-baho-navy-dark tracking-tight">
              How Financing Works
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Three easy steps stand between you and your financial goal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <div
                  key={index}
                  className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-3 relative group"
                >
                  {/* Step Badge */}
                  <div className="w-12 h-12 rounded-full bg-baho-navy text-baho-gold flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>

                  <h4 className="text-lg font-bold text-baho-navy-dark tracking-tight">
                    {step.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link href="/apply">
              <Button variant="gold" size="lg" className="px-8 py-3.5 font-bold shadow-md text-base rounded-xl">
                Start Loan Application
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
