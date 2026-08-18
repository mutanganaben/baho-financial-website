"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#0B1B33] text-white relative overflow-hidden">
      {/* Radial Decorative Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-baho-gold/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
        {/* Subtitle Tag */}
        <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
          <span className="w-6 h-0.5 bg-baho-gold inline-block" />
          <span>GET STARTED</span>
          <span className="w-6 h-0.5 bg-baho-gold inline-block" />
        </div>

        {/* Display Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Take the Next Step?
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
          Apply online in under 5 minutes or visit any of our regional branches in Kigali, Kamonyi, and Nyagatare.
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link href="/apply">
            <Button variant="gold" size="md" className="px-6 py-2.5 font-bold shadow-md text-sm sm:text-base">
              Apply Now
            </Button>
          </Link>
          <Link href="/contact#inquiry">
            <Button variant="outline" size="md" className="border border-white/60 text-white hover:bg-white hover:text-baho-navy px-6 py-2.5 font-bold text-sm sm:text-base">
              <PhoneCall className="w-4 h-4 mr-2" strokeWidth={2} />
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
