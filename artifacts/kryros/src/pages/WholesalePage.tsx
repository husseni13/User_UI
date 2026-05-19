import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Truck, ShieldCheck, Headphones, ShoppingCart, ChevronRight } from "lucide-react";
import { products, categories } from "@/data/mockData";

const steps = [
  { num: 1, title: "Browse Products", desc: "Explore products available for wholesale" },
  { num: 2, title: "Add to Quote", desc: "Add products to your quote list" },
  { num: 3, title: "Submit Quote", desc: "Our team will review your request" },
  { num: 4, title: "Confirm & Order", desc: "Confirm the quote and place your order" },
];

export default function WholesalePage() {
  const wholesaleProducts = products.slice(0, 4);
  const wholesaleCats = categories.filter((c) => ["Smartphones", "Laptops", "Electronics", "Accessories", "Audio"].includes(c.name));

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">Wholesale</h1>
          <p className="text-muted-foreground text-sm mt-1">Bulk buying made simple. Best prices for your business.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 text-right flex-shrink-0 cursor-pointer hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-1.5 mb-0.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Wholesale Benefits</span>
          </div>
          <p className="text-[10px] text-muted-foreground">Lower prices, priority support<br />and exclusive offers.</p>
          <ChevronRight className="w-3 h-3 text-primary ml-auto mt-1" />
        </div>
      </div>

      {/* Hero banner */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, #050816 0%, #0D1523 100%)" }}>
        <div className="flex items-center justify-between p-6 md:p-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-1">Buy More,</h2>
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-3">Save More!</h2>
            <p className="text-white/60 text-sm mb-4">Exclusive wholesale prices on thousands of products.</p>
            <Link href="/shop">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-foreground rounded-xl font-bold text-sm hover:bg-white/90 transition-all">
                Explore Products <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="w-20 h-20 rounded-full border-4 border-primary/40 flex flex-col items-center justify-center">
              <span className="text-[9px] text-white/60">UP TO</span>
              <span className="text-2xl font-black text-primary">40%</span>
              <span className="text-[9px] text-white/60">OFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by category */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Shop by Category</h2>
          <span className="text-sm text-primary font-semibold cursor-pointer hover:underline">View All</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {[...wholesaleCats, { id: "more", name: "More", image: "", description: "" }].map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-border group-hover:border-primary transition-all bg-muted">
                {cat.image ? <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="text-xs font-bold text-muted-foreground">+</span></div>}
              </div>
              <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature badges */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: Tag, title: "Bulk Discounts", desc: "Better prices on larger quantities" },
          { icon: Truck, title: "Priority Shipping", desc: "Faster delivery for wholesale orders" },
          { icon: ShieldCheck, title: "Secure Payments", desc: "Safe & encrypted transactions" },
          { icon: Headphones, title: "Dedicated Support", desc: "24/7 priority customer support" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-2 p-3 bg-card border border-border rounded-xl">
            <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-foreground">{title}</p>
              <p className="text-[10px] text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top deals */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Top Wholesale Deals</h2>
          <span className="text-sm text-primary font-semibold cursor-pointer hover:underline">View All</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {wholesaleProducts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="relative">
                  <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">Save {p.discount}%</span>
                  <img src={p.image} alt={p.name} className="w-full aspect-square object-cover bg-muted" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-foreground leading-snug mb-0.5 line-clamp-2">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground mb-2">{p.specs}</p>
                  <p className="text-base font-black text-foreground mb-0.5">${(p.price * 0.85).toFixed(2)}<span className="text-[10px] text-muted-foreground font-normal"> /unit</span></p>
                  <p className="text-[10px] text-muted-foreground mb-3">Min. Order: {i === 0 ? 5 : i === 1 ? 3 : i === 2 ? 10 : 20} units</p>
                  <button className="w-full flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-[11px] font-bold text-foreground hover:bg-muted transition-all">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Request a quote banner */}
      <div className="flex items-center justify-between bg-card border border-border rounded-2xl p-5 mb-6">
        <div>
          <p className="font-bold text-foreground text-sm mb-1">Want Better Prices?</p>
          <p className="text-xs text-muted-foreground">Request a custom quote for bulk orders and get the best deals curated for your business.</p>
        </div>
        <button className="ml-4 flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all flex-shrink-0">
          Request a Quote <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* How wholesale works */}
      <h2 className="text-lg font-bold text-foreground mb-4">How Wholesale Works</h2>
      <div className="grid grid-cols-2 gap-3">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-start gap-2">
            <div className="bg-card border border-border rounded-2xl p-4 flex-1">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-xs font-black text-primary">{step.num}</span>
              </div>
              <p className="text-xs font-bold text-foreground mb-1">{step.num}. {step.title}</p>
              <p className="text-[10px] text-muted-foreground">{step.desc}</p>
            </div>
            {i % 2 === 0 && <span className="text-muted-foreground/40 text-xl hidden md:flex items-center self-center">›</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
