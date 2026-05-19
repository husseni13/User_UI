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
    subtitle: "The ultimate notebook for pro performance anywhere.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=90",
    overlayFrom: "rgba(15,30,25,0.82)",
    overlayTo: "rgba(15,30,25,0.10)",
  },
  {
    id: "h2",
    badge: "HOT DEAL",
    title: "iPhone 15 Pro Max",
    highlight: "Titanium. Redefined.",
    subtitle: "The most powerful iPhone ever made. Now with Action Button.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1600&q=90",
    overlayFrom: "rgba(15,10,35,0.82)",
    overlayTo: "rgba(15,10,35,0.08)",
  },
  {
    id: "h3",
    badge: "BEST SELLER",
    title: "Sony WH-1000XM5",
    highlight: "Silence Everything.",
    subtitle: "Industry-leading noise cancellation. Up to 30 hours battery.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1600&q=90",
    overlayFrom: "rgba(30,15,10,0.82)",
    overlayTo: "rgba(30,15,10,0.08)",
  },
  {
    id: "h4",
    badge: "LIMITED TIME",
    title: "Nike Air Max 270",
    highlight: "Move Without Limits.",
    subtitle: "Maximum cushioning meets iconic style. Built for everyday performance.",
    buttonText: "Shop Now",
    buttonHref: "/shop",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=90",
    overlayFrom: "rgba(10,25,15,0.82)",
    overlayTo: "rgba(10,25,15,0.08)",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(280px, 46vw, 500px)" }}
    >
      {/* Full-bleed background image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={slide.id + "-img"}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Gradient overlay — dark on the left fading to transparent on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${slide.overlayFrom} 0%, ${slide.overlayTo} 65%, transparent 100%)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* Text content — overlaid on left */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center"
        >
          <div className="px-6 md:px-14 max-w-[58%] md:max-w-[50%]">
            {/* Badge */}
            <p
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-3"
              style={{ color: "#1FA89A" }}
            >
              {slide.badge}
            </p>

            {/* Title */}
            <h1 className="text-[22px] md:text-[46px] font-black text-white leading-[1.05] drop-shadow-md">
              {slide.title}
            </h1>

            {/* Highlight */}
            <h2
              className="text-[22px] md:text-[46px] font-black leading-[1.05] mb-2 md:mb-4 drop-shadow-md"
              style={{ color: "#1FA89A" }}
            >
              {slide.highlight}
            </h2>

            {/* Subtitle */}
            <p className="text-[10px] md:text-sm text-white/80 leading-snug mb-4 md:mb-7">
              {slide.subtitle}
            </p>

            {/* Button */}
            <Link href={slide.buttonHref}>
              <button
                className="inline-flex items-center gap-2 px-5 md:px-7 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm text-white hover:opacity-90 active:scale-95 transition-all shadow-lg"
                style={{ background: "#1FA89A" }}
              >
                {slide.buttonText}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-2 bg-[#1FA89A]"
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
