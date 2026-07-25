"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#0B1B33] text-white relative overflow-hidden">
      {/* Radial Decorative Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-baho-gold/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Subtitle Tag */}
        <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
          <span className="w-8 h-0.5 bg-baho-gold inline-block" />
          <span>GET STARTED</span>
          <span className="w-8 h-0.5 bg-baho-gold inline-block" />
        </div>

        {/* Display Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Take the Next Step?
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Whether you're ready to apply or just have questions, our team is here to help. Reach out today.
        </p>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <Link href="/apply">
            <Button variant="gold" size="lg" className="px-9 py-4 font-bold shadow-xl text-base">
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/contact#inquiry">
            <Button variant="outline" size="lg" className="border-2 border-white/60 text-white hover:bg-white hover:text-baho-navy px-9 py-4 font-bold text-base">
              <PhoneCall className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
