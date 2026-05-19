import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { products } from "@/data/mockData";
import type { Product } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

const TABS = [
  { id: "flash",      label: "Flash Deals",  filter: (p: Product) => p.discount >= 15 },
  { id: "trending",   label: "Trending",     filter: (p: Product) => !!p.isTrending },
  { id: "bestseller", label: "Best Sellers", filter: (p: Product) => !!p.isBestSeller },
  { id: "new",        label: "New Arrivals", filter: (p: Product) => !!p.isNew },
];

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState("flash");

  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const filtered = products.filter(tab.filter);
  const displayed = filtered.length > 0 ? filtered.slice(0, 8) : products.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-5">
      {/* Tab row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                activeTab === t.id
                  ? "text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
              style={activeTab === t.id ? { background: "#0d9488" } : {}}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Link href="/shop">
          <span className="flex-shrink-0 flex items-center gap-0.5 text-[11px] font-semibold ml-2 whitespace-nowrap" style={{ color: "#0d9488" }}>
            View All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Horizontal scroll product row — each card fixed width matching the shop card */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {displayed.map((p, i) => (
          <div key={p.id} className="flex-shrink-0 w-[200px] md:w-[230px]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
