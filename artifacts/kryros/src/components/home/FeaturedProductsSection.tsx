import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Star, Zap, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { products } from "@/data/mockData";
import type { Product } from "@/data/mockData";

const TABS = [
  { id: "flash",      label: "Flash Deals",  filter: (p: Product) => p.discount >= 15 },
  { id: "trending",   label: "Trending",     filter: (p: Product) => !!p.isTrending },
  { id: "bestseller", label: "Best Sellers", filter: (p: Product) => !!p.isBestSeller },
  { id: "new",        label: "New Arrivals", filter: (p: Product) => !!p.isNew },
];

function FeaturedCard({ product }: { product: Product }) {
  const [imgErr, setImgErr] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  const monthly = (product.price / 12).toFixed(2);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image });
    toast.success("Added to cart", { description: product.name });
  };

  const handleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist", { description: product.name });
  };

  return (
    <div
      className="flex-shrink-0 w-44 bg-card border border-border rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
      onClick={() => (window.location.href = `/product/${product.id}`)}
    >
      <div className="relative bg-[#f0f0f0] dark:bg-muted" style={{ height: 130 }}>
        {!imgErr ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
        )}
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg z-10">
            -{product.discount}%
          </span>
        )}
        <button
          onClick={handleHeart}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center z-10 shadow-sm"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      <div className="p-2.5">
        <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2 mb-0.5">
          {product.name}
        </h3>
        <p className="text-[10px] text-muted-foreground truncate mb-1.5">{product.specs}</p>

        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-[9px] text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm font-bold text-foreground">
            ${product.price.toLocaleString("en", { minimumFractionDigits: 2 })}
          </span>
          {product.oldPrice > product.price && (
            <span className="text-[10px] text-muted-foreground line-through">
              ${product.oldPrice.toLocaleString("en", { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        <p className="text-[10px] font-semibold text-teal-600 mb-2">
          Get Now from ${monthly}/mo
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCart}
            className="w-8 h-7 flex items-center justify-center border border-teal-600 rounded-lg flex-shrink-0 hover:bg-teal-50 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-teal-600" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); window.location.href = `/product/${product.id}`; }}
            className="flex-1 h-7 bg-teal-600 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-teal-700 transition-colors"
          >
            <Zap className="w-3 h-3" /> Buy Now
          </button>
        </div>
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
      {/* Tab row — all in one scrollable row so View All is never clipped */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-3 items-center">
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
        <Link href="/shop">
          <span className="flex-shrink-0 flex items-center gap-0.5 text-[11px] font-semibold ml-1 whitespace-nowrap pl-2 border-l border-border" style={{ color: "#0d9488" }}>
            View All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Horizontal scroll product row */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {displayed.map((p) => (
          <FeaturedCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
