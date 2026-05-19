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

const GRADIENT =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 65%)";

function PromoCard({ cat, small = false }: { cat: (typeof ROW1)[0]; small?: boolean }) {
  return (
    <Link href={cat.href}>
      <div
        className="relative flex items-center overflow-hidden cursor-pointer group border border-gray-200 hover:shadow-md transition-shadow duration-200"
        style={{
          background: cat.bg,
          borderRadius: 8,
          height: small ? 88 : 120,
        }}
      >
        {/* Left: text */}
        <div className="relative flex flex-col justify-center pl-3 pr-1 z-10" style={{ width: "58%" }}>
          <h3
            className="font-black text-gray-900 leading-tight mb-0.5 truncate"
            style={{ fontSize: small ? 11 : 12 }}
          >
            {cat.name}
          </h3>
          <p
            className="text-gray-500 leading-snug mb-1.5 line-clamp-2"
            style={{ fontSize: small ? 8 : 9 }}
          >
            {cat.sub}
          </p>
          <span className="text-[#0d9488] font-semibold" style={{ fontSize: small ? 8 : 9 }}>
            Explore Now
          </span>
        </div>

        {/* Right: image with left-edge gradient blend */}
        <div className="absolute right-0 top-0 bottom-0" style={{ width: "45%" }}>
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{
              maskImage: GRADIENT,
              WebkitMaskImage: GRADIENT,
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
      {/*
        Row 1 — 3 cards
        Mobile:  1 column (stacked) so no card is ever orphaned
        Desktop: 3 columns side by side
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-2.5">
        {ROW1.map((cat) => (
          <PromoCard key={cat.id} cat={cat} small={false} />
        ))}
      </div>

      {/*
        Row 2 — 4 cards
        Mobile:  2 columns (4 ÷ 2 = 2 rows, perfectly even)
        Desktop: 4 columns side by side
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {ROW2.map((cat) => (
          <PromoCard key={cat.id} cat={cat} small={true} />
        ))}
      </div>
    </section>
  );
}
