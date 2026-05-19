import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Package, Heart, MapPin, CreditCard, Zap, ShoppingBag, MessageCircle, Bell, RefreshCcw, Star, Settings,
  ChevronRight, X, Check
} from "lucide-react";
import { mockOrders } from "@/data/mockData";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Orders", href: "/dashboard/orders" },
  { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
  { icon: MapPin, label: "Addresses", href: "/dashboard/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/dashboard/payment" },
  { icon: Zap, label: "Get Now Plans", href: "/dashboard/get-now" },
  { icon: ShoppingBag, label: "Wholesale Requests", href: "/dashboard/wholesale" },
  { icon: MapPin, label: "Pickup Stations", href: "/pickup-stations" },
  { icon: MessageCircle, label: "Messages", href: "/dashboard/messages" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications", badge: 3 },
  { icon: RefreshCcw, label: "Returns & Refunds", href: "/dashboard/returns" },
  { icon: Star, label: "My Reviews", href: "/dashboard/reviews" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const stats = [
  { icon: Package, label: "Total Orders", value: "24", sub: "View all orders →", href: "/track" },
  { icon: Heart, label: "Wishlist Items", value: "18", sub: "View wishlist →", href: "/shop" },
  { icon: Zap, label: "Get Now Credit", value: "$2,450.00", sub: "View plans →", href: "/get-now" },
  { icon: MapPin, label: "Saved Addresses", value: "4", sub: "Manage addresses →", href: "/dashboard/addresses" },
];

const addresses = [
  { label: "Home", address: "123 Business Avenue, Downtown, New York, NY 10001, USA" },
  { label: "Office", address: "456 West 34th Street, Midtown West, New York, NY 10018, USA" },
];

const statusColors: Record<string, string> = {
  "In Transit": "bg-primary/10 text-primary",
  "Delivered": "bg-green-500/10 text-green-600",
  "Out for Delivery": "bg-orange-500/10 text-orange-600",
  "Cancelled": "bg-destructive/10 text-destructive",
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();

  const recentOrders = mockOrders.slice(0, 4);
  const mainOrder = mockOrders[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 flex-shrink-0">
          <div className="bg-card border border-border rounded-2xl overflow-hidden sticky top-20">
            <div className="p-4 border-b border-border">
              <span className="text-lg font-black">KRY<span className="text-primary">ROS</span></span>
            </div>
            <nav className="p-2">
              {sidebarItems.map(({ icon: Icon, label, href, badge }) => (
                <Link key={href} href={href}>
                  <div className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all mb-0.5 group ${href === "/dashboard" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"}`}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{label}</span>
                    </div>
                    {badge && (
                      <span className="bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{badge}</span>
                    )}
                  </div>
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t border-border space-y-1 text-xs text-muted-foreground">
              {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions", "Refund Policy"].map((l) => (
                <p key={l} className="px-3 py-1 hover:text-primary cursor-pointer transition-colors">{l}</p>
              ))}
              <p className="px-3 pt-2 text-[10px]">&copy; 2024 KRYROS. All rights reserved.</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-foreground">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Welcome back, Alex!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map(({ icon: Icon, label, value, sub, href }) => (
              <Link key={label} href={href}>
                <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-xl font-black text-foreground mb-1">{value}</p>
                  <p className="text-[11px] text-primary group-hover:underline">{sub}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Recent Orders</h2>
                <Link href="/track"><span className="text-xs text-primary hover:underline cursor-pointer">View All Orders</span></Link>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-xl p-2 -mx-2 transition-all">
                    <img src={order.image} alt={order.productName} className="w-10 h-10 object-cover rounded-xl bg-muted flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{order.productName}</p>
                      <p className="text-[11px] text-muted-foreground">Order ID: {order.orderId}</p>
                      <p className="text-[11px] text-muted-foreground">{order.placedOn}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Tracking */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Order Tracking</h2>
                <Link href="/track"><span className="text-xs text-primary hover:underline cursor-pointer">Track Your Order</span></Link>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Latest Order</p>
              <div className="flex items-center gap-3 mb-4">
                <img src={mainOrder.image} alt={mainOrder.productName} className="w-12 h-12 object-cover rounded-xl bg-muted flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground">{mainOrder.productName}</p>
                  <p className="text-xs text-muted-foreground">Order ID: {mainOrder.orderId}</p>
                </div>
              </div>
              {/* Mini timeline */}
              <div className="flex items-start gap-1 mb-4">
                {mainOrder.timeline.map((step, i) => (
                  <div key={step.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.done ? (step.active ? "bg-primary shadow-md shadow-primary/30" : "bg-primary") : "bg-muted border-2 border-border"}`}>
                        {step.done && !step.active && <Check className="w-3 h-3 text-white" />}
                        {step.active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                      <p className={`text-[9px] text-center mt-1 ${step.active ? "text-primary font-bold" : step.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label.split(" ")[0]}
                      </p>
                      <p className="text-[8px] text-muted-foreground text-center">{step.date.split(",")[0]}</p>
                    </div>
                    {i < mainOrder.timeline.length - 1 && (
                      <div className={`flex-1 h-0.5 mt-[-10px] ${step.done && !step.active ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                <p className="text-lg font-black text-foreground">{mainOrder.estDelivery}</p>
              </div>
            </div>
          </div>

          {/* Get Now Banner */}
          <div className="rounded-2xl overflow-hidden mb-4" style={{ background: "linear-gradient(135deg, #050816 0%, #0D1523 100%)" }}>
            <div className="flex items-center justify-between p-5 md:p-6">
              <div>
                <h3 className="text-xl font-black text-white mb-1">Get More with Get Now</h3>
                <p className="text-white/60 text-sm mb-4">Shop now and pay later with flexible plans that suit you.</p>
                <Link href="/get-now">
                  <button className="px-5 py-2 bg-white text-foreground rounded-xl font-bold text-sm hover:bg-white/90 transition-all">
                    Explore Plans
                  </button>
                </Link>
              </div>
              <div className="hidden md:flex gap-2">
                {["Instant Approval", "0% Interest", "Flexible Plans"].map((b) => (
                  <div key={b} className="bg-white/10 rounded-xl px-2.5 py-1.5 text-[10px] font-bold text-white border border-white/10">
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wishlist & Addresses */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Wishlist</h2>
                <span className="text-xs text-primary hover:underline cursor-pointer">View All</span>
              </div>
              <div className="flex gap-3">
                {mockOrders.slice(0, 3).map((o) => (
                  <div key={o.id} className="flex flex-col items-center gap-1">
                    <img src={o.image} alt={o.productName} className="w-16 h-16 object-cover rounded-xl bg-muted border-2 border-transparent hover:border-primary transition-colors cursor-pointer" />
                    <span className="text-xs font-bold text-foreground">${o.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                Go to Wishlist
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Saved Addresses</h2>
                <span className="text-xs text-primary hover:underline cursor-pointer">Manage All</span>
              </div>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div key={addr.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{addr.label}</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{addr.address}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 text-primary text-sm font-semibold hover:bg-primary/5 rounded-xl transition-colors">
                + Add New Address
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { icon: Package, label: "My Orders", sub: "Track and manage your orders" },
                { icon: RefreshCcw, label: "Returns", sub: "Request return or check status" },
                { icon: CreditCard, label: "Payment Methods", sub: "Manage your saved cards" },
                { icon: MapPin, label: "Pickup Stations", sub: "Find and manage pickup locations" },
                { icon: Settings, label: "Settings", sub: "Manage your account preferences" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2 p-3 bg-card border border-border rounded-2xl cursor-pointer hover:border-primary/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs font-bold text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight hidden md:block">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
