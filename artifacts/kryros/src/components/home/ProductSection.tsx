import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/mockData";
import type { Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

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
  scroll?: boolean;
}

export default function ProductSection({
  title,
  viewAllHref = "/shop",
  tabs,
  filter,
  limit = 8,
  scroll = true,
}: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const currentFilter = tabs ? tabs[activeTab].filter : filter;
  const displayed = currentFilter
    ? products.filter(currentFilter).slice(0, limit)
    : products.slice(0, limit);

  return (
    <section className="py-4 md:py-6">
      <div className="px-3 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base md:text-xl font-black text-foreground">{title}</h2>
            {tabs && (
              <div className="flex gap-1">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-semibold transition-all ${
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
            <span className="text-xs md:text-sm text-primary font-semibold cursor-pointer hover:underline flex items-center gap-0.5 whitespace-nowrap">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Cards */}
        {scroll ? (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {displayed.map((p, i) => (
              <div key={p.id} className="flex-shrink-0 w-[200px] md:w-[230px]">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {displayed.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
