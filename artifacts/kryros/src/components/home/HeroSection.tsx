import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/mockData";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden rounded-2xl mx-3 md:mx-0 my-3 md:my-0">
      <div
        className="relative min-h-[280px] md:min-h-[400px] flex items-center"
        style={{
          background: "linear-gradient(135deg, #050816 0%, #0D1523 50%, #101826 100%)",
        }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between w-full px-6 md:px-12 py-8 md:py-12 relative z-10"
          >
            {/* Left content */}
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-3"
              >
                {slide.badge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-1"
              >
                {slide.title}
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-tight mb-4"
              >
                {slide.highlight}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-white/60 text-sm md:text-base mb-6 max-w-xs"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <Link href="/shop">
                  <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95">
                    Shop Now
                  </button>
                </Link>
                <Link href="/shop">
                  <button className="px-6 py-2.5 border border-white/20 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-all active:scale-95">
                    Explore Deals
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: Product image */}
            <div className="hidden md:block relative flex-shrink-0">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={slide.image}
                  alt="Featured product"
                  className="w-56 md:w-72 h-56 md:h-72 object-cover rounded-2xl shadow-2xl shadow-black/50"
                />
              </motion.div>

              {/* Discount badge */}
              <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/40">
                <span className="text-[10px] font-semibold">UP TO</span>
                <span className="text-xl font-black leading-none">40%</span>
                <span className="text-[10px] font-semibold">OFF</span>
              </div>
            </div>

            {/* Mobile discount badge */}
            <div className="md:hidden absolute top-4 right-4 w-16 h-16 rounded-full bg-primary flex flex-col items-center justify-center text-white shadow-lg">
              <span className="text-[8px] font-semibold">UP TO</span>
              <span className="text-lg font-black leading-none">40%</span>
              <span className="text-[8px] font-semibold">OFF</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-20"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % heroSlides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-20"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
