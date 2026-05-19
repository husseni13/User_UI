import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mockData";

const plans = [
  { months: 3, label: "3 Months", interest: "0% Interest", desc: "No hidden fees\nFlexible & Easy", popular: true },
  { months: 6, label: "6 Months", interest: "0% Interest", desc: "Low monthly payments\nFlexible & Easy", popular: false },
  { months: 12, label: "12 Months", interest: "0% Interest", desc: "Best for higher amounts\nEasy installments", popular: false },
  { months: 24, label: "24 Months", interest: "0% Interest", desc: "Longer terms\nSmaller payments", popular: false },
];

const steps = [
  { num: 1, title: "Shop", desc: "Choose the products you love" },
  { num: 2, title: "Choose Plan", desc: "Select a payment plan that suits you" },
  { num: 3, title: "Quick Approval", desc: "Get approved in seconds" },
  { num: 4, title: "Enjoy", desc: "Receive your products and pay easy" },
];

export default function GetNowPage() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const getNowProducts = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">Get Now</h1>
          <p className="text-muted-foreground text-sm mt-1">Buy now, pay in easy installments<br />Simple. Flexible. Hassle-free.</p>
        </div>
        <div className="bg-foreground text-background rounded-2xl p-4 text-right cursor-pointer hover:opacity-90 transition-opacity">
          <p className="text-xs text-background/60 mb-1">Available Credit</p>
          <p className="text-2xl font-black text-primary">$2,450.00</p>
          <p className="text-xs text-background/60">of $3,000.00</p>
        </div>
      </div>

      {/* Hero banner */}
      <div className="rounded-2xl overflow-hidden mb-8 border border-border" style={{ background: "linear-gradient(135deg, #F8FAFC 0%, #E8F5F3 100%)" }}>
        <div className="dark:bg-card/50 flex items-center gap-6 p-6 md:p-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1">Shop Now.</h2>
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-3">Pay Later.</h2>
            <p className="text-sm text-muted-foreground mb-1">0% interest on select plans</p>
            <p className="text-sm text-muted-foreground mb-5">Easy monthly payments</p>
            <Link href="/shop">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                How It Works <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="flex flex-col gap-2">
              {["Flexible Plans", "Instant Approval", "0% Interest"].map((b) => (
                <div key={b} className="flex items-center gap-2 bg-white dark:bg-card rounded-xl px-3 py-1.5 shadow-sm border border-border">
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{b}</span>
                </div>
              ))}
            </div>
            <div className="w-28 h-28 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-4xl font-black text-primary">K</span>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">How Get Now Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              <div className="bg-card border border-border rounded-2xl p-4 flex-1 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-black text-primary">{step.num}</span>
                </div>
                <p className="text-sm font-bold text-foreground mb-1">{step.num}. {step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
              {i < steps.length - 1 && <span className="text-muted-foreground text-lg hidden md:block">›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Popular products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Popular On Get Now</h2>
          <Link href="/shop"><span className="text-sm text-primary font-semibold hover:underline cursor-pointer">View All</span></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {getNowProducts.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="relative">
                  <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">0% Interest</span>
                  <img src={p.image} alt={p.name} className="w-full aspect-square object-cover bg-muted" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground leading-snug mb-1">{p.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{p.specs}</p>
                  <p className="text-base font-black text-foreground">${p.price.toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground mb-3">or ${(p.price / 12).toFixed(2)}/mo for 12 mos</p>
                  <button className="w-full py-2 bg-foreground text-background rounded-xl text-xs font-bold hover:opacity-90 transition-all">Get Now</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">Choose Your Plan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {plans.map((plan, i) => (
            <button
              key={plan.months}
              onClick={() => setSelectedPlan(i)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${selectedPlan === i ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 bg-primary text-white rounded-full whitespace-nowrap">Most Popular</span>
              )}
              <p className="text-lg font-black text-foreground mb-0.5">{plan.label}</p>
              <p className="text-xs font-bold text-green-600 mb-1">{plan.interest}</p>
              {plan.desc.split("\n").map((line) => (
                <p key={line} className="text-[11px] text-muted-foreground">{line}</p>
              ))}
            </button>
          ))}
        </div>
      </div>

      {/* Trust banner */}
      <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4 cursor-pointer hover:border-primary/30 transition-colors">
        <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-foreground">Safe, Secure & Trusted</p>
          <p className="text-xs text-muted-foreground">Your information is protected with industry-standard security.</p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>
    </div>
  );
}
