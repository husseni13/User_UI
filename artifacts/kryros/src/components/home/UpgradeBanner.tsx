import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function UpgradeBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-10">
      <div
        className="relative rounded-2xl overflow-hidden flex items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #e6fafa 0%, #d0f5f5 40%, #b8f0f0 100%)",
          minHeight: 170,
        }}
      >
        {/* Left text */}
        <div className="relative z-10 pl-7 py-7 flex-shrink-0 max-w-[220px]">
          <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-2">
            Upgrade Your<br />Tech Game
          </h2>
          <p className="text-xs text-muted-foreground mb-4 leading-snug">
            Unbeatable performance.<br />Unmatched style.
          </p>
          <Link href="/shop">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/30">
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* Center — product collage */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-end justify-center gap-1 z-10 pointer-events-none select-none" style={{ height: "100%" }}>
          {/* MacBook */}
          <div className="relative" style={{ width: 160, height: 130 }}>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=85"
              alt="MacBook"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
          {/* iPhone upright */}
          <div className="relative mb-3" style={{ width: 50, height: 100 }}>
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&q=85"
              alt="iPhone"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          {/* Smartwatch */}
          <div className="relative mb-4" style={{ width: 50, height: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=85"
              alt="Watch"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Right — discount badge */}
        <div className="relative z-10 pr-7 py-7 flex-shrink-0 text-right">
          <p className="text-sm font-semibold text-foreground/70 mb-0.5">Up to</p>
          <p className="text-6xl md:text-7xl font-black text-primary leading-none">30%</p>
          <p className="text-3xl md:text-4xl font-black text-primary -mt-1">OFF</p>
        </div>

        {/* Subtle radial glow in center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 110%, rgba(0,180,180,0.12) 0%, transparent 70%)",
          }}
        />
      </div>
    </section>
  );
}
