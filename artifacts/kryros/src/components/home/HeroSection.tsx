import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { heroSlides } from "@/data/mockData";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0f2440 100%)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between min-h-[220px] md:min-h-[380px] px-4 md:px-12 py-6 md:py-10 relative"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #1FA89A 0%, transparent 70%)" }} />
          </div>

          {/* Left: Text content */}
          <div className="flex-1 relative z-10 max-w-[55%] md:max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center bg-primary/20 border border-primary/30 text-primary text-[9px] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
            >
              {slide.badge}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h1 className="text-[22px] md:text-5xl font-black text-white leading-tight">
                {slide.line1}
              </h1>
              <h1 className="text-[22px] md:text-5xl font-black text-white leading-tight">
                {slide.line2}
              </h1>
              <h1 className="text-[22px] md:text-5xl font-black leading-tight" style={{ color: "#1FA89A" }}>
                {slide.highlight}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-white/60 text-[10px] md:text-sm mt-2 mb-4 leading-snug max-w-[90%]"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/shop">
                <button className="px-4 md:px-6 py-2 md:py-2.5 text-white rounded-xl font-bold text-xs md:text-sm hover:opacity-90 transition-all active:scale-95" style={{ background: "#1FA89A" }}>
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Product image + badge */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            {/* UP TO X% OFF badge */}
            <div className="absolute -top-2 right-0 md:-top-4 md:-right-4 z-20 w-14 h-14 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center text-white shadow-lg" style={{ background: "#0d1f3c", border: "2px solid rgba(255,255,255,0.15)" }}>
              <span className="text-[7px] md:text-[10px] font-semibold text-white/70 leading-none">UP TO</span>
              <span className="text-sm md:text-xl font-black leading-none">{slide.discount}</span>
              <span className="text-[7px] md:text-[10px] font-semibold text-white/70 leading-none">OFF</span>
            </div>
            <motion.img
              key={slide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              src={slide.image}
              alt="Featured product"
              className="w-[130px] h-[130px] md:w-[320px] md:h-[320px] object-cover rounded-2xl md:rounded-3xl shadow-2xl"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
