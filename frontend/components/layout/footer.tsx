"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Phone, MapPin, Mail } from "lucide-react";

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
            BAHO Financial Ltd. Fast credit, built on trust.
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
              <a
                href="tel:+250788381721"
                className="hover:text-white text-slate-300 transition-colors"
              >
                +250 788 381 721
              </a>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-baho-gold flex-shrink-0" strokeWidth={2} />
              <a
                href="mailto:info@bahofinancial.com"
                className="hover:text-white text-slate-300 transition-colors"
              >
                info@bahofinancial.com
              </a>
            </div>

            {/* WhatsApp Link */}
            <div className="pt-2">
              <a
                href="https://wa.me/250788381721?text=Hello%20BAHO%20Financial%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-semibold transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.11L7.79 18.93L4.66 19.75L5.49 16.7L5.29 16.38C4.54 15.19 4.14 13.57 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.83 7.37C8.64 7.37 8.34 7.44 8.08 7.72C7.82 8.01 7.08 8.7 7.08 10.12C7.08 11.54 8.11 12.91 8.26 13.1C8.4 13.3 10.26 16.17 13.11 17.4C15.48 18.42 15.96 18.22 16.48 18.17C17 18.12 18.15 17.49 18.39 16.82C18.63 16.14 18.63 15.56 18.56 15.44C18.49 15.32 18.3 15.25 18.01 15.11C17.72 14.96 16.3 14.27 16.03 14.17C15.77 14.07 15.58 14.02 15.39 14.31C15.19 14.6 14.63 15.26 14.46 15.45C14.29 15.65 14.12 15.67 13.83 15.53C13.54 15.38 12.61 15.08 11.51 14.1C10.65 13.33 10.07 12.38 9.9 12.09C9.73 11.8 9.88 11.64 10.03 11.5C10.16 11.37 10.32 11.16 10.47 10.99C10.61 10.82 10.66 10.69 10.76 10.5C10.86 10.31 10.81 10.14 10.74 10C10.66 9.85 10.08 8.42 9.84 7.84C9.6 7.27 9.36 7.35 9.18 7.34C9.01 7.33 8.83 7.37 8.83 7.37Z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>
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
