import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-4 md:py-6">
      <div className="px-3 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {/* Get Now Smart Payment Plan */}
          <div
            className="relative rounded-2xl overflow-hidden min-h-[110px] md:min-h-[160px] flex flex-col justify-between p-3 md:p-6"
            style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #122040 100%)" }}
          >
            <div>
              <p className="text-primary text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1">Get Now</p>
              <h3 className="text-white font-black text-xs md:text-lg leading-tight">Smart Payment Plan</h3>
              <p className="text-white/50 text-[8px] md:text-xs mt-1 leading-snug hidden md:block">
                Bring home your favorite products now, pay in easy monthly instalments.
              </p>
            </div>
            <Link href="/get-now">
              <div className="flex items-center gap-1 text-primary text-[10px] md:text-sm font-semibold mt-2 cursor-pointer hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </Link>
            {/* Decorative phone image */}
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120&q=80"
              alt="Phone"
              className="absolute bottom-0 right-2 w-12 h-16 md:w-20 md:h-28 object-cover object-top opacity-80 rounded-t-xl"
            />
          </div>

          {/* Free Shipping Worldwide */}
          <div className="relative rounded-2xl overflow-hidden min-h-[110px] md:min-h-[160px] flex flex-col justify-between p-3 md:p-6 bg-card border border-border">
            <div>
              <p className="text-primary text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1">Free Shipping</p>
              <h3 className="text-foreground font-black text-xs md:text-lg leading-tight">Free Shipping Worldwide</h3>
              <p className="text-muted-foreground text-[8px] md:text-xs mt-1 leading-snug">
                On all orders over $100
              </p>
            </div>
            <Link href="/shop">
              <div className="flex items-center gap-1 text-primary text-[10px] md:text-sm font-semibold mt-2 cursor-pointer hover:gap-2 transition-all">
                Shop Now <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </Link>
            <div className="absolute bottom-2 right-3 md:bottom-4 md:right-6">
              <span className="text-2xl md:text-4xl font-black text-muted-foreground/10 select-none">KRYROS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
