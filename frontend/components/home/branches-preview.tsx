"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export interface BranchInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  href: string;
}

const BRANCHES: BranchInfo[] = [
  {
    id: "kigali-head-office",
    name: "Kigali — Head Office",
    address: "Kabuga, Gasabo District, Kigali",
    phone: "+250 788 123 456",
    href: "/branches#kigali-kabuga",
  },
  {
    id: "ruyenzi-branch",
    name: "Ruyenzi Branch",
    address: "Ruyenzi, Kamonyi District, Southern Province",
    phone: "+250 788 234 567",
    href: "/branches#ruyenzi",
  },
  {
    id: "nyagatare-rwimiyaga",
    name: "Nyagatare — Rwimiyaga Branch",
    address: "Rwimiyaga, Nyagatare District, Eastern Province",
    phone: "+250 788 345 678",
    href: "/branches#nyagatare-rwimiyaga",
  },
  {
    id: "nyagatare-rukomo",
    name: "Nyagatare — Rukomo Branch",
    address: "Rukomo, Nyagatare District, Eastern Province",
    phone: "+250 788 456 789",
    href: "/branches#nyagatare-rukomo",
  },
];

export const BranchesPreview: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 overflow-hidden">
      <Container>
        {/* Section Header with Title & All Branches Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>BRANCHES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
              Find Us Near You
            </h2>
          </div>

          <Link
            href="/branches"
            className="inline-flex items-center space-x-2 text-baho-navy hover:text-baho-gold font-bold text-base transition-colors group"
          >
            <span>All Branches</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Branch Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-baho-navy/30 transition-all duration-300 space-y-6 group"
            >
              {/* Location Pin Badge */}
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-blue-600 flex items-center justify-center p-3.5 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>

              {/* Branch Information */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-baho-navy-dark tracking-tight">
                  {branch.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {branch.address}
                </p>
              </div>

              {/* Branch Phone Number */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-baho-navy hover:text-baho-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{branch.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
