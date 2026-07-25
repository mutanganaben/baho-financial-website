"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-baho-navy-dark text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
        
        {/* Column 1 & 2: Brand Identity & Regulatory License */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="relative w-48 h-14 bg-white/90 p-2 rounded-lg">
              <Image
                src="/baho-logo-horizontal.svg"
                alt="BAHO Financial Ltd."
                fill
                className="object-contain p-1"
              />
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
            Empowering businesses and individuals across Rwanda with fast, accessible, and transparent credit solutions.
          </p>
          <div className="flex items-center space-x-2 text-xs text-baho-gold font-medium bg-slate-900/60 p-3 rounded-lg border border-slate-800 max-w-sm">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-baho-gold" />
            <span>Regulated & Licensed NDFI Financial Service Provider.</span>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white text-base font-bold tracking-wide">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Loans", href: "/financing" },
              { label: "How to Apply", href: "/how-to-apply" },
              { label: "Branch Locations", href: "/branches" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors duration-150 flex items-center space-x-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-baho-gold group-hover:translate-x-1 transition-transform" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Financial Solutions */}
        <div className="space-y-4">
          <h4 className="text-white text-base font-bold tracking-wide">Our Products</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              "Cash Advance",
              "Personal Loan",
              "Startup Business Loan",
              "Business Growth Loan",
            ].map((product) => (
              <li key={product}>
                <Link
                  href="/financing"
                  className="hover:text-white transition-colors duration-150 flex items-center space-x-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-baho-gold flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <span>{product}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white text-base font-bold tracking-wide">Headquarters</h4>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-baho-gold flex-shrink-0 mt-1" />
              <span>Kabuga, Gasabo District, Kigali, Rwanda</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-baho-gold flex-shrink-0" />
              <span>+250 788 123 456</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-baho-gold flex-shrink-0" />
              <span>kabuga.hq@bahofinancial.rw</span>
            </div>
          </div>
        </div>

      </Container>

      {/* Copyright Strip */}
      <Container className="pt-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} BAHO Financial Ltd. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};
