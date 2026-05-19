import { Link } from "wouter";

const ROW1 = [
  {
    id: "pc1",
    name: "Smartphones",
    sub: "Smart Money, Smart Phones",
    href: "/shop?cat=Smartphones",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
    bg: "#eef6fb",
  },
  {
    id: "pc2",
    name: "Laptops",
    sub: "Powerfully Designed. Perfectly Built.",
    href: "/shop?cat=Laptops",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
    bg: "#edf3fb",
  },
  {
    id: "pc3",
    name: "Fashion",
    sub: "New Styles, New You",
    href: "/shop?cat=Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",
    bg: "#fdf4ff",
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
  },
  {
    id: "pc5",
    name: "Audio",
    sub: "Feel Every Beat",
    href: "/shop?cat=Audio",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
    bg: "#f0fdf4",
  },
  {
    id: "pc6",
    name: "Accessories",
    sub: "The Perfect Finishing Touch",
    href: "/shop?cat=Accessories",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    bg: "#fefce8",
  },
  {
    id: "pc7",
    name: "Cameras",
    sub: "Capture Every Moment",
    href: "/shop?cat=Cameras",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    bg: "#f5f3ff",
  },
];

function PromoCard({ cat }: { cat: (typeof ROW1)[0] }) {
  return (
    <Link href={cat.href}>
      <div
        className="relative flex items-center overflow-hidden cursor-pointer group border border-gray-200 hover:shadow-md transition-shadow duration-200 h-[110px] md:h-[130px]"
        style={{ background: cat.bg, borderRadius: 8 }}
      >
        {/* Text — left side */}
        <div className="flex flex-col justify-center pl-3 md:pl-4 pr-1 z-10 w-[55%]">
          <h3 className="font-black text-gray-900 leading-tight mb-0.5 text-[12px] md:text-[13px] truncate">
            {cat.name}
          </h3>
          <p className="text-gray-500 leading-snug mb-1.5 text-[9px] md:text-[10px] line-clamp-2">
            {cat.sub}
          </p>
          <span className="text-[#0d9488] font-semibold text-[9px] md:text-[10px]">
            Explore Now
          </span>
        </div>

        {/* Product image — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%]">
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </Link>
  );
}

function SmallPromoCard({ cat }: { cat: (typeof ROW2)[0] }) {
  return (
    <Link href={cat.href}>
      <div
        className="relative flex items-center overflow-hidden cursor-pointer group border border-gray-200 hover:shadow-md transition-shadow duration-200 h-[90px] md:h-[90px]"
        style={{ background: cat.bg, borderRadius: 8 }}
      >
        {/* Text — left side */}
        <div className="flex flex-col justify-center pl-3 pr-1 z-10 w-[55%]">
          <h3 className="font-black text-gray-900 leading-tight mb-0.5 text-[11px] md:text-[12px] truncate">
            {cat.name}
          </h3>
          <p className="text-gray-500 leading-snug mb-1.5 text-[8px] md:text-[9px] line-clamp-2">
            {cat.sub}
          </p>
          <span className="text-[#0d9488] font-semibold text-[8px] md:text-[9px]">
            Explore Now
          </span>
        </div>

        {/* Product image — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%]">
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </Link>
  );
}

export default function CategoryPromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
      {/* Row 1 — 2 cols on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-2.5">
        {ROW1.map((cat) => (
          <PromoCard key={cat.id} cat={cat} />
        ))}
      </div>

      {/* Row 2 — 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {ROW2.map((cat) => (
          <SmallPromoCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
}
