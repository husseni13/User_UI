import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const brands = [
  { id: "b1", name: "Apple", href: "/shop?brand=Apple" },
  { id: "b2", name: "Samsung", href: "/shop?brand=Samsung" },
  { id: "b3", name: "Sony", href: "/shop?brand=Sony" },
  { id: "b4", name: "Bose", href: "/shop?brand=Bose" },
  { id: "b5", name: "Dell", href: "/shop?brand=Dell" },
  { id: "b6", name: "HP", href: "/shop?brand=HP" },
  { id: "b7", name: "Asus", href: "/shop?brand=Asus" },
];

function BrandLogo({ name }: { name: string }) {
  if (name === "Apple") {
    return (
      <span className="text-xl font-black text-foreground leading-none"></span>
    );
  }
  if (name === "Samsung") {
    return (
      <span className="text-[11px] font-black tracking-[0.18em] text-foreground uppercase">SAMSUNG</span>
    );
  }
  if (name === "Sony") {
    return (
      <span className="text-sm font-black tracking-[0.22em] text-foreground uppercase">SONY</span>
    );
  }
  if (name === "Bose") {
    return (
      <span className="text-sm font-black tracking-[0.18em] text-foreground uppercase">BOSE</span>
    );
  }
  if (name === "Dell") {
    return (
      <span className="text-sm font-black tracking-[0.1em] text-blue-600 dark:text-blue-400 uppercase italic">DELL</span>
    );
  }
  if (name === "HP") {
    return (
      <span className="text-sm font-black tracking-tight text-blue-700 dark:text-blue-300 lowercase">hp</span>
    );
  }
  if (name === "Asus") {
    return (
      <span className="text-sm font-black tracking-[0.12em] text-foreground uppercase">ASUS</span>
    );
  }
  return <span className="text-sm font-black text-foreground">{name}</span>;
}

export default function BrandsSection() {
  return (
    <section className="py-4 md:py-6 border-t border-border">
      <div className="px-3 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-base md:text-xl font-black text-foreground">Top Brands</h2>
          <Link href="/shop">
            <span className="text-xs md:text-sm text-primary font-semibold cursor-pointer hover:underline flex items-center gap-0.5">
              View All Brands <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {brands.map((brand) => (
            <Link key={brand.id} href={brand.href}>
              <div className="flex-shrink-0 w-[68px] h-[52px] md:w-[80px] md:h-[60px] bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
                <BrandLogo name={brand.name} />
              </div>
            </Link>
          ))}
          <Link href="/shop">
            <div className="flex-shrink-0 w-[44px] h-[52px] md:h-[60px] bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/40 transition-all cursor-pointer">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
