"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";

export interface TeamMember {
  id: string;
  role: string;
  department: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "operations-business-manager",
    role: "Operations and Business Manager",
    department: "OPERATIONS AND BUSINESS MANAGER",
  },
  {
    id: "finance-administration",
    role: "Finance & Administration",
    department: "FINANCE & ADMINISTRATION",
  },
  {
    id: "managing-director",
    role: "Managing Director",
    department: "MD",
  },
];

export const TeamPreview: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-slate-50/70 border-t border-b border-slate-200/70 overflow-hidden">
      <Container>
        {/* Section Header with Title & All Team Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-navy font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-navy inline-block" />
              <span>TEAM</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight leading-tight">
              Meet Our Team
            </h2>
          </div>

          <Link href="/about#team">
            <Button className="bg-baho-navy hover:bg-[#16355E] text-white font-bold py-3.5 px-7 rounded-xl shadow-sm text-base">
              View All
            </Button>
          </Link>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Upper Top Visual Container */}
              <div className="relative aspect-[4/3] bg-slate-100/90 flex items-center justify-center overflow-hidden border-b border-slate-100">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-baho-navy transition-transform group-hover:scale-105 duration-300">
                  <UserRound className="w-16 h-16 sm:w-20 sm:h-20 fill-current" strokeWidth={0} />
                </div>
              </div>

              {/* Card Details Footer */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 bg-white">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-baho-navy-dark tracking-tight leading-snug">
                    {member.role}
                  </h3>
                </div>

                <div>
                  <span className="text-xs font-bold text-baho-navy tracking-wider uppercase">
                    {member.department}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
