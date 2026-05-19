import { useState } from "react";
import { Link } from "wouter";
import {
  LayoutDashboard, Package, Heart, MapPin, CreditCard, Zap, ShoppingBag,
  MessageCircle, Bell, RefreshCcw, Star, Settings, ChevronRight, Check,
  Truck, MoreVertical, Plus, Globe, Sun, DollarSign, X,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Package, label: "Orders", href: "/track" },
  { icon: Heart, label: "Wishlist", href: "/shop" },
  { icon: MapPin, label: "Addresses", href: "/dashboard" },
  { icon: CreditCard, label: "Payment Methods", href: "/dashboard" },
  { icon: Zap, label: "Get Now Plans", href: "/get-now" },
  { icon: ShoppingBag, label: "Wholesale Requests", href: "/wholesale" },
  { icon: MapPin, label: "Pickup Stations", href: "/pickup-stations" },
  { icon: MessageCircle, label: "Messages", href: "/dashboard" },
  { icon: Bell, label: "Notifications", href: "/dashboard", badge: 3 },
  { icon: RefreshCcw, label: "Returns & Refunds", href: "/returns" },
  { icon: Star, label: "My Reviews", href: "/dashboard" },
  { icon: Settings, label: "Settings", href: "/dashboard" },
];

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

const recentOrders = [
  { id: "o1", name: "iPhone 15 Pro Max", orderId: "#KRY12345678", date: "May 12, 2024", status: "In Transit", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&q=80" },
  { id: "o2", name: "MacBook Air M2", orderId: "#KRY12345677", date: "May 08, 2024", status: "Delivered", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80" },
  { id: "o3", name: "Sony WH-1000XM5", orderId: "#KRY12345676", date: "May 05, 2024", status: "Out for Delivery", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80" },
  { id: "o4", name: "Nike Air Max 270", orderId: "#KRY12345675", date: "May 02, 2024", status: "Delivered", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" },
];

const wishlistItems = [
  { id: "w1", name: "iPhone 15 Pro Max", price: "$1,099.00", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&q=80" },
  { id: "w2", name: "MacBook Air M2", price: "$1,249.00", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" },
  { id: "w3", name: "Sony WH-1000XM5", price: "$349.00", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80" },
];

const addresses = [
  { icon: MapPin, label: "Home", lines: ["123 Business Avenue,", "Downtown, New York,", "NY 10001, USA"] },
  { icon: Package, label: "Office", lines: ["456 West 34th Street,", "Midtown West, New York,", "NY 10018, USA"] },
];

const trackingTimeline = [
  { label: "Order Confirmed", date: "May 12", done: true, active: false },
  { label: "Shipped", date: "May 14", done: true, active: false },
  { label: "In Transit", date: "May 16", done: true, active: true },
  { label: "Out for Delivery", date: "May 20", done: false, active: false },
];

const statusColors: Record<string, string> = {
  "In Transit": "bg-primary/10 text-primary",
  "Delivered": "bg-green-500/10 text-green-600",
  "Out for Delivery": "bg-orange-500/10 text-orange-600",
  "Cancelled": "bg-red-500/10 text-red-600",
};

const quickActions = [
  { icon: Package, label: "My Orders", sub: "Track and manage your orders", href: "/track" },
  { icon: RefreshCcw, label: "Returns", sub: "Request return or check status", href: "/returns" },
  { icon: CreditCard, label: "Payment Methods", sub: "Manage your saved cards and wallets", href: "/dashboard" },
  { icon: MapPin, label: "Pickup Stations", sub: "Find and manage pickup locations", href: "/pickup-stations" },
  { icon: Settings, label: "Settings", sub: "Manage your account preferences", href: "/dashboard" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <span className="text-lg font-black text-foreground">KRY<span className="text-primary">ROS</span></span>
        <button className="lg:hidden w-7 h-7 rounded-full bg-muted flex items-center justify-center" onClick={() => setSidebarOpen(false)}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {sidebarItems.map(({ icon: Icon, label, href, active, badge }) => (
          <Link key={label} href={href}>
            <div onClick={() => setSidebarOpen(false)} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all mb-0.5 ${active ? "bg-primary text-white" : "hover:bg-muted text-foreground"}`}>
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{label}</span>
              </div>
              {badge && (
                <span className={`text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ${active ? "bg-white text-primary" : "bg-primary text-white"}`}>{badge}</span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Bottom settings */}
      <div className="border-t border-border p-3 space-y-1">
        {[
          { icon: DollarSign, label: "USD - US Dollar" },
          { icon: Globe, label: "English" },
          { icon: Sun, label: "Light Mode" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-muted cursor-pointer transition-all">
            <div className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          </div>
        ))}
        <div className="pt-1 space-y-0.5">
          {footerLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              <p className="px-3 py-1 text-[10px] text-muted-foreground hover:text-primary cursor-pointer transition-colors">{label}</p>
            </Link>
          ))}
          <p className="px-3 pt-1 text-[9px] text-muted-foreground/60">&copy; 2024 KRYROS. All rights reserved.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 border-r border-border sticky top-0 h-screen overflow-hidden">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-56 bg-card h-full flex flex-col shadow-2xl z-10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 pb-28 lg:pb-10">

          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Alex! 👋</p>
          </div>

          {/* 4 Stat cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: ShoppingBag, label: "Total Orders", value: "24", sub: "View all orders →", href: "/track", iconBg: "#e6fafa", iconColor: "#0d9488" },
              { icon: Heart, label: "Wishlist Items", value: "18", sub: "View wishlist →", href: "/shop", iconBg: "#fdf2f8", iconColor: "#ec4899" },
              { icon: Zap, label: "Get Now Credit", value: "$2,450.00", sub: "View plans →", href: "/get-now", iconBg: "#fff7ed", iconColor: "#f97316" },
              { icon: MapPin, label: "Saved Addresses", value: "4", sub: "Manage addresses →", href: "/dashboard", iconBg: "#f5f3ff", iconColor: "#8b5cf6" },
            ].map(({ icon: Icon, label, value, sub, href, iconBg, iconColor }) => (
              <Link key={label} href={href}>
                <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                  {/* Large circle icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ background: iconBg }}
                  >
                    <Icon style={{ width: 26, height: 26, color: iconColor }} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-2xl font-black text-foreground mb-2 leading-tight">{value}</p>
                  <p className="text-xs font-semibold" style={{ color: "#0d9488" }}>{sub}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Orders + Order Tracking */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-foreground">Recent Orders</h2>
                <Link href="/track">
                  <span className="flex items-center gap-0.5 text-xs text-primary cursor-pointer hover:underline">
                    View All Orders <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
              <div className="space-y-2.5">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-muted/50 transition-all cursor-pointer -mx-1.5">
                    <img src={order.image} alt={order.name} className="w-10 h-10 object-cover rounded-xl bg-muted flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{order.name}</p>
                      <p className="text-[10px] text-muted-foreground">Order ID: {order.orderId}</p>
                      <p className="text-[10px] text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Tracking */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-foreground">Order Tracking</h2>
                <Link href="/track">
                  <span className="flex items-center gap-0.5 text-xs text-primary cursor-pointer hover:underline">
                    Track Your Order <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">Latest Order</p>
              <div className="flex items-center gap-3 mb-4 p-2 bg-muted/40 rounded-xl">
                <img src={recentOrders[0].image} alt={recentOrders[0].name} className="w-10 h-10 object-cover rounded-xl bg-muted flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">{recentOrders[0].name}</p>
                  <p className="text-[10px] text-muted-foreground">Order ID: {recentOrders[0].orderId}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-start mb-4">
                {trackingTimeline.map((step, i) => (
                  <div key={step.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className="flex items-center w-full">
                        {i > 0 && <div className={`flex-1 h-0.5 ${step.done || trackingTimeline[i-1].done ? "bg-primary" : "bg-border"}`} />}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${step.active ? "bg-primary ring-4 ring-primary/20" : step.done ? "bg-primary" : "bg-muted border-2 border-border"}`}>
                          {step.done && !step.active && <Check className="w-3 h-3 text-white" />}
                          {step.active && <Truck className="w-3 h-3 text-white" />}
                          {!step.done && <MapPin className="w-2.5 h-2.5 text-muted-foreground" />}
                        </div>
                        {i < trackingTimeline.length - 1 && <div className={`flex-1 h-0.5 ${step.done && !step.active ? "bg-primary" : "bg-border"}`} />}
                      </div>
                      <p className={`text-[8px] text-center mt-1 font-medium leading-tight ${step.active ? "text-primary" : step.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label.split(" ")[0]}
                      </p>
                      <p className="text-[8px] text-muted-foreground text-center">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Estimated delivery */}
              <div className="bg-muted/40 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground">Estimated Delivery</p>
                  <p className="text-base font-black text-foreground">May 20, 2024</p>
                </div>
                <Truck className="w-10 h-10 text-muted-foreground/30" />
              </div>
            </div>
          </div>

          {/* Get Now Banner */}
          <div
            className="rounded-2xl overflow-hidden mb-4 relative"
            style={{ background: "linear-gradient(135deg, #07392f 0%, #0a5544 50%, #064535 100%)", minHeight: 140 }}
          >
            <div className="flex items-center justify-between p-5 md:p-6 relative z-10">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-black text-white mb-1">Get More with Get Now</h3>
                <p className="text-white/60 text-xs mb-4 leading-snug max-w-[220px]">
                  Shop now and pay later with flexible plans that suit you.
                </p>
                <Link href="/get-now">
                  <button className="px-5 py-2 bg-white text-foreground rounded-xl font-bold text-sm hover:bg-white/90 transition-all">
                    Explore Plans
                  </button>
                </Link>
              </div>
              {/* Right: product collage + badges */}
              <div className="flex-shrink-0 relative hidden md:block" style={{ width: 260, height: 120 }}>
                {/* Badges */}
                <div className="absolute top-0 left-0 flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-xl px-2.5 py-1.5 backdrop-blur-sm">
                  <Check className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-bold text-white">Instant Approval</span>
                </div>
                <div className="absolute top-0 right-0 flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-xl px-2.5 py-1.5 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-white">0% Interest</span>
                </div>
                {/* KRYROS bag */}
                <div className="absolute bottom-0 left-4 w-16 h-16 bg-primary/80 rounded-xl flex items-end justify-center pb-1 shadow-xl">
                  <span className="text-[8px] font-black text-white">KRYROS</span>
                </div>
                {/* Headphones */}
                <div className="absolute bottom-0 left-16 w-12 h-12 rounded-xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80" alt="headphones" className="w-full h-full object-cover" />
                </div>
                {/* Flexible plans badge */}
                <div className="absolute bottom-0 right-0 flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-xl px-2.5 py-1.5 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-white">Flexible Plans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wishlist + Saved Addresses */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">

            {/* Wishlist */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-foreground">Wishlist</h2>
                <Link href="/shop">
                  <span className="flex items-center gap-0.5 text-xs text-primary cursor-pointer hover:underline">
                    View All <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
              <div className="flex gap-3 mb-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Heart className="w-3 h-3 fill-primary text-primary" />
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-foreground">{item.price}</span>
                  </div>
                ))}
              </div>
              <Link href="/shop">
                <button className="w-full py-2.5 border border-border rounded-xl text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  Go to Wishlist
                </button>
              </Link>
            </div>

            {/* Saved Addresses */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-foreground">Saved Addresses</h2>
                <span className="flex items-center gap-0.5 text-xs text-primary cursor-pointer hover:underline">
                  Manage All <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="space-y-3 mb-3">
                {addresses.map(({ icon: Icon, label, lines }) => (
                  <div key={label} className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground mb-0.5">{label}</p>
                      {lines.map((line, i) => (
                        <p key={i} className="text-[10px] text-muted-foreground leading-snug">{line}</p>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button className="text-[10px] text-primary font-semibold hover:underline">Edit</button>
                      <MoreVertical className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-1.5 text-primary text-xs font-semibold hover:bg-primary/5 px-3 py-2 rounded-xl transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Add New Address
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-sm font-bold text-foreground mb-3">Quick Actions</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {quickActions.map(({ icon: Icon, label, sub, href }) => (
                <Link key={label} href={href}>
                  <div className="flex flex-col items-center text-center gap-2 p-3 bg-card border border-border rounded-2xl cursor-pointer hover:border-primary/30 transition-all group">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-primary" style={{ width: 18, height: 18 }} />
                    </div>
                    <p className="text-[10px] font-bold text-foreground leading-tight">{label}</p>
                    <p className="text-[9px] text-muted-foreground leading-tight hidden md:block">{sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
