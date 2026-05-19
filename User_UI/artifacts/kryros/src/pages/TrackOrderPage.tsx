import { useState } from "react";
import { Search, ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { mockOrders } from "@/data/mockData";

const statusColors: Record<string, string> = {
  "In Transit": "bg-primary/10 text-primary border-primary/20",
  "Out for Delivery": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Delivered": "bg-green-500/10 text-green-600 border-green-500/20",
  "Cancelled": "bg-destructive/10 text-destructive border-destructive/20",
};

const filterTabs = ["All Orders", "In Transit", "Out for Delivery", "Delivered", "Cancelled"];

export default function TrackOrderPage() {
  const [searchQ, setSearchQ] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Orders");

  const mainOrder = mockOrders[0];
  const filtered = mockOrders.slice(1).filter((o) => {
    if (activeFilter !== "All Orders" && o.status !== activeFilter) return false;
    if (searchQ && !o.orderId.includes(searchQ) && !o.productName.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-10">
      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-1">Track Order</h1>
      <p className="text-muted-foreground text-sm mb-6">Stay updated with your order status in real time</p>

      {/* Search */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter Order ID or Tracking Number"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
            data-testid="track-search-input"
          />
        </div>
        <button className="px-5 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex-shrink-0">
          Track Order
        </button>
      </div>

      {/* Recent Orders (featured) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Recent Orders</h2>
          <span className="text-sm text-primary font-semibold cursor-pointer hover:underline">View All</span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={mainOrder.image} alt={mainOrder.productName} className="w-14 h-14 object-cover rounded-xl bg-muted flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-foreground text-sm">{mainOrder.productName}</p>
              <p className="text-xs text-muted-foreground">{mainOrder.specs}</p>
              <p className="text-xs text-muted-foreground">Order ID: {mainOrder.orderId}</p>
              <p className="text-xs text-muted-foreground">Placed on: {mainOrder.placedOn}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColors[mainOrder.status]}`}>
                {mainOrder.status}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Est. Delivery</p>
              <p className="text-xs font-bold text-primary">{mainOrder.estDelivery}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative flex items-start gap-2">
            {mainOrder.timeline.map((step, i) => (
              <div key={step.label} className="flex-1 flex flex-col items-center">
                <div className="relative flex items-center w-full">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${step.done ? (step.active ? "bg-primary shadow-lg shadow-primary/40" : "bg-primary") : "bg-muted border-2 border-border"}`}>
                    {step.done && !step.active && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-none stroke-white stroke-2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {step.active && <div className="w-3 h-3 rounded-full bg-white" />}
                  </div>
                  {i < mainOrder.timeline.length - 1 && (
                    <div className={`flex-1 h-0.5 ${i < mainOrder.timeline.findIndex((t) => !t.done) - 1 || (step.done && !step.active) ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
                <p className={`text-[10px] text-center mt-1 font-medium ${step.active ? "text-primary" : step.done ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                <p className="text-[9px] text-muted-foreground text-center">{step.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-4">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeFilter === tab ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* All orders */}
      <div className="space-y-3 mb-6">
        {filtered.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-all">
            <img src={order.image} alt={order.productName} className="w-14 h-14 object-cover rounded-xl bg-muted flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-sm truncate">{order.productName}</p>
              <p className="text-xs text-muted-foreground">{order.specs}</p>
              <p className="text-xs text-muted-foreground">Order ID: {order.orderId}</p>
              <p className="text-xs text-muted-foreground">Placed on: {order.placedOn}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColors[order.status]}`}>
                {order.status}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {order.status === "Delivered" ? "Delivered on" : order.status === "Cancelled" ? "Cancelled on" : "Est. Delivery"}
              </p>
              <p className={`text-xs font-bold ${order.status === "Cancelled" ? "text-destructive" : "text-primary"}`}>
                {order.estDelivery}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </motion.div>
        ))}
      </div>

      {/* Help banner */}
      <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-foreground text-sm">Need Help?</p>
          <p className="text-xs text-muted-foreground">Our support team is here to help with your order.</p>
        </div>
        <button className="px-4 py-2 border border-primary text-primary rounded-xl text-xs font-bold hover:bg-primary/5 transition-all flex-shrink-0">
          Contact Support
        </button>
      </div>
    </div>
  );
}
