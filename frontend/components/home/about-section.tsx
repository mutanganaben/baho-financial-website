"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface KeyMetric {
  value: string;
  label: string;
}

const ABOUT_METRICS: KeyMetric[] = [
  { value: "RWF 80M+", label: "Capital Disbursed" },
  { value: "100+", label: "Active Clients" },
  { value: "90%", label: "Repayment Rate" },
  { value: "4 Branches", label: "Across Rwanda" },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Section Tagline & Display Heading */}
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>ABOUT BAHO</span>
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-baho-navy-dark tracking-tight leading-[1.15]">
              Building Financial Futures Since 2025
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              BAHO Financial Ltd. is a licensed microfinance institution dedicated to providing accessible, transparent, and impactful financial services to individuals, entrepreneurs, and businesses across Rwanda.
            </p>
          </div>

          {/* Detailed Overview Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 space-y-6">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Launched in 2025 with a commitment to community impact, we operate 4 branches serving clients across Rwanda — helping them start businesses, build homes, and fund their most important goals.
            </p>

            {/* Core Values Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/70">
              {[
                "Licensed & Regulated NDFI (BNR)",
                "24-Hour Fast Loan Processing",
                "Transparent, Zero Hidden Fees",
                "Dedicated Financial Advisory",
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm font-bold text-baho-navy-dark">
                  <CheckCircle2 className="w-5 h-5 text-baho-gold flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Badges Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ABOUT_METRICS.map((metric, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 p-5 rounded-2xl text-center space-y-1 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-baho-navy">
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center pt-2">
            <Link href="/about">
              <Button variant="primary" size="lg" className="font-bold shadow-md">
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
