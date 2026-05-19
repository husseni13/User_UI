import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function UpgradeBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 170 }}>

        {/* Background image — fills the whole banner */}
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(5,15,30,0.92) 0%, rgba(5,20,40,0.80) 45%, rgba(5,40,40,0.60) 100%)",
          }}
        />

        {/* Content row */}
        <div className="relative z-10 flex items-center justify-between min-h-[170px] px-6 py-6 gap-4">

          {/* Left — heading, description, button */}
          <div className="flex flex-col justify-center max-w-[200px]">
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-1.5">
              Upgrade Your<br />Tech Game
            </h2>
            <p className="text-[11px] text-white/60 mb-4 leading-relaxed">
              Unbeatable performance.<br />Unmatched style.
            </p>
            <Link href="/shop">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white rounded-xl text-xs font-bold hover:bg-teal-400 transition-all active:scale-95 w-fit">
                Shop Now <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* Right — discount badge */}
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-0.5">Up to</p>
            <p className="text-5xl md:text-6xl font-black text-teal-400 leading-none">30%</p>
            <p className="text-2xl md:text-3xl font-black text-teal-400 -mt-1">OFF</p>
          </div>

        </div>
      </div>
    </section>
  );
}
