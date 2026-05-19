import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const ROW1 = [
  {
    id: "pc1",
    name: "Smartphones",
    sub: "Smart Money, Smart Phones",
    href: "/shop?cat=Smartphones",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
    bg: "#f0fafb",
    textColor: "#0f172a",
  },
  {
    id: "pc2",
    name: "Laptops",
    sub: "Powerfully Designed. Perfectly Built.",
    href: "/shop?cat=Laptops",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
    bg: "#eff6ff",
    textColor: "#0f172a",
  },
  {
    id: "pc3",
    name: "Fashion",
    sub: "New Styles, New You",
    href: "/shop?cat=Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",
    bg: "#fdf4ff",
    textColor: "#0f172a",
  },
];

const ROW2 = [
  {
    id: "pc4",
    name: "Shoes",
    sub: "Step Into Something New",
    href: "/shop?cat=Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    bg: "#fff7ed",
    textColor: "#0f172a",
  },
  {
    id: "pc5",
    name: "Audio",
    sub: "Feel Every Beat",
    href: "/shop?cat=Audio",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
    bg: "#f0fdf4",
    textColor: "#0f172a",
  },
  {
    id: "pc6",
    name: "Accessories",
    sub: "The Perfect Finishing Touch",
    href: "/shop?cat=Accessories",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    bg: "#fefce8",
    textColor: "#0f172a",
  },
  {
    id: "pc7",
    name: "Cameras",
    sub: "Capture Every Moment",
    href: "/shop?cat=Cameras",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    bg: "#faf5ff",
    textColor: "#0f172a",
  },
];

function PromoCard({
  cat,
  short = false,
}: {
  cat: (typeof ROW1)[0];
  short?: boolean;
}) {
  return (
    <Link href={cat.href}>
      <div
        className="relative flex items-center rounded-2xl overflow-hidden cursor-pointer group border border-border/50 hover:shadow-md transition-all duration-200"
        style={{
          background: cat.bg,
          height: short ? 90 : 130,
        }}
      >
        {/* Text — left side */}
        <div className="flex flex-col justify-center pl-4 pr-2 flex-1 min-w-0 z-10" style={{ maxWidth: short ? "55%" : "58%" }}>
          <h3
            className={`font-black leading-tight mb-0.5 ${short ? "text-xs" : "text-sm"}`}
            style={{ color: cat.textColor }}
          >
            {cat.name}
          </h3>
          <p className={`text-muted-foreground leading-tight mb-2 ${short ? "text-[9px] line-clamp-1" : "text-[10px] line-clamp-2"}`}>
            {cat.sub}
          </p>
          <div
            className="flex items-center gap-1 font-bold group-hover:gap-1.5 transition-all"
            style={{ color: "#0d9488", fontSize: short ? 9 : 10 }}
          >
            Explore Now <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Product image — right side */}
        <div
          className="absolute right-0 top-0 bottom-0 overflow-hidden"
          style={{ width: short ? "45%" : "45%" }}
        >
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,1) 70%)",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function CategoryPromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      {/* Row 1 — 3 larger cards */}
      <div className="grid grid-cols-3 gap-2.5 mb-2.5">
        {ROW1.map((cat) => (
          <PromoCard key={cat.id} cat={cat} short={false} />
        ))}
      </div>

      {/* Row 2 — 4 smaller cards */}
      <div className="grid grid-cols-4 gap-2.5">
        {ROW2.map((cat) => (
          <PromoCard key={cat.id} cat={cat} short={true} />
        ))}
      </div>
    </section>
  );
}
