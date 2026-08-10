"use client";

import React from "react";
import { Container } from "@/components/ui/container";

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "4", label: "Active Branches" },
  { value: "<24h", label: "Loan Approval" },
  { value: "10%", label: "Monthly Interest" },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-[#0B1B33] text-white py-8 border-t border-b border-slate-800">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 text-center">
          {STATS.map((stat, index) => (
            <div key={index} className={`space-y-1 ${index > 0 ? "pt-4 sm:pt-0" : ""}`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-baho-gold tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
