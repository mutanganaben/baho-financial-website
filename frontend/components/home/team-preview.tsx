"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ArrowRight, User } from "lucide-react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio?: string;
  image?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "joshua-intwari",
    name: "Joshua Intwari",
    role: "Managing Director & CEO",
    department: "EXECUTIVE MANAGEMENT",
    bio: "Over 15 years of senior executive experience in Rwandan banking, microfinance risk management, and SME growth strategy.",
    image: "",
  },
  {
    id: "jacky",
    name: "Jacky",
    role: "Operations and Business Manager",
    department: "OPERATIONS AND BUSINESS",
    bio: "Expert in retail lending, credit underwriting, and branch operations, driving 90%+ portfolio quality across all regions.",
    image: "",
  },
  {
    id: "emmanuel",
    name: "Emmanuel",
    role: "Finance & Administration Manager",
    department: "FINANCE & ADMINISTRATION",
    bio: "Specialist in regulatory compliance, NDFI financial governance, and financial consumer protection under BNR guidelines.",
    image: "",
  },
];

export const TeamPreview: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-t border-b border-slate-200/70 overflow-hidden">
      <Container>
        {/* Section Header with Title & View all Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>TEAM</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
              Meet our team
            </h2>
          </div>

          <div>
            <Link
              href="/about#team"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-baho-navy hover:bg-baho-navy-dark text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-baho-navy/30 transition-all duration-300 flex flex-col group"
            >
              {/* Card Upper Top Visual Container (styled like the rapid reference) */}
              <div className="relative aspect-[4/3] bg-gradient-to-b from-blue-50/80 to-slate-100/90 flex items-center justify-center overflow-hidden">
                {!imageErrors[member.id] && member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(member.id)}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-blue-100 text-baho-navy flex items-center justify-center">
                    <User className="w-12 h-12 stroke-[1.5]" />
                  </div>
                )}
              </div>

              {/* Card Details Footer */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4 bg-white border-t border-slate-100">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-baho-navy-dark tracking-tight leading-snug group-hover:text-baho-navy transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700">
                    {member.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-baho-blue tracking-wider uppercase">
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
