import { Link } from "wouter";
import { LayoutGrid } from "lucide-react";
import { categories } from "@/data/mockData";

const displayCats = [
  { id: "c1", name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
  { id: "c2", name: "Laptops", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" },
  { id: "c3", name: "Fashion", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80" },
  { id: "c4", name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
  { id: "c5", name: "Audio", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80" },
];

export default function CategorySection() {
  return (
    <section className="py-4 md:py-6 bg-background">
      <div className="px-3 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 md:gap-5 overflow-x-auto no-scrollbar pb-1">
          {displayCats.map((cat) => (
            <Link key={cat.id} href={`/shop?cat=${cat.name}`}>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0">
                <div className="w-[58px] h-[58px] md:w-[72px] md:h-[72px] rounded-2xl overflow-hidden bg-muted border border-border group-hover:border-primary/50 transition-all">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-center text-foreground/70 group-hover:text-primary transition-colors leading-tight whitespace-nowrap">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}

          {/* All Categories */}
          <Link href="/shop">
            <div className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0">
              <div className="w-[58px] h-[58px] md:w-[72px] md:h-[72px] rounded-2xl bg-muted border border-border group-hover:border-primary/50 transition-all flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 md:w-7 md:h-7 text-foreground/60 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-center text-foreground/70 group-hover:text-primary transition-colors leading-tight whitespace-nowrap">
                All Categories
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
