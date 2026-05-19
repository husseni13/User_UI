import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: "h1",
    badge: "NEW ARRIVAL",
    title: "MacBook Pro M3",
    highlight: "Power. Perfected.",
    subtitle: "The ultimate notebook for pro performance anywhere.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=90",
    bg: "#f0f4f7",
  },
  {
    id: "h2",
    badge: "HOT DEAL",
    title: "iPhone 15 Pro Max",
    highlight: "Titanium. Redefined.",
    subtitle: "The most powerful iPhone ever made. Now with Action Button.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&q=90",
    bg: "#f4f0f7",
  },
  {
    id: "h3",
    badge: "BEST SELLER",
    title: "Sony WH-1000XM5",
    highlight: "Silence Everything.",
    subtitle: "Industry-leading noise cancellation with up to 30 hours battery.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=900&q=90",
    bg: "#f7f4f0",
  },
  {
    id: "h4",
    badge: "LIMITED TIME",
    title: "Nike Air Max 270",
    highlight: "Move Without Limits.",
    subtitle: "Maximum cushioning meets iconic style. Built for everyday performance.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=90",
    bg: "#f0f7f4",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="relative flex items-center"
          style={{
            background: slide.bg,
            minHeight: "clamp(180px, 38vw, 420px)",
          }}
        >
          {/* Subtle right-side glow behind image */}
          <div
            className="absolute right-0 top-0 h-full w-1/2 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 80% 50%, ${slide.bg}00 0%, ${slide.bg} 75%)`,
            }}
          />

          <div className="w-full max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between gap-6 py-8 md:py-12">

            {/* Left — text content */}
            <div className="flex-1 min-w-0 max-w-[52%] md:max-w-md z-10">

              {/* Badge */}
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3"
                style={{ color: "#1FA89A" }}
              >
                {slide.badge}
              </motion.p>

              {/* Title + Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-[20px] md:text-[44px] font-black text-gray-900 dark:text-foreground leading-tight">
                  {slide.title}
                </h1>
                <h2
                  className="text-[20px] md:text-[44px] font-black leading-tight mb-2 md:mb-3"
                  style={{ color: "#1FA89A" }}
                >
                  {slide.highlight}
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="text-[11px] md:text-sm text-gray-500 dark:text-muted-foreground leading-snug mb-4 md:mb-6 max-w-[95%]"
              >
                {slide.subtitle}
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <Link href={slide.buttonHref}>
                  <button
                    className="inline-flex items-center gap-1.5 px-5 md:px-7 py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm text-white hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: "#1FA89A" }}
                  >
                    {slide.buttonText}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right — product image */}
            <div className="flex-shrink-0 flex items-center justify-center relative">
              <motion.img
                key={slide.id}
                initial={{ opacity: 0, x: 24, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                src={slide.image}
                alt={slide.title}
                className="object-contain"
                style={{
                  width: "clamp(150px, 36vw, 420px)",
                  height: "clamp(150px, 36vw, 420px)",
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))",
                }}
              />
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-2 bg-primary"
                : "w-2 h-2 bg-gray-400/40 hover:bg-gray-400/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
