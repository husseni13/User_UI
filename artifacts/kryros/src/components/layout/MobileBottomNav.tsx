import { Link, useLocation } from "wouter";
import { Home, Grid2x2, Zap, ShoppingBag, MapPin } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Shop", icon: Grid2x2, href: "/shop" },
  { label: "Get Now", icon: Zap, href: "/get-now" },
  { label: "Cart", icon: ShoppingBag, href: "/cart" },
  { label: "Pickup", icon: MapPin, href: "/pickup-stations" },
];

export default function MobileBottomNav() {
  const [location] = useLocation();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((t, i) => t + i.qty, 0);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = location === href || (href !== "/" && location.startsWith(href));
            const isCart = href === "/cart";
            return (
              <Link key={href} href={href}>
                <button
                  data-testid={`bottom-nav-${label.toLowerCase().replace(" ", "-")}`}
                  className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 relative"
                >
                  <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${isActive ? "bg-primary/10" : ""}`}>
                    <Icon
                      className={`w-5 h-5 transition-all duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {isCart && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
