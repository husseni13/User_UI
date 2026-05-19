import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const PROMO_CATS = [
  {
    id: "pc1",
    name: "Smartphones",
    sub: "Smart Money, Smart Phones",
    href: "/shop?cat=Smartphones",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
  },
  {
    id: "pc2",
    name: "Laptops",
    sub: "Powerfully Designed. Perfectly Built",
    href: "/shop?cat=Laptops",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
  },
  {
    id: "pc3",
    name: "Fashion",
    sub: "New Styles, New You",
    href: "/shop?cat=Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",
  },
  {
    id: "pc4",
    name: "Shoes",
    sub: "Step Into Something New",
    href: "/shop?cat=Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
  },
  {
    id: "pc5",
    name: "Audio",
    sub: "Feel Every Beat",
    href: "/shop?cat=Audio",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&q=80",
  },
  {
    id: "pc6",
    name: "Accessories",
    sub: "The Perfect Finishing Touch",
    href: "/shop?cat=Accessories",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
  },
  {
    id: "pc7",
    name: "Cameras",
    sub: "Capture Every Moment",
    href: "/shop?cat=Cameras",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
  },
];

export default function CategoryPromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {PROMO_CATS.map((cat, i) => {
          const isWide = i === 0;
          return (
            <Link key={cat.id} href={cat.href}>
              <div
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                  isWide ? "col-span-2 md:col-span-1" : ""
                }`}
                style={{ minHeight: 100 }}
              >
                {/* Background image */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay — left-heavy so text is readable */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(5,10,20,0.78) 0%, rgba(5,10,20,0.45) 60%, rgba(5,10,20,0.10) 100%)",
                  }}
                />

                {/* Text content */}
                <div className="relative z-10 p-4 flex flex-col justify-between h-full min-h-[100px]">
                  <div>
                    <h3 className="text-sm font-black text-white leading-tight mb-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-white/65 leading-snug mb-3 max-w-[120px]">
                      {cat.sub}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-teal-400 text-[11px] font-bold group-hover:gap-2 transition-all">
                    Explore Now <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
