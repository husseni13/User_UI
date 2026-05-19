import { useState } from "react";
import { Link } from "wouter";
import { Star, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { products } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";
import type { Product } from "@/data/mockData";

const TABS = [
  { id: "flash",      label: "Flash Deals",   filter: (p: Product) => p.discount >= 15 },
  { id: "trending",   label: "Trending",      filter: (p: Product) => !!p.isTrending },
  { id: "bestseller", label: "Best Sellers",  filter: (p: Product) => !!p.isBestSeller },
  { id: "new",        label: "New Arrivals",  filter: (p: Product) => !!p.isNew },
];

function FeaturedCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const { items: wishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = wishlist.includes(product.id);

  return (
    <div className="flex-shrink-0 w-[160px] bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-md hover:border-primary/30 transition-all duration-200">
      {/* Image */}
      <div
        className="relative bg-muted h-[140px] cursor-pointer"
        onClick={() => (window.location.href = `/product/${product.id}`)}
      >
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-teal-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10">
            New
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
            toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-white/80 dark:bg-black/50 rounded-full flex items-center justify-center z-10 shadow"
        >
          <Heart className={`w-3 h-3 ${wishlisted ? "fill-red-500 text-red-500" : "text-foreground/50"}`} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => (window.location.href = `/product/${product.id}`)}
        />
      </div>

      {/* Info */}
      <div className="p-2.5">
        <p
          className="text-xs font-semibold text-foreground leading-tight line-clamp-2 mb-1 min-h-[28px] cursor-pointer hover:text-primary transition-colors"
          onClick={() => (window.location.href = `/product/${product.id}`)}
        >
          {product.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-2.5 h-2.5 ${
                star <= Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-border"
              }`}
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-0.5">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="text-sm font-black text-primary">${product.price.toLocaleString()}</div>
          {product.oldPrice > product.price && (
            <div className="text-[10px] text-muted-foreground line-through">${product.oldPrice.toLocaleString()}</div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={() => {
              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
              toast.success("Added to cart", { description: product.name });
            }}
            className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary/20 transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            Cart
          </button>
          <Link href={`/product/${product.id}`}>
            <button className="flex-1 py-1.5 px-2 rounded-lg bg-primary text-white text-[10px] font-bold hover:bg-primary/90 transition-colors whitespace-nowrap">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState("flash");

  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const filtered = products.filter(tab.filter).slice(0, 8);
  const displayed = filtered.length > 0 ? filtered : products.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      {/* Tabs row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Link href="/shop">
          <span className="flex-shrink-0 flex items-center gap-0.5 text-xs text-primary font-semibold ml-2 cursor-pointer hover:underline">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Product cards — horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {displayed.map((p) => (
          <FeaturedCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
