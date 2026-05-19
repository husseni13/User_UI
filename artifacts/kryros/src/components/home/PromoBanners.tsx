import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface PromoBannersProps {
  variant?: "default" | "mega";
}

export default function PromoBanners({ variant = "default" }: PromoBannersProps) {
  if (variant === "mega") {
    return (
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Mega Deal */}
            <div className="rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #050816 0%, #0D1523 100%)" }}>
              <div className="flex items-center justify-between p-6 md:p-8 min-h-[160px]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl md:text-2xl font-black text-white">Mega Deal</h3>
                    <span className="text-orange-400 text-xl">🔥</span>
                  </div>
                  <p className="text-white/60 text-sm mb-4">Grab the best deals on top products</p>
                  <Link href="/shop">
                    <button className="px-5 py-2 bg-white text-foreground rounded-xl font-semibold text-sm hover:bg-white/90 transition-all">
                      Shop Now
                    </button>
                  </Link>
                </div>
                <div className="text-right">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/40 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-semibold text-white/60">UP TO</span>
                    <span className="text-2xl font-black text-primary">50%</span>
                    <span className="text-[9px] font-semibold text-white/60">OFF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Refer & Earn */}
            <div className="rounded-2xl overflow-hidden relative bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center justify-between p-6 md:p-8 min-h-[160px]">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">Refer & Earn</h3>
                  <p className="text-muted-foreground text-sm mb-4">Invite friends & get rewards for each successful referral.</p>
                  <Link href="/shop">
                    <button className="px-5 py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                      Learn More
                    </button>
                  </Link>
                </div>
                <div className="text-4xl opacity-60 text-primary">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-black text-primary">$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Get Now Smart Payment */}
          <div className="rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0D1523 0%, #101826 100%)" }}>
            <div className="flex items-center gap-4 p-6 md:p-8">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Get Now</span>
                <h3 className="text-xl md:text-2xl font-black text-white mt-1 mb-2">Smart Payment Plan</h3>
                <p className="text-white/60 text-sm mb-4">Bring home your favorite products now, pay in easy monthly instalments.</p>
                <Link href="/get-now">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
              <div className="hidden md:block flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=120&q=80"
                  alt="Product"
                  className="w-24 h-24 object-cover rounded-xl opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Free Shipping */}
          <div className="rounded-2xl overflow-hidden relative bg-card border border-border">
            <div className="flex items-center gap-4 p-6 md:p-8">
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Free Shipping</span>
                <h3 className="text-xl md:text-2xl font-black text-foreground mt-1 mb-2">Free Shipping Worldwide</h3>
                <p className="text-muted-foreground text-sm mb-4">On all orders over $100</p>
                <Link href="/shop">
                  <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
                    Shop Now <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-5xl font-black text-muted-foreground/20">KRYROS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
