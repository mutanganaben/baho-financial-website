import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { StatsBar } from "@/components/home/stats-bar";
import { FinancingProducts } from "@/components/home/financing-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { BranchesPreview } from "@/components/home/branches-preview";
import { AboutSection } from "@/components/home/about-section";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-baho-bg">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Slider */}
        <HeroSlider />

        {/* Section 2: Statistics Bar */}
        <StatsBar />

        {/* Section 3: Financing Products */}
        <FinancingProducts />

        {/* Section 4: Why Choose BAHO */}
        <WhyChooseUs />

        {/* Section 5: How Financing Works */}
        <HowItWorks />

        {/* Section 6: Branches Preview */}
        <BranchesPreview />

        {/* Section 7: About BAHO */}
        <AboutSection />

        {/* Section 8: Call To Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
