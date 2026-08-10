"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fetchApi, ApiProduct } from "@/lib/api";
import {
  Briefcase,
  UserCheck,
  Sprout,
  Zap,
  Check,
  ArrowRight,
  LucideIcon,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const PRODUCT_THEMES: Record<
  string,
  {
    badge: string;
    icon: LucideIcon;
    theme: {
      iconBg: string;
      iconColor: string;
      checkColor: string;
      buttonBg: string;
    };
  }
> = {
  "cash-advance": {
    badge: "Fast 24h Approval",
    icon: Zap,
    theme: {
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      checkColor: "text-amber-600 bg-amber-50",
      buttonBg: "bg-amber-600 hover:bg-amber-700 text-white",
    },
  },
  "personal-loan": {
    badge: "Flexible Terms",
    icon: UserCheck,
    theme: {
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      checkColor: "text-blue-600 bg-blue-50",
      buttonBg: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  },
  "startup-business-loan": {
    badge: "Entrepreneur Support",
    icon: Sprout,
    theme: {
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      checkColor: "text-emerald-600 bg-emerald-50",
      buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
  },
  "business-growth-loan": {
    badge: "Scale Your Business",
    icon: Briefcase,
    theme: {
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      checkColor: "text-indigo-600 bg-indigo-50",
      buttonBg: "bg-indigo-600 hover:bg-indigo-700 text-white",
    },
  },
};

export const FinancingProducts: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchApi<ApiProduct[]>("/products");
      setProducts(data || []);
    } catch (err: any) {
      console.error("Failed to load home products:", err);
      setErrorMessage("Failed to load products from server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-t border-b border-slate-200/70">
      <Container>
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-3 mb-8">
          <div className="text-baho-navy font-bold text-xs sm:text-sm tracking-widest uppercase">
            LOAN PRODUCTS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
            Our loan products
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We make the whole lending process super easy and fast.
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 animate-pulse space-y-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100" />
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-16 bg-slate-100 rounded w-full" />
                <div className="h-10 bg-slate-100 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : errorMessage ? (
          <div className="text-center p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={loadProducts}
              className="px-4 py-1.5 text-xs font-bold bg-white border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors text-rose-700 inline-flex items-center space-x-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Loading</span>
            </button>
          </div>
        ) : (
          /* 4 Products Responsive Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const meta = PRODUCT_THEMES[product.slug] || {
                badge: "Fast Approval",
                icon: Zap,
                theme: {
                  iconBg: "bg-blue-50",
                  iconColor: "text-blue-600",
                  checkColor: "text-blue-600 bg-blue-50",
                  buttonBg: "bg-blue-600 hover:bg-blue-700 text-white",
                },
              };

              const IconComponent = meta.icon;

              const features = [
                `Repayment up to ${product.maxTenureMonths} month${product.maxTenureMonths > 1 ? "s" : ""}`,
                `Competitive ${product.interestRate}% rate`,
                `RWF ${product.minAmount.toLocaleString()} – ${product.maxAmount.toLocaleString()}`,
              ];

              return (
                <Link
                  key={product.id}
                  href={`/financing#${product.slug}`}
                  className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group block"
                >
                  <div className="space-y-5">
                    {/* Category Icon Badge & Processing Time Tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-14 h-14 rounded-2xl ${meta.theme.iconBg} ${meta.theme.iconColor} flex items-center justify-center p-3 transition-transform group-hover:scale-110`}
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                        {meta.badge}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="text-2xl font-bold text-baho-navy-dark tracking-tight group-hover:text-baho-navy transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed min-h-[72px]">
                      {product.description}
                    </p>

                    {/* Key Details Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      {features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center space-x-2.5 text-xs font-semibold text-slate-700"
                        >
                          <div
                            className={`p-1 rounded-full ${meta.theme.checkColor} flex-shrink-0`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={
                              feature.startsWith("RWF")
                                ? "font-bold text-baho-navy-dark"
                                : ""
                            }
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* View All Loans Action Button */}
        <div className="pt-10 text-left">
          <Link href="/financing">
            <Button className="bg-baho-navy hover:bg-[#16355E] text-white font-bold py-3.5 px-7 rounded-xl shadow-sm text-base">
              View all Loans
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
