import { Link } from "wouter";

const CATS = [
  {
    id: "c1",
    badge: "LIMITED",
    name: "Sound\nDevices",
    href: "/shop?cat=Audio",
    gradFrom: "#1e293b",
    gradTo: "#0f172a",
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
  },
  {
    id: "c2",
    badge: "NEW ARRIVAL",
    name: "Cameras",
    href: "/shop?cat=Cameras",
    gradFrom: "#4c1d95",
    gradTo: "#2e1065",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
  },
  {
    id: "c3",
    badge: "HOT DEALS",
    name: "Mobile\nPhones",
    href: "/shop?cat=Smartphones",
    gradFrom: "#0c4a6e",
    gradTo: "#082f49",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80",
  },
  {
    id: "c4",
    badge: "TRENDING",
    name: "Laptops",
    href: "/shop?cat=Laptops",
    gradFrom: "#14532d",
    gradTo: "#052e16",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80",
  },
  {
    id: "c5",
    badge: "EXCLUSIVE",
    name: "Wearables",
    href: "/shop?cat=Smart+Watches",
    gradFrom: "#7c2d12",
    gradTo: "#431407",
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80",
  },
  {
    id: "c6",
    badge: "POPULAR",
    name: "Fashion",
    href: "/shop?cat=Fashion",
    gradFrom: "#1e1b4b",
    gradTo: "#0f0d2e",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80",
  },
];

export default function CategorySection() {
  return (
    <section className="py-4 bg-background">
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-3 md:px-6">
        {CATS.map((cat) => (
          <Link key={cat.id} href={cat.href}>
            <div
              className="flex-shrink-0 relative w-64 h-36 rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                background: `linear-gradient(135deg, ${cat.gradFrom} 0%, ${cat.gradTo} 100%)`,
              }}
            >
              {/* Product image — right side, faded */}
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute right-0 top-0 h-full w-40 object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                {/* Badge */}
                <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">
                  {cat.badge}
                </span>

                {/* Category name */}
                <div>
                  <h3 className="text-xl font-black text-white uppercase leading-tight whitespace-pre-line mb-3">
                    {cat.name}
                  </h3>
                  {/* Browse now */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase group-hover:text-white transition-colors">
                      Browse Now
                    </span>
                    <span className="text-white/80 group-hover:text-white transition-all group-hover:translate-x-1 duration-200 text-sm">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
