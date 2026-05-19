import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid2x2, List, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";

const sortOptions = ["Popular", "Newest", "Price: Low to High", "Price: High to Low", "Rating"];

export default function ShopPage() {
  const [searchQ, setSearchQ] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let res = [...products];
    if (searchQ) res = res.filter((p) => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.brand.toLowerCase().includes(searchQ.toLowerCase()));
    if (selectedCat !== "All") res = res.filter((p) => p.category === selectedCat);
    if (selectedBrand !== "All") res = res.filter((p) => p.brand === selectedBrand);
    if (sortBy === "Price: Low to High") res.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") res.sort((a, b) => b.price - a.price);
    if (sortBy === "Rating") res.sort((a, b) => b.rating - a.rating);
    return res;
  }, [searchQ, selectedCat, selectedBrand, sortBy]);

  const catPills = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-10">
      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-6">Shop</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search for products, brands and more..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
          data-testid="shop-search-input"
        />
        <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer" />
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-4">
        {catPills.slice(0, 8).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              selectedCat === cat
                ? "bg-primary border-primary text-white"
                : "bg-card border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
        <button className="flex-shrink-0 px-3 py-2 rounded-xl border border-border bg-card text-xs font-medium text-muted-foreground">
          More
        </button>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {[
          { label: "Sort By", value: sortBy, options: sortOptions, setter: setSortBy },
          { label: "Category", value: selectedCat, options: ["All", ...categories.map((c) => c.name)], setter: setSelectedCat },
          { label: "Brand", value: selectedBrand, options: ["All", "Apple", "Samsung", "Sony", "Nike", "Adidas", "Dell", "DJI"], setter: setSelectedBrand },
        ].map(({ label, value, options, setter }) => (
          <div key={label} className="relative">
            <select
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-card border border-border rounded-xl text-xs font-medium text-foreground outline-none cursor-pointer focus:ring-2 focus:ring-primary/30"
            >
              {options.map((o) => <option key={o} value={o}>{label === "Sort By" ? o : (o === "All" ? `${label}: All` : o)}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          </div>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-3 py-2 border border-border rounded-xl text-xs font-medium text-foreground hover:bg-muted transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter
        </button>
      </div>

      {/* Results count & view toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{filtered.length}</span> products</p>
        <div className="flex gap-1">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
            <Grid2x2 className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg font-medium">No products found</p>
          <button onClick={() => { setSearchQ(""); setSelectedCat("All"); setSelectedBrand("All"); }} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl text-sm font-semibold">
            Clear Filters
          </button>
        </div>
      )}

      {/* Mega deals banner */}
      {filtered.length > 0 && (
        <div className="mt-8 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #050816 0%, #0D1523 100%)" }}>
          <div className="flex items-center justify-between p-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">Mega Deals</h3>
                <span className="text-orange-400">🔥</span>
              </div>
              <p className="text-white/60 text-sm mb-3">Grab the best deals on top products</p>
              <button className="px-5 py-2 bg-white text-foreground rounded-xl text-sm font-semibold hover:bg-white/90 transition-all">Shop Now</button>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-primary/40 flex flex-col items-center justify-center">
              <span className="text-[9px] text-white/60">UP TO</span>
              <span className="text-xl font-black text-primary">50%</span>
              <span className="text-[9px] text-white/60">OFF</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
