import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { FinancingProducts } from "@/components/home/financing-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { TeamPreview } from "@/components/home/team-preview";
import { BranchesPreview } from "@/components/home/branches-preview";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-baho-bg">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Slider & Embedded Key Stats */}
        <HeroSlider />

        {/* Section 2: Financial Products */}
        <FinancingProducts />

        {/* Section 3: Why Choose BAHO & How Financing Works (Combined) */}
        <WhyChooseUs />

        {/* Section 4: Team Preview */}
        <TeamPreview />

        {/* Section 5: Branch Locations */}
        <BranchesPreview />

        {/* Section 6: Call To Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
