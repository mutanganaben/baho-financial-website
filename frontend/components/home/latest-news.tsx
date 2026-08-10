import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ArrowRight, Calendar } from "lucide-react";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTheme: {
    bg: string;
    text: string;
  };
  date: string;
  image: string;
  slug: string;
}

const ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "BAHO Financial Opens Third Branch in Huye",
    excerpt:
      "Expanding our reach to serve more communities across the Southern Province with accessible credit solutions.",
    category: "Company News",
    categoryTheme: { bg: "bg-blue-50", text: "text-blue-600" },
    date: "July 15, 2026",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    slug: "/news/branch-huye-opening",
  },
  {
    id: "news-2",
    title: "Introducing the BAHO AgriFinance Package",
    excerpt:
      "A new seasonal financing solution designed specifically for smallholder farmers and agribusiness cooperatives.",
    category: "Products",
    categoryTheme: { bg: "bg-amber-50", text: "text-amber-600" },
    date: "June 28, 2026",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
    slug: "/news/agrifinance-package-launch",
  },
  {
    id: "news-3",
    title: "BAHO Supports Women Entrepreneurs Across Rwanda",
    excerpt:
      "Our women-focused microfinance initiative reaches new milestones in promoting financial inclusion and business growth.",
    category: "Community",
    categoryTheme: { bg: "bg-emerald-50", text: "text-emerald-600" },
    date: "June 10, 2026",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    slug: "/news/women-entrepreneurs-initiative",
  },
];

export const LatestNews: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-slate-50 border-t border-b border-slate-200/80">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>LATEST NEWS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-baho-navy-dark tracking-tight leading-tight">
              Stay Informed
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-baho-navy hover:text-baho-gold font-bold text-base transition-colors group"
          >
            <span>All News</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                {/* Article Card Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Article Details Container */}
                <div className="p-6 pt-0 space-y-3">
                  {/* Category Badge & Date Row */}
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider ${article.categoryTheme.bg} ${article.categoryTheme.text}`}
                    >
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-bold text-baho-navy-dark tracking-tight leading-snug group-hover:text-baho-navy transition-colors">
                    <Link href={article.slug}>{article.title}</Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={article.slug}
                  className="inline-flex items-center space-x-1.5 text-sm font-bold text-baho-navy hover:text-baho-gold transition-colors"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
