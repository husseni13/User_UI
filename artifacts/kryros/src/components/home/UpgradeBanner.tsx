import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function UpgradeBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a2e2e 100%)",
          minHeight: 160,
        }}
      >
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 70% 100%, rgba(0,180,160,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Layout: left text | right side with image + discount */}
        <div className="relative z-10 flex items-stretch min-h-[160px]">
          {/* Left — text & button */}
          <div className="flex flex-col justify-center pl-6 pr-3 py-6 flex-shrink-0 w-[170px]">
            <h2 className="text-xl font-black text-white leading-tight mb-1.5">
              Upgrade Your<br />Tech Game
            </h2>
            <p className="text-[11px] text-white/50 mb-4 leading-snug">
              Unbeatable performance.<br />Unmatched style.
            </p>
            <Link href="/shop">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white rounded-xl text-xs font-bold hover:bg-teal-400 transition-all active:scale-95 w-fit">
                Shop Now <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* Right — product image + discount badge */}
          <div className="flex-1 relative flex items-center justify-end overflow-hidden">
            {/* Laptop image, anchored to right/bottom */}
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=85"
              alt="MacBook"
              className="absolute bottom-0 right-16 w-[160px] object-contain"
              style={{ filter: "drop-shadow(0 8px 24px rgba(0,200,180,0.2))" }}
            />
            {/* Discount badge — top-right */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-right">
              <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">Up to</p>
              <p className="text-5xl font-black text-teal-400 leading-none">30%</p>
              <p className="text-2xl font-black text-teal-400 -mt-1">OFF</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
