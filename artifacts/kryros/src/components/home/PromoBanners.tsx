import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="py-4 md:py-6">
      <div className="px-3 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-3 md:gap-4">

          {/* Get Now Smart Payment Plan */}
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-5"
            style={{
              background: "linear-gradient(135deg, #0d1f3c 0%, #122040 100%)",
              height: 140,
            }}
          >
            <div>
              <p className="text-primary text-[9px] font-bold uppercase tracking-widest mb-1">Get Now</p>
              <h3 className="text-white font-black text-[13px] md:text-base leading-tight">Smart Payment Plan</h3>
              <p className="text-white/50 text-[9px] mt-1 leading-snug line-clamp-2">
                Buy now, pay in easy monthly instalments.
              </p>
            </div>
            <Link href="/get-now">
              <div className="flex items-center gap-1 text-primary text-[10px] font-semibold cursor-pointer hover:gap-2 transition-all whitespace-nowrap">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
            {/* Decorative phone image */}
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120&q=80"
              alt="Phone"
              className="absolute bottom-0 right-2 w-12 h-[90px] object-cover object-top opacity-75 rounded-t-xl"
            />
          </div>

          {/* Free Shipping Worldwide */}
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-5 bg-card border border-border"
            style={{ height: 140 }}
          >
            <div>
              <p className="text-primary text-[9px] font-bold uppercase tracking-widest mb-1">Free Shipping</p>
              <h3 className="text-foreground font-black text-[13px] md:text-base leading-tight">Free Shipping Worldwide</h3>
              <p className="text-muted-foreground text-[9px] mt-1 leading-snug">
                On all orders over $100
              </p>
            </div>
            <Link href="/shop">
              <div className="flex items-center gap-1 text-primary text-[10px] font-semibold cursor-pointer hover:gap-2 transition-all whitespace-nowrap">
                Shop Now <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
            <div className="absolute bottom-3 right-3">
              <span className="text-2xl font-black text-muted-foreground/10 select-none">KRYROS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
