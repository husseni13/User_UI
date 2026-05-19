import { useState } from "react";
import { Link } from "wouter";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mockData";
import type { Product } from "@/data/mockData";

interface Tab {
  label: string;
  filter: (p: Product) => boolean;
}

interface ProductSectionProps {
  title: string;
  viewAllHref?: string;
  tabs?: Tab[];
  filter?: (p: Product) => boolean;
  limit?: number;
}

export default function ProductSection({
  title,
  viewAllHref = "/shop",
  tabs,
  filter,
  limit = 6,
}: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const currentFilter = tabs ? tabs[activeTab].filter : filter;
  const displayed = currentFilter
    ? products.filter(currentFilter).slice(0, limit)
    : products.slice(0, limit);

  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
            {tabs && (
              <div className="flex gap-1">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeTab === i
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link href={viewAllHref}>
            <span className="text-sm text-primary font-semibold hover:underline cursor-pointer flex items-center gap-1 whitespace-nowrap">
              View All
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {displayed.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
