"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FileText, Search, CreditCard, LucideIcon } from "lucide-react";

export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: StepItem[] = [
  {
    number: "STEP 01",
    title: "Submit Your Application",
    description:
      "Complete our simple application form online or visit any BAHO branch. Provide your personal details and specify your financing needs.",
    icon: FileText,
  },
  {
    number: "STEP 02",
    title: "Document Review",
    description:
      "Our credit team reviews your documents and assesses eligibility. We may contact you for additional information within 24 hours.",
    icon: Search,
  },
  {
    number: "STEP 03",
    title: "Receive Your Funds",
    description:
      "Once approved, funds are disbursed directly to your bank account or in person at your nearest BAHO branch — same day.",
    icon: CreditCard,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-[#0B1B33] text-white overflow-hidden relative border-t border-b border-slate-800">
      {/* Background Decorative Gradient Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 lg:mb-12">
          <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs tracking-wider uppercase">
            <span className="w-6 h-0.5 bg-baho-gold inline-block" />
            <span>HOW IT WORKS</span>
            <span className="w-6 h-0.5 bg-baho-gold inline-block" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How Financing Works
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Three simple steps stand between you and your financing goal.
          </p>
        </div>

        {/* 3-Step Grid with Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
          {STEPS.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <div key={index} className="flex flex-col items-center text-center space-y-3 group relative">
                {/* Horizontal Step Connector Line (Desktop only, between steps) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-slate-700/80 -z-0" />
                )}

                {/* Step Circle Badge */}
                <div className="w-14 h-14 rounded-full bg-baho-gold text-slate-950 flex items-center justify-center p-3.5 shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10">
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Step Number Tag */}
                <div className="text-[11px] font-extrabold text-baho-gold tracking-widest uppercase pt-1">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button at Bottom */}
        <div className="text-center pt-8 sm:pt-10">
          <Link href="/apply">
            <Button variant="gold" size="md" className="px-7 py-3 font-bold shadow-md text-sm sm:text-base">
              Start Loan Application
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
