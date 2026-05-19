import { useState } from "react";
import { Link } from "wouter";
import {
  Heart, ShoppingCart, Star, ChevronRight, Zap, Headphones,
} from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { products } from "@/data/mockData";
import type { Product } from "@/data/mockData";

const CATEGORIES = [
  {
    id: "All", label: "Discounted", count: 12,
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&q=80",
  },
  {
    id: "Audio", label: "Sound Devices", count: 87,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
  },
  {
    id: "Cameras", label: "Cameras", count: 64,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
  },
  {
    id: "Smartphones", label: "Mobile", count: 245,
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
  },
  {
    id: "Laptops", label: "Laptops", count: 128,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
  },
  {
    id: "Smart Watches", label: "Wearables", count: 71,
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80",
  },
  {
    id: "Fashion", label: "Fashion", count: 312,
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",
  },
];

const SHOP_BRANDS = [
  { id: "Apple", label: "Apple" },
  { id: "Samsung", label: "Samsung" },
  { id: "Google", label: "Google" },
  { id: "Xiaomi", label: "Xiaomi" },
  { id: "Sony", label: "Sony" },
];

const HERO_DATA: Record<string, { pre: string; brand: string; sub: string; bg: string; brandColor: string; imgs: string[] }> = {
  Apple: {
    pre: "The best of",
    brand: "Apple.",
    sub: "Original products.\nBest prices on KRYROS.",
    bg: "#f2f2f7",
    brandColor: "#0D9488",
    imgs: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=180&q=80",
      "https://images.unsplash.com/photo-1606741965234-b2b9b2b1c0b5?w=120&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=120&q=80",
    ],
  },
  Samsung: {
    pre: "Innovate with",
    brand: "Samsung.",
    sub: "Galaxy experience.\nBold tech, smarter life.",
    bg: "#eef2ff",
    brandColor: "#1428A0",
    imgs: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=160&q=80",
    ],
  },
  Google: {
    pre: "Experience",
    brand: "Google.",
    sub: "Pixel phones & more.\nPure Android, pure power.",
    bg: "#fff8e7",
    brandColor: "#EA4335",
    imgs: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
    ],
  },
  Xiaomi: {
    pre: "More with",
    brand: "Xiaomi.",
    sub: "Performance & value.\nAlways innovation.",
    bg: "#fff0ee",
    brandColor: "#FF6900",
    imgs: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&q=80",
    ],
  },
  Sony: {
    pre: "Premium by",
    brand: "Sony.",
    sub: "World-class audio.\nFeel every detail.",
    bg: "#f0f0f0",
    brandColor: "#1a1a1a",
    imgs: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
    ],
  },
};

