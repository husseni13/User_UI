import { useState } from "react";
import { Link } from "wouter";
import { Star, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { products } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";
import type { Product } from "@/data/mockData";

const TABS = [
  { id: "flash",      label: "Flash Deals",  filter: (p: Product) => p.discount >= 15 },
  { id: "trending",   label: "Trending",     filter: (p: Product) => !!p.isTrending },
  { id: "bestseller", label: "Best Sellers", filter: (p: Product) => !!p.isBestSeller },
  { id: "new",        label: "New Arrivals", filter: (p: Product) => !!p.isNew },
];

function FeaturedCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const { items: wishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = wishlist.includes(product.id);

  return (
    <div className="flex-shrink-0 w-[148px] bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all duration-200">

      {/* Image area */}
      <div
        className="relative bg-muted h-[148px] cursor-pointer"
        onClick={() => (window.location.href = `/product/${product.id}`)}
      >
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10 leading-none">
            -{product.discount}%
          </span>
        )}
        {product.isNew && !product.discount && (
          <span className="absolute top-2 left-2 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10 leading-none">
            New
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
          className="absolute top-2 right-2 w-6 h-6 bg-white/80 dark:bg-black/50 rounded-full flex items-center justify-center z-10 shadow"
        >
          <Heart className={`w-3 h-3 ${wishlisted ? "fill-red-500 text-red-500" : "text-foreground/40"}`} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <p
          className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2 cursor-pointer hover:text-primary transition-colors min-h-[28px]"
          onClick={() => (window.location.href = `/product/${product.id}`)}
        >
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={`w-2.5 h-2.5 ${s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-border text-border"}`} />
          ))}
          <span className="text-[9px] text-muted-foreground ml-0.5">{product.reviewCount.toLocaleString()}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-black text-primary">${product.price.toLocaleString()}</span>
          {product.oldPrice > product.price && (
            <span className="text-[9px] text-muted-foreground line-through">${product.oldPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart — full width teal */}
        <button
          onClick={() => { addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 }); toast.success("Added to cart"); }}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[10px] font-bold transition-colors"
          style={{ background: "#0d9488", color: "#fff" }}
        >
          <ShoppingCart className="w-3 h-3" />
          Add to Cart
        </button>

        {/* Buy Now — full width teal (slightly darker) */}
        <Link href={`/product/${product.id}`}>
          <button
            className="w-full py-1.5 rounded-xl text-[10px] font-bold transition-colors"
            style={{ background: "#0f766e", color: "#fff" }}
          >
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}

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

      {/* Horizontal scroll product row */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {displayed.map((p) => (
          <FeaturedCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
