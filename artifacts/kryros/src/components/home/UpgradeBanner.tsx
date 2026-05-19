import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function UpgradeBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      <div
        className="relative rounded-2xl overflow-hidden flex items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a2e2e 100%)",
          minHeight: 160,
        }}
      >
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 70% at 50% 100%, rgba(0,180,160,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Left text */}
        <div className="relative z-10 pl-6 py-6 flex-shrink-0 max-w-[185px]">
          <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-1.5">
            Upgrade Your<br />Tech Game
          </h2>
          <p className="text-[11px] text-white/50 mb-4 leading-snug">
            Unbeatable performance.<br />Unmatched style.
          </p>
          <Link href="/shop">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white rounded-xl text-xs font-bold hover:bg-teal-400 transition-all active:scale-95">
              Shop Now <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>

        {/* Center — product collage */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-end justify-center gap-1 z-10 pointer-events-none select-none"
          style={{ height: "100%" }}
        >
          <div style={{ width: 140, height: 120 }}>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=85"
              alt="MacBook"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 8px 24px rgba(0,200,180,0.25))" }}
            />
          </div>
          <div className="mb-3" style={{ width: 44, height: 90 }}>
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&q=85"
              alt="iPhone"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right — discount badge */}
        <div className="relative z-10 pr-6 py-6 flex-shrink-0 text-right">
          <p className="text-xs font-semibold text-white/50 mb-0.5 uppercase tracking-wider">Up to</p>
          <p className="text-5xl md:text-6xl font-black text-teal-400 leading-none">30%</p>
          <p className="text-2xl md:text-3xl font-black text-teal-400 -mt-1">OFF</p>
        </div>
      </div>
    </section>
  );
}
