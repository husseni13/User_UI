import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: "h1",
    badge: "NEW ARRIVAL",
    title: "MacBook Pro M3",
    highlight: "Power. Perfected.",
    subtitle: "The ultimate notebook for\npro performance anywhere.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=90",
    bg: "#d6f0ec",
    imgPosition: "object-center",
  },
  {
    id: "h2",
    badge: "HOT DEAL",
    title: "iPhone 15 Pro Max",
    highlight: "Titanium. Redefined.",
    subtitle: "The most powerful iPhone ever made.\nNow with Action Button.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&q=90",
    bg: "#eeedf8",
    imgPosition: "object-center",
  },
  {
    id: "h3",
    badge: "BEST SELLER",
    title: "Sony WH-1000XM5",
    highlight: "Silence Everything.",
    subtitle: "Industry-leading noise cancellation.\nUp to 30 hours battery.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=90",
    bg: "#f5f0ec",
    imgPosition: "object-center",
  },
  {
    id: "h4",
    badge: "LIMITED TIME",
    title: "Nike Air Max 270",
    highlight: "Move Without Limits.",
    subtitle: "Maximum cushioning meets iconic style.\nBuilt for everyday performance.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90",
    bg: "#ecf5ec",
    imgPosition: "object-center",
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
    <section
      className="relative overflow-hidden"
      style={{ background: slide.bg, transition: "background 0.5s ease" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-stretch"
          style={{ minHeight: "clamp(240px, 40vw, 440px)" }}
        >
          {/* Left — text content */}
          <div className="flex-shrink-0 w-[48%] md:w-[44%] flex items-center px-6 md:px-14 py-10 z-10">
            <div>
              {/* Badge */}
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-2 md:mb-3"
                style={{ color: "#1FA89A" }}
              >
                {slide.badge}
              </motion.p>

              {/* Title + Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.09 }}
              >
                <h1 className="text-[24px] md:text-[46px] font-black text-gray-900 leading-[1.05] dark:text-gray-900">
                  {slide.title}
                </h1>
                <h2
                  className="text-[24px] md:text-[46px] font-black leading-[1.05] mb-2 md:mb-5"
                  style={{ color: "#1FA89A" }}
                >
                  {slide.highlight}
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.16 }}
                className="text-[10px] md:text-[14px] text-gray-500 leading-snug mb-4 md:mb-8 whitespace-pre-line"
              >
                {slide.subtitle}
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href={slide.buttonHref}>
                  <button
                    className="inline-flex items-center gap-2 px-5 md:px-7 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm text-white hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: "#1FA89A" }}
                  >
                    {slide.buttonText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right — full promotional image, fills the entire right column */}
          <div className="flex-1 relative overflow-hidden">
            <motion.img
              key={slide.id}
              initial={{ opacity: 0, scale: 1.04, x: 16 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover ${slide.imgPosition}`}
            />
            {/* Soft gradient fade blending the image into the background on the left */}
            <div
              className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none"
              style={{ background: `linear-gradient(to right, ${slide.bg}, transparent)` }}
            />
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-2 bg-[#1FA89A]"
                : "w-2 h-2 bg-gray-400/40 hover:bg-gray-500/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
