"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-baho-navy-dark text-slate-300 pt-10 pb-6 border-t border-slate-800">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">

        {/* Column 1 & 2: Brand Identity */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block group">
            <div className="relative w-48 h-12 bg-white/95 p-1.5 rounded-xl border border-slate-700/60 shadow-sm">
              <Image
                src="/images/BAHO FINANCIAL LTD.png"
                alt="BAHO Financial Ltd."
                fill
                className="object-contain p-0.5"
              />
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
            BNR-licensed Non-Deposit Financial Institution (NDFI) delivering fast, accessible credit solutions for businesses and individuals across Rwanda.
          </p>
        </div>

        {/* Column 3: Pages (2-Column Split) */}
        <div className="space-y-3">
          <h4 className="text-white text-base font-bold tracking-wide">Pages</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="space-y-2">
              <Link href="/" className="hover:text-white text-slate-300 transition-colors block py-0.5">
                Home
              </Link>
              <Link href="/financing" className="hover:text-white text-slate-300 transition-colors block py-0.5">
                Loans
              </Link>
              <Link href="/apply" className="hover:text-white text-slate-300 transition-colors block py-0.5 font-medium text-baho-gold">
                Apply Now
              </Link>
              <Link href="/admin/login" className="hover:text-white text-slate-300 transition-colors block py-0.5">
                Admin
              </Link>
            </div>
            <div className="space-y-2">
              <Link href="/branches" className="hover:text-white text-slate-300 transition-colors block py-0.5">
                Branches
              </Link>
              <Link href="/about" className="hover:text-white text-slate-300 transition-colors block py-0.5">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-white text-slate-300 transition-colors block py-0.5">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Column 4: Headquarters Contact Info */}
        <div className="space-y-3">
          <h4 className="text-white text-base font-bold tracking-wide">Headquarters</h4>
          <div className="space-y-2.5 text-sm text-slate-400">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-baho-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
              <span>Kabuga, Gasabo District, Kigali, Rwanda</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-baho-gold flex-shrink-0" strokeWidth={2} />
              <span>+250 788 381 721</span>
            </div>
          </div>
        </div>

      </Container>

      {/* Copyright Strip */}
      <Container className="pt-6 text-center sm:text-left text-xs text-slate-500">
        <p>© {new Date().getFullYear()} BAHO Financial Ltd. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};
