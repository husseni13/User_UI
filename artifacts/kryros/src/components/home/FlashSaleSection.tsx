import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Zap } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mockData";

function useCountdown(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState(targetMs);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => Math.max(0, p - 1000)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(timeLeft / 3600000);
  const m = Math.floor((timeLeft % 3600000) / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  return { h, m, s };
}

function Digit({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center">
        <span className="text-xl md:text-2xl font-black text-white">{String(val).padStart(2, "0")}</span>
      </div>
      <span className="text-[10px] text-white/50 mt-1 uppercase">{label}</span>
    </div>
  );
}

export default function FlashSaleSection() {
  const countdown = useCountdown(2 * 3600000 + 18 * 60000 + 45000);
  const flashProducts = products.slice(0, 5);

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Banner */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{ background: "linear-gradient(135deg, #050816 0%, #0D1523 100%)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl md:text-2xl font-black text-white">Flash Sale</h2>
                  <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-white/50 text-sm">Limited Time Offer</p>
              </div>
              <div className="flex items-center gap-2">
                <Digit val={countdown.h} label="Days" />
                <span className="text-white/40 text-2xl font-black pb-4">:</span>
                <Digit val={countdown.m} label="Hours" />
                <span className="text-white/40 text-2xl font-black pb-4">:</span>
                <Digit val={countdown.s} label="Mins" />
                <span className="text-white/40 text-2xl font-black pb-4">:</span>
                <Digit val={30} label="Secs" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-primary/40 flex flex-col items-center justify-center text-white">
                <span className="text-[10px] font-semibold text-white/70">UP TO</span>
                <span className="text-2xl font-black text-primary">50%</span>
                <span className="text-[10px] font-semibold text-white/70">OFF</span>
              </div>
              <Link href="/shop">
                <button className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Flash Deals header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Flash Deals</h2>
            <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
          <Link href="/shop">
            <span className="text-sm text-primary font-semibold hover:underline cursor-pointer flex items-center gap-1">
              View All
            </span>
          </Link>
        </div>

        {/* Products */}
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {flashProducts.map((p, i) => (
            <div key={p.id} className="flex-shrink-0 w-[180px] md:w-[220px]">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
