import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, Heart, User, Sun, Moon, Globe, Menu, Mic, ChevronDown, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useThemeStore } from "@/store/themeStore";
import Sidebar from "./Sidebar";

const desktopNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Get Now", href: "/get-now" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Pickup Stations", href: "/pickup-stations" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((t, i) => t + i.qty, 0);
  const wishlist = useWishlistStore((s) => s.items);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
        {/* Announcement bar */}
        <div className="hidden md:flex bg-foreground text-background text-xs items-center justify-between px-6 py-2">
          <span className="flex items-center gap-1">
            <span className="text-primary">Free Delivery</span> on all orders over $100
          </span>
          <div className="flex items-center gap-4">
            <Link href="/track"><span className="hover:text-primary/80 cursor-pointer transition-colors">Track Order</span></Link>
            <Link href="/help"><span className="hover:text-primary/80 cursor-pointer transition-colors">Help Center</span></Link>
            <span className="hover:text-primary/80 cursor-pointer transition-colors">Store Locator</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center gap-3 px-4 md:px-6 h-[64px] md:h-[76px]">
          {/* Hamburger */}
          <button
            data-testid="header-menu-btn"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-muted transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/">
            <span className="text-xl md:text-2xl font-black tracking-tight cursor-pointer flex-shrink-0">
              KRY<span className="text-primary">ROS</span>
            </span>
          </Link>

          {/* Desktop: Category + Search */}
          <div className="hidden md:flex flex-1 items-center gap-2 mx-4">
            <button className="flex items-center gap-2 px-3 py-2.5 bg-primary text-white rounded-xl text-sm font-medium flex-shrink-0 hover:bg-primary/90 transition-colors">
              <Menu className="w-4 h-4" />
              All Categories
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center bg-muted rounded-xl border border-border overflow-hidden shadow-sm">
              <Search className="w-4 h-4 ml-3 text-muted-foreground flex-shrink-0" />
              <input
                type="search"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-transparent text-sm outline-none"
                data-testid="header-search-input"
              />
              <button className="px-4 py-2.5 bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium flex-shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Spacer for mobile */}
          <div className="flex-1 md:hidden" />

          {/* Desktop: Right icons */}
          <div className="hidden md:flex items-center gap-1">
            <button className="flex items-center gap-1 px-2 py-2 rounded-xl hover:bg-muted transition-colors text-sm text-muted-foreground">
              <span>USD</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1 px-2 py-2 rounded-xl hover:bg-muted transition-colors text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
              data-testid="theme-toggle"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/login">
              <button className="p-2 rounded-xl hover:bg-muted transition-colors">
                <User className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/shop">
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length > 9 ? "9+" : wishlist.length}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/cart">
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors" data-testid="cart-icon">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>

          {/* Mobile: Right icons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
            <Link href="/shop">
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/cart">
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile: Search bar */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center bg-muted rounded-xl border border-border overflow-hidden">
              <Search className="w-4 h-4 ml-3 text-muted-foreground flex-shrink-0" />
              <input
                type="search"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-transparent text-sm outline-none"
                autoFocus
              />
              <button className="px-3 py-2 text-muted-foreground">
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Desktop: Sub nav */}
        <div className="hidden md:flex items-center gap-1 px-6 py-1.5 border-t border-border/50 bg-muted/30">
          {desktopNav.map(({ label, href }) => {
            const isActive = location === href || (href !== "/" && location.startsWith(href));
            return (
              <Link key={href} href={href}>
                <button
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              </Link>
            );
          })}
          <span className="ml-auto px-3 py-1.5 rounded-lg text-sm font-semibold text-orange-500 bg-orange-500/10 cursor-pointer hover:bg-orange-500/20 transition-colors">
            Hot Deals
          </span>
        </div>
      </header>
    </>
  );
}
