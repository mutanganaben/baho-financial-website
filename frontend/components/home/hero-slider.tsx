"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const BACKGROUND_IMAGES = [
  { id: "bg-1", src: "/images/Baho1.jpeg", alt: "Baho Financial Branch 1" },
  { id: "bg-2", src: "/images/Baho2.jpeg", alt: "Baho Financial Branch 2" },
  { id: "bg-3", src: "/images/Baho3.jpeg", alt: "Baho Financial Branch 3" },
  { id: "bg-4", src: "/images/Baho4.jpeg", alt: "Baho Financial Branch 4" },
];

const HERO_CONTENT = {
  tagline: "BAHO FINANCIAL LTD.",
  title: "Straightforward lending for people and businesses in Rwanda.",
  subtitle:
    "BAHO Financial offers clear loan terms, simple requirements, and fast decisions for eligible clients.",
  primaryCtaText: "Apply Now",
  primaryCtaLink: "/apply",
  secondaryCtaText: "Our Products",
  secondaryCtaLink: "/financing",
};

const HERO_STATS = [
  { value: "4", label: "Active Branches" },
  { value: "<24h", label: "Loan Approval" },
  { value: "10%", label: "Monthly Interest" },
];

export const HeroSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance background image every 5 seconds (5000ms) with Ken Burns Zoom & Fade Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-baho-navy-dark text-white py-16 sm:py-20 lg:py-24 min-h-[540px] sm:min-h-[600px] flex items-center">
      {/* Background Stacked Images with Ken Burns (Zoom) and Smooth 1.5s Crossfade */}
      <div className="absolute inset-0 z-0">
        {BACKGROUND_IMAGES.map((img, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div
                className={`w-full h-full relative transform transition-transform duration-[6000ms] ease-out ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>
            </div>
          );
        })}

        {/* Permanent Dark Corporate Gradient Overlay for Maximum Text Contrast & Stability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-slate-950/90 via-[#0B1B33]/85 to-[#0B1B33]/60 pointer-events-none" />
      </div>

      {/* Fixed Text & Embedded Stats Layer */}
      <Container className="relative z-30">
        <div className="max-w-2xl space-y-3">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs tracking-wider uppercase">
            <span className="w-6 h-0.5 bg-baho-gold inline-block" />
            <span>{HERO_CONTENT.tagline}</span>
          </div>

          {/* Fixed Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white">
            {HERO_CONTENT.title}
          </h1>

          {/* Fixed Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            {HERO_CONTENT.subtitle}
          </p>

          {/* Fixed Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href={HERO_CONTENT.primaryCtaLink}>
              <Button
                variant="gold"
                size="md"
                className="px-6 py-2.5 text-sm font-semibold shadow-md"
              >
                {HERO_CONTENT.primaryCtaText}
              </Button>
            </Link>
            <Link href={HERO_CONTENT.secondaryCtaLink}>
              <Button
                variant="outline"
                size="md"
                className="border-white/70 text-white hover:bg-white hover:text-baho-navy px-6 py-2.5 text-sm font-semibold backdrop-blur-sm"
              >
                {HERO_CONTENT.secondaryCtaText}
              </Button>
            </Link>
          </div>

          {/* Compact Embedded Stats Row */}
          <div className="pt-4 mt-4 border-t border-white/20 max-w-lg">
            <div className="grid grid-cols-3 gap-3 text-left">
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase text-slate-300 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Slide Indicators / Pagination Dots */}
      <div className="absolute bottom-4 right-6 z-40 flex items-center space-x-2">
        {BACKGROUND_IMAGES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              activeIndex === idx
                ? "w-6 bg-baho-gold shadow-md"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
