"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import {
  Zap,
  ShieldCheck,
  Handshake,
  Globe,
  ClipboardCheck,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
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
    description: "Fully licensed by the National Bank of Rwanda. Your funds are safe and secure.",
    icon: ShieldCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "flexible-terms",
    title: "Flexible Terms",
    description: "We tailor repayment schedules to fit your cash flow and financial situation.",
    icon: Handshake,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    id: "branch-network",
    title: "4 Branch Locations",
    description: "Serving clients through 4 branches in Kigali, Kamonyi, and Nyagatare across Rwanda.",
    icon: Globe,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
  },
  {
    id: "simple-process",
    title: "Simple Process",
    description: "Minimal paperwork, clear requirements, and transparent terms — no surprises.",
    icon: ClipboardCheck,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    id: "expert-guidance",
    title: "Expert Guidance",
    description: "Dedicated loan officers provide personalized guidance from application to disbursement.",
    icon: Lightbulb,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 overflow-hidden">
      <Container>
        {/* Section Title & Subtitle Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
            <span className="w-8 h-0.5 bg-baho-gold inline-block" />
            <span>WHY CHOOSE BAHO</span>
            <span className="w-8 h-0.5 bg-baho-gold inline-block" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
            Built on Trust. Driven by Results.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We combine deep financial expertise with a genuine commitment to empowering entrepreneurs, individuals, and growing businesses.
          </p>
        </div>

        {/* 6 Features Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={feature.id}
                className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
              >
                {/* Feature Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center p-3.5 flex-shrink-0 transition-transform group-hover:scale-110`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Feature Text Content */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-baho-navy-dark tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
