import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";

export default function CategorySection() {
  const featured = categories.slice(0, 8);

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Horizontal scroll pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop?cat=${cat.name}`}>
              <div className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 w-20 md:w-24">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-border group-hover:border-primary transition-all shadow-sm">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-center text-muted-foreground group-hover:text-primary transition-colors leading-tight">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Category showcase cards */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {featured.slice(0, 8).map((cat, i) => (
              <Link key={cat.id} href={`/shop?cat=${cat.name}`}>
                <div
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  style={{ aspectRatio: i === 0 ? "auto" : "1/1" }}
                >
                  <div className={i === 0 ? "h-full min-h-[240px] md:min-h-[340px]" : "aspect-square"}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className={`font-bold text-white ${i === 0 ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
                        {cat.name}
                      </h3>
                      {i === 0 && (
                        <p className="text-white/70 text-xs mt-1 mb-2">{cat.description}</p>
                      )}
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                        Explore Now
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
