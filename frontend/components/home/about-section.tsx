"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const AboutSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-[#f2f6fa] border-b border-slate-200/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
              About Baho Financial Ltd.
            </h2>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              BAHO Financial Ltd. is a micro-lending institution providing loans to individuals and Businesses across Rwanda where Loans are made simple, dreams are made real.
            </p>

            {/* Mission / Motto Italicized */}
            <p className="text-sm sm:text-base text-slate-500 italic leading-relaxed pt-1">
              Our mission is to empower your financial journey with flexible credit options, fast approvals and transparent terms.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/about">
                <Button className="bg-baho-navy hover:bg-baho-navy-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all text-sm sm:text-base">
                  Learn more
                </Button>
              </Link>
              <Link href="/apply">
                <Button variant="gold" className="font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all text-sm sm:text-base">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Stat Cards Grid & Banner */}
          <div className="lg:col-span-5 space-y-5">
            {/* Top Row: 2 Cards */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm text-center space-y-1.5 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-baho-navy tracking-tight">
                  4
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  ACTIVE BRANCHES
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm text-center space-y-1.5 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-baho-navy tracking-tight">
                  &lt; 24h
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  LOAN APPROVAL
                </div>
              </div>
            </div>

            {/* Middle Row: 1 Half-Width Card */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm text-center space-y-1.5 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-baho-navy tracking-tight">
                  10%
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  MONTHLY INTEREST
                </div>
              </div>
              <div className="hidden sm:block" />
            </div>

            {/* Bottom Row: Full-Width Branch Banner */}
            <Link
              href="/branches"
              className="block bg-baho-navy hover:bg-baho-navy-dark text-white font-bold py-4 px-6 rounded-2xl text-center shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] text-base sm:text-lg"
            >
              4 branches across Rwanda
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
