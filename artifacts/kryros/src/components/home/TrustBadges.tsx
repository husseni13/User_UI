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
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {badges.map(({ icon: Icon, title, subtitle }, i) => (
            <div key={i} className="flex items-center gap-3 py-4 px-4 md:px-8">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
