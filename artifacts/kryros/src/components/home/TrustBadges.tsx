import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const badges = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $100" },
  { icon: ShieldCheck, title: "Secure Payments", subtitle: "100% Secure" },
  { icon: RefreshCcw, title: "Easy Returns", subtitle: "30-Day Returns" },
  { icon: Headphones, title: "24/7 Support", subtitle: "We are here" },
];

export default function TrustBadges() {
  return (
    <section className="border-t border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-0 md:px-6">
        <div className="flex items-center overflow-x-auto no-scrollbar divide-x divide-border">
          {badges.map(({ icon: Icon, title, subtitle }, i) => (
            <div key={i} className="flex items-center gap-2.5 py-3 px-4 md:py-4 md:px-8 flex-shrink-0 flex-1 min-w-[140px]">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">{title}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
