"use client";

import React from "react";
import { Container } from "@/components/ui/container";

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "4", label: "Branches Nationwide" },
  { value: "<24h", label: "Loan Approval" },
  { value: "100+", label: "Clients Served" },
  { value: "2025", label: "Established" },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-[#0B1B33] text-white py-10 border-t border-b border-slate-800">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-center">
          {STATS.map((stat, index) => (
            <div key={index} className={`space-y-1 ${index > 0 ? "pt-6 md:pt-0" : ""}`}>
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
