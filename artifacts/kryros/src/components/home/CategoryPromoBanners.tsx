import { Link } from "wouter";

const CATEGORIES = [
  {
    id: "pc1",
    name: "Smartphones",
    sub: "Smart Money, Smart Phones",
    href: "/shop?cat=Smartphones",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
    bg: "#eef6fb",
    large: true,
  },
  {
    id: "pc2",
    name: "Laptops",
    sub: "Powerfully Designed. Perfectly Built.",
    href: "/shop?cat=Laptops",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
    bg: "#edf3fb",
    large: true,
  },
  {
    id: "pc3",
    name: "Fashion",
    sub: "New Styles, New You",
    href: "/shop?cat=Fashion",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",
    bg: "#fdf4ff",
    large: true,
  },
  {
    id: "pc4",
    name: "Shoes",
    sub: "Step Into Something New",
    href: "/shop?cat=Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    bg: "#fff7ed",
    large: false,
  },
  {
    id: "pc5",
    name: "Audio",
    sub: "Feel Every Beat",
    href: "/shop?cat=Audio",
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80",
    bg: "#f0fdf4",
    large: false,
  },
  {
    id: "pc6",
    name: "Accessories",
    sub: "The Perfect Finishing Touch",
    href: "/shop?cat=Accessories",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
    bg: "#fefce8",
    large: false,
  },
  {
    id: "pc7",
    name: "Cameras",
    sub: "Capture Every Moment",
    href: "/shop?cat=Cameras",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80",
    bg: "#f5f3ff",
    large: false,
  },
];

const GRADIENT =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 28%, rgba(0,0,0,1) 60%)";

/* ── Desktop banner card (matches reference exactly) ── */
function DesktopCard({ cat, small }: { cat: (typeof CATEGORIES)[0]; small?: boolean }) {
  return (
    <Link href={cat.href}>
      <div
        className="relative flex items-center overflow-hidden cursor-pointer group border border-gray-200 hover:shadow-md transition-shadow duration-200"
        style={{ background: cat.bg, borderRadius: 8, height: small ? 88 : 122 }}
      >
        <div className="relative flex flex-col justify-center pl-4 pr-1 z-10" style={{ width: "57%" }}>
          <h3 className="font-black text-gray-900 leading-tight mb-0.5 truncate" style={{ fontSize: small ? 11 : 13 }}>
            {cat.name}
          </h3>
          <p className="text-gray-500 leading-snug mb-1.5 line-clamp-2" style={{ fontSize: small ? 8.5 : 9.5 }}>
            {cat.sub}
          </p>
          <span className="text-[#0d9488] font-semibold" style={{ fontSize: small ? 8.5 : 9.5 }}>
            Explore Now
          </span>
        </div>
        <div className="absolute right-0 top-0 bottom-0" style={{ width: "46%" }}>
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ maskImage: GRADIENT, WebkitMaskImage: GRADIENT }}
          />
        </div>
      </div>
    </Link>
  );
}

/* ── Mobile horizontal-scroll card ── */
function MobileCard({ cat }: { cat: (typeof CATEGORIES)[0] }) {
  return (
    <Link href={cat.href}>
      <div
        className="relative flex-shrink-0 overflow-hidden cursor-pointer group border border-gray-200 hover:shadow-md transition-shadow duration-200"
        style={{ background: cat.bg, borderRadius: 10, width: 130, height: 100 }}
      >
        {/* Background image fills full card */}
        <img
          src={cat.img}
          alt={cat.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          style={{
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
          }}
        />
        {/* Text at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="font-black text-white leading-tight text-[11px] truncate drop-shadow">{cat.name}</p>
          <span className="text-[#4ade80] font-semibold text-[8px] drop-shadow">Explore Now</span>
        </div>
      </div>
    </Link>
  );
}

export default function CategoryPromoBanners() {
  const row1 = CATEGORIES.filter((c) => c.large);
  const row2 = CATEGORIES.filter((c) => !c.large);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 mb-6">

      {/* ── MOBILE: single horizontal scroll strip ── */}
      <div className="md:hidden">
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} style={{ scrollSnapAlign: "start" }}>
              <MobileCard cat={cat} />
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: exact reference layout ── */}
      <div className="hidden md:block">
        {/* Row 1 — 3 larger cards */}
        <div className="grid grid-cols-3 gap-2.5 mb-2.5">
          {row1.map((cat) => (
            <DesktopCard key={cat.id} cat={cat} small={false} />
          ))}
        </div>
        {/* Row 2 — 4 smaller cards */}
        <div className="grid grid-cols-4 gap-2.5">
          {row2.map((cat) => (
            <DesktopCard key={cat.id} cat={cat} small={true} />
          ))}
        </div>
      </div>

    </section>
  );
}