function ShopCard({ product }: { product: Product }) {
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

function BrandSection({ title, brandFilter, categoryFilter }: { title: string; brandFilter?: string; categoryFilter?: string }) {
  const filtered = products.filter((p) => {
    if (brandFilter && p.brand !== brandFilter) return false;
    if (categoryFilter && p.category !== categoryFilter) return false;
    return true;
  });

  if (filtered.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3 px-4">
        <h2 className="text-base font-black text-foreground">{title}</h2>
        <Link href="/shop">
          <span className="text-xs font-semibold text-teal-600 flex items-center gap-0.5 cursor-pointer">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {filtered.map((p) => (
          <ShopCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [heroDot, setHeroDot] = useState(0);

  const hero = HERO_DATA[selectedBrand] || HERO_DATA["Apple"];

  return (
    <div className="pb-24 md:pb-10">
      {/* Centered heading */}
      <div className="text-center pt-4 pb-3 px-4">
        <h2 className="text-base font-black text-foreground tracking-tight">Shop All Products</h2>
        <p className="text-[11px] text-muted-foreground mt-0.5">Browse our full collection by category</p>
      </div>

      {/* Category cards */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-4">
        {CATEGORIES.map(({ id, label, count, img }) => {
          const active = selectedCat === id;
          return (
            <button
              key={id}
              onClick={() => setSelectedCat(id)}
              className={`flex-shrink-0 relative w-36 h-36 rounded-2xl overflow-hidden transition-all ${
                active ? "ring-2 ring-teal-500 ring-offset-2" : ""
              }`}
            >
              <img src={img} alt={label} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,20,30,0.92) 0%, rgba(10,20,30,0.55) 55%, rgba(10,20,30,0.15) 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-white font-black text-xs uppercase tracking-wide leading-tight mb-1">{label}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-0.5 bg-teal-400 rounded-full" />
                  <span className="text-white/70 text-[10px] font-medium">{count} ITEMS</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-4 mb-4 border-t border-border" />

      {/* Hero Banner */}
      <div className="mx-4 mb-5 rounded-2xl overflow-hidden" style={{ background: hero.bg }}>
        <div className="flex items-center min-h-[140px] relative overflow-hidden">
          <div className="flex-1 p-4 z-10">
            <p className="text-xs text-gray-600 font-medium">{hero.pre}</p>
            <h2 className="text-2xl font-black leading-tight mb-1" style={{ color: hero.brandColor }}>
              {hero.brand}
            </h2>
            <p className="text-[11px] text-gray-600 mb-3 leading-relaxed whitespace-pre-line">{hero.sub}</p>
            <Link href={`/shop`}>
              <button className="flex items-center gap-1.5 bg-foreground text-background text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Shop {selectedBrand} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
          <div className="relative flex-shrink-0 w-44 h-36">
            {hero.imgs.length >= 2 ? (
              <>
                <img
                  src={hero.imgs[0]}
                  alt={selectedBrand}
                  className="absolute right-0 top-1 w-28 h-32 object-cover rounded-xl shadow-md"
                />
                <img
                  src={hero.imgs[1]}
                  alt={selectedBrand}
                  className="absolute left-0 bottom-0 w-20 h-20 object-cover rounded-xl shadow-sm border-2 border-white"
                />
                {hero.imgs[2] && (
                  <img
                    src={hero.imgs[2]}
                    alt=""
                    className="absolute left-10 top-0 w-14 h-14 object-cover rounded-xl shadow-sm border-2 border-white"
                  />
                )}
                {hero.imgs[3] && (
                  <img
                    src={hero.imgs[3]}
                    alt=""
                    className="absolute right-1 bottom-1 w-12 h-12 object-cover rounded-xl shadow-sm border-2 border-white"
                  />
                )}
              </>
            ) : (
              <img
                src={hero.imgs[0]}
                alt={selectedBrand}
                className="absolute right-2 top-2 w-36 h-32 object-cover rounded-xl shadow-md"
              />
            )}
          </div>
        </div>
        <div className="flex justify-center gap-1.5 pb-3">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setHeroDot(i)}
              className={`rounded-full transition-all ${
                heroDot === i ? "w-4 h-1.5 bg-teal-600" : "w-1.5 h-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-4 border-t border-border" />

      {/* Shop by Brand */}
      <div className="px-4 mb-5">
        <p className="text-sm font-bold text-foreground mb-2.5">Shop by Brand</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {SHOP_BRANDS.map(({ id, label }) => {
            const active = selectedBrand === id;
            return (
              <button
                key={id}
                onClick={() => { setSelectedBrand(id); setHeroDot(0); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-all ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border text-foreground hover:border-teal-600/50"
                }`}
              >
                {id === "Apple" && <span className="text-sm leading-none"></span>}
                {id === "Samsung" && <span className="text-[9px] font-black tracking-widest">SAMSUNG</span>}
                {id === "Google" && (
                  <span className="font-black text-xs">
                    <span className="text-blue-500">G</span><span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span><span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span><span className="text-red-500">e</span>
                  </span>
                )}
                {id === "Xiaomi" && (
                  <span className="text-[9px] font-black text-orange-500 border border-orange-500 rounded px-0.5">mi</span>
                )}
                {id === "Sony" && <span className="text-[10px] font-black tracking-widest">SONY</span>}
                {(id === "Apple" || id === "Samsung" || id === "Sony") && label}
                {(id === "Google" || id === "Xiaomi") && <span className="ml-0.5">{label}</span>}
              </button>
            );
          })}
          <button className="flex-shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-full border border-border bg-card text-xs font-semibold text-foreground">
            More <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-4 border-t border-border" />

      {/* Apple Section */}
      <BrandSection title="Apple" brandFilter="Apple" />

      {/* Samsung Section */}
      <BrandSection title="Samsung" brandFilter="Samsung" />

      {/* Members Banner */}
      <div className="mx-4 mb-5 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)" }}>
        <div className="flex items-center p-4 gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-0.5">KRYROS Members</p>
            <h3 className="text-xl font-black text-white leading-tight">Extra 5% Off</h3>
            <p className="text-[11px] text-white/80 mb-3">On selected products</p>
            <Link href="/register">
              <button className="flex items-center gap-1.5 bg-white text-teal-700 text-xs font-bold px-4 py-2 rounded-full hover:bg-white/90 transition-opacity">
                Join Now <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-1 text-right">
            <div className="bg-white/15 rounded-xl p-2 mb-1">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <p className="text-[9px] font-bold text-white/80 text-center">Members Only</p>
            <p className="text-[9px] text-white/60 text-center">Exclusive Deals</p>
            <p className="text-[10px] font-black text-white">KRY<span className="text-teal-200">ROS</span></p>
          </div>
        </div>
      </div>

      {/* Audio Section */}
      <BrandSection title="Audio" categoryFilter="Audio" />

      {/* Sony Section */}
      <BrandSection title="Sony" brandFilter="Sony" />
    </div>
  );
}
