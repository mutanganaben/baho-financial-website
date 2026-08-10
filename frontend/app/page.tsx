import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { StatsBar } from "@/components/home/stats-bar";
import { FinancingProducts } from "@/components/home/financing-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { BranchesPreview } from "@/components/home/branches-preview";
import { TeamPreview } from "@/components/home/team-preview";
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

        {/* Section 4: About BAHO */}
        <AboutSection />

        {/* Section 5: Why Choose BAHO */}
        <WhyChooseUs />

        {/* Section 6: How Financing Works */}
        <HowItWorks />

        {/* Section 7: Branches Preview */}
        <BranchesPreview />

        {/* Section 8: Team Preview */}
        <TeamPreview />

        {/* Section 9: Call To Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
