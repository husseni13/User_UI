import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const brands = [
  { id: "b1", name: "Apple", style: "font-black text-foreground" },
  { id: "b2", name: "Samsung", style: "font-black text-blue-600 dark:text-blue-400" },
  { id: "b3", name: "Sony", style: "font-black text-foreground" },
  { id: "b4", name: "Nike", style: "font-black text-foreground" },
  { id: "b5", name: "Adidas", style: "font-black text-foreground" },
  { id: "b6", name: "Dell", style: "font-black text-blue-700 dark:text-blue-400" },
  { id: "b7", name: "HP", style: "font-black text-blue-700 dark:text-blue-300" },
  { id: "b8", name: "Bose", style: "font-black text-foreground" },
];

export default function BrandsSection() {
  return (
    <section className="py-4 md:py-6 border-t border-border">
      <div className="px-3 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-base md:text-xl font-black text-foreground">Top Brands You Love</h2>
          <Link href="/shop">
            <span className="text-xs md:text-sm text-primary font-semibold cursor-pointer hover:underline flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/shop?brand=${brand.name}`}>
              <div className="flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 bg-card border border-border rounded-xl md:rounded-2xl hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
                <span className={`text-sm md:text-base uppercase tracking-wide group-hover:text-primary transition-colors ${brand.style}`}>
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
          <Link href="/shop">
            <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/40 transition-all cursor-pointer">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
