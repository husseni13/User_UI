import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Zap, Heart, ShoppingCart, Star } from "lucide-react";
import { products } from "@/data/mockData";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";
import type { Product } from "@/data/mockData";

function useCountdown(initialSeconds: number) {
  const [total, setTotal] = useState(initialSeconds);
  useEffect(() => {
    const t = setInterval(() => setTotal((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return { days, hours, mins, secs };
}

function TimeBox({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-black/30 rounded-lg md:rounded-xl flex items-center justify-center border border-white/10">
        <span className="text-base md:text-xl font-black text-white tabular-nums">{String(val).padStart(2, "0")}</span>
      </div>
      <span className="text-[8px] md:text-[10px] text-white/50 mt-1 capitalize">{label}</span>
    </div>
  );
}

function FlashCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const { items: wishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = wishlist.includes(product.id);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[148px] md:w-[175px] bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg hover:border-primary/30 transition-all duration-200"
      onClick={() => (window.location.href = `/product/${product.id}`)}
    >
      <div className="relative bg-muted aspect-square">
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10">
            -{product.discount}%
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
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-xs">No image</div>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2 mb-1.5 min-h-[30px]">{product.name}</p>
        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`}
            />
          ))}
          <span className="text-[9px] text-muted-foreground ml-0.5">({product.reviewCount})</span>
        </div>
        <div className="flex items-end justify-between gap-1">
          <div>
            <div className="text-sm font-black text-foreground">${product.price.toLocaleString()}</div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground line-through">${product.oldPrice.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
              toast.success("Added to cart", { description: product.name });
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity active:scale-90"
            style={{ background: "#1FA89A" }}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FlashSaleSection() {
  const countdown = useCountdown(2 * 86400 + 18 * 3600 + 45 * 60 + 30);
  const flashProducts = products.slice(0, 6);

  return (
    <section className="py-0">
      {/* Flash Sale Banner */}
      <div
        className="mx-0 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a6b60 0%, #0d8a7a 40%, #087a6c 100%)" }}
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 gap-3">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-base md:text-2xl font-black text-white">Flash Sale</span>
              <Zap className="w-4 h-4 md:w-5 md:h-5 fill-yellow-300 text-yellow-300" />
            </div>
            <p className="text-white/60 text-[10px] md:text-sm mb-2 md:mb-3">Limited Time Offer</p>
            <div className="flex items-center gap-1.5 md:gap-2">
              <TimeBox val={countdown.days} label="Days" />
              <span className="text-white/40 font-black text-base md:text-lg mb-4">:</span>
              <TimeBox val={countdown.hours} label="Hours" />
              <span className="text-white/40 font-black text-base md:text-lg mb-4">:</span>
              <TimeBox val={countdown.mins} label="Min" />
              <span className="text-white/40 font-black text-base md:text-lg mb-4">:</span>
              <TimeBox val={countdown.secs} label="Secs" />
            </div>
            <Link href="/shop">
              <button className="mt-3 px-5 py-2 bg-white text-primary rounded-xl font-bold text-sm hover:bg-white/90 transition-all active:scale-95">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Right: watch image + badge */}
          <div className="relative flex-shrink-0 flex items-center gap-2">
            <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 border-white/20 text-white">
              <span className="text-[8px] font-bold text-white/70 leading-none">UP TO</span>
              <span className="text-xl font-black leading-none">50%</span>
              <span className="text-[8px] font-bold text-white/70 leading-none">OFF</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&q=80"
              alt="Flash sale product"
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl md:rounded-2xl shadow-xl"
            />
            <div className="md:hidden flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 border-white/20 text-white ml-1">
              <span className="text-[7px] font-bold text-white/70 leading-none">UP TO</span>
              <span className="text-sm font-black leading-none">50%</span>
              <span className="text-[7px] font-bold text-white/70 leading-none">OFF</span>
            </div>
          </div>
        </div>

      </div>

      {/* Flash Deals horizontal scroll */}
      <div className="px-3 md:px-6 max-w-7xl mx-auto mt-4 md:mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base md:text-xl font-black text-foreground">Flash Deals</h2>
            <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <Link href="/shop">
            <span className="text-xs md:text-sm text-primary font-semibold cursor-pointer hover:underline">
              View All +
            </span>
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {flashProducts.map((p) => (
            <FlashCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
