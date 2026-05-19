import { brands } from "@/data/mockData";

export default function BrandsSection() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-8 md:py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Top Brands You Love</h2>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-4 animate-marquee"
            style={{
              animation: "marquee 20s linear infinite",
              width: "max-content",
            }}
          >
            {doubled.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="flex-shrink-0 px-8 py-4 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-base md:text-lg font-black text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
