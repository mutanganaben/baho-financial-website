"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Loans", href: "/financing" },
  { label: "Branches", href: "/branches" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm bg-white">
      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-baho-border transition-all">
        <Container className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
              <Image
                src="/images/BAHO FINANCIAL LTD.png"
                alt="BAHO Financial Ltd."
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-baho-navy transition-colors whitespace-nowrap">
              Baho Financial Ltd.
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-baho-navy transition-colors duration-150 py-2 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-baho-navy transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action CTA Button & Mobile Trigger */}
          <div className="flex items-center space-x-4">
            <Link href="/apply" className="hidden sm:inline-flex">
              <Button variant="gold" size="md" className="font-semibold shadow-md whitespace-nowrap">
                Apply Now
              </Button>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2} /> : <Menu className="w-6 h-6" strokeWidth={2} />}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-baho-border px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-baho-navy transition-all"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" strokeWidth={2} />
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100">
              <Link href="/apply" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="gold" size="md" className="w-full justify-center">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
