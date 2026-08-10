"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export interface HeroSlide {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImage: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    tagline: "BAHO FINANCIAL LTD.",
    title: "Financing Your Future, Today.",
    subtitle: "Fast, flexible financial solutions for individuals and businesses across Rwanda.",
    primaryCtaText: "Apply Now",
    primaryCtaLink: "/apply",
    secondaryCtaText: "Our Products",
    secondaryCtaLink: "/financing",
    backgroundImage: "/images/Baho1.jpeg",
  },
  {
    id: "slide-2",
    tagline: "BAHO FINANCIAL LTD.",
    title: "Grow Your Business With Confidence.",
    subtitle: "Access the capital you need to expand, invest, and achieve your business goals.",
    primaryCtaText: "Apply Now",
    primaryCtaLink: "/apply",
    secondaryCtaText: "Our Products",
    secondaryCtaLink: "/financing",
    backgroundImage: "/images/Baho2.jpeg",
  },
  {
    id: "slide-3",
    tagline: "BAHO FINANCIAL LTD.",
    title: "Apply in Minutes, Approved in 24 Hours.",
    subtitle: "Our streamlined process means less waiting and more doing what matters.",
    primaryCtaText: "Apply Now",
    primaryCtaLink: "/apply",
    secondaryCtaText: "Our Products",
    secondaryCtaLink: "/financing",
    backgroundImage: "/images/Baho3.jpeg",
  },
  {
    id: "slide-4",
    tagline: "BAHO FINANCIAL LTD.",
    title: "Trusted by Clients Across the Country.",
    subtitle: "Join our growing community of clients who are transforming their lives with BAHO.",
    primaryCtaText: "Apply Now",
    primaryCtaLink: "/apply",
    secondaryCtaText: "Our Products",
    secondaryCtaLink: "/financing",
    backgroundImage: "/images/Baho4.jpeg",
  },
];

export const HeroSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance slide every 5 seconds (5000ms) with Ken Burns & Fade Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="relative w-full h-[440px] sm:h-[480px] lg:h-[510px] overflow-hidden bg-baho-navy-dark text-white flex items-start pt-14 sm:pt-16 lg:pt-20">
      {/* Background Stacked Images with Ken Burns (Zoom) and Smooth 1.5s Crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={slide.id}
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
                  src={slide.backgroundImage}
                  alt={slide.title}
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

      {/* Fixed Text Content Layer with Subtle Smooth Crossfade */}
      <Container className="relative z-30">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase transition-opacity duration-700">
            <span className="w-8 h-0.5 bg-baho-gold inline-block" />
            <span>{activeSlide.tagline}</span>
          </div>

          {/* Dynamic Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white transition-all duration-700">
            {activeSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl transition-all duration-700">
            {activeSlide.subtitle}
          </p>

          {/* Fixed Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 sm:pt-3">
            <Link href={activeSlide.primaryCtaLink}>
              <Button
                variant="gold"
                size="lg"
                className="px-8 py-3.5 text-base font-bold shadow-xl"
              >
                {activeSlide.primaryCtaText}
              </Button>
            </Link>
            <Link href={activeSlide.secondaryCtaLink}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/70 text-white hover:bg-white hover:text-baho-navy px-8 py-3.5 text-base font-semibold backdrop-blur-sm"
              >
                {activeSlide.secondaryCtaText}
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Slide Indicators / Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center space-x-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              activeIndex === idx
                ? "w-8 bg-baho-gold shadow-md"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
