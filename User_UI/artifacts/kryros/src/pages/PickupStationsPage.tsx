import { useState } from "react";
import { Search, MapPin, Clock, Navigation, Package, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { pickupStations } from "@/data/mockData";

export default function PickupStationsPage() {
  const [searchQ, setSearchQ] = useState("");

  const filtered = pickupStations.filter((s) =>
    !searchQ || s.name.toLowerCase().includes(searchQ.toLowerCase()) || s.address.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground">Pickup Stations</h1>
          <p className="text-muted-foreground text-sm mt-1">Choose a pickup station near you and collect your orders quickly and easily.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 text-right flex-shrink-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Fast & Convenient</span>
          </div>
          <p className="text-[10px] text-muted-foreground">Pick up your orders at<br />your convenience, anytime.</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by city, area or station name..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
            data-testid="pickup-search-input"
          />
        </div>
        <button className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center hover:border-primary/50 transition-colors">
          <Navigation className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Map placeholder */}
      <div className="relative bg-[#e8f0e8] dark:bg-muted rounded-2xl overflow-hidden mb-6" style={{ height: "200px" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground/40 text-sm">Map View</div>
        </div>
        {/* Fake map pins */}
        {[{ x: "30%", y: "40%" }, { x: "50%", y: "30%" }, { x: "65%", y: "55%" }, { x: "75%", y: "35%" }].map((pos, i) => (
          <div key={i} className="absolute" style={{ left: pos.x, top: pos.y }}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md ${i === 0 ? "bg-primary" : "bg-foreground"}`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
          </div>
        ))}
        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/20 animate-ping" />
        </div>
        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-opacity">
          <Navigation className="w-3.5 h-3.5" />
          Use My Location
        </button>
      </div>

      {/* Stations list */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground">Nearby Pickup Stations</h2>
        <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          Sort by: Nearest
          <span className="ml-1">▼</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {filtered.map((station, i) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-all group"
          >
            <img src={station.image} alt={station.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0 bg-muted" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-foreground text-sm truncate">{station.name}</p>
                {station.recommended && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full flex-shrink-0">
                    Recommended
                  </span>
                )}
              </div>
              <div className="flex items-start gap-1 mb-1">
                <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-snug">{station.address}</p>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-green-500 flex-shrink-0" />
                <p className="text-[11px] text-green-600">{station.hours}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-xs font-bold text-muted-foreground">{station.distance}</span>
              <div className="flex items-center gap-1">
                <Navigation className="w-3 h-3 text-muted-foreground" />
              </div>
              <button className="px-3 py-1.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded-xl text-[11px] font-bold hover:bg-green-500/20 transition-colors">
                Open Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How pickup works */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 mb-6 cursor-pointer hover:border-primary/40 transition-colors">
        <Package className="w-8 h-8 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-foreground text-sm">How Pickup Works</p>
          <p className="text-xs text-muted-foreground">Choose a station, place your order, and we'll notify you when it's ready for pickup.</p>
        </div>
        <button className="px-3 py-1.5 border border-primary text-primary rounded-xl text-xs font-bold hover:bg-primary/10 transition-colors flex-shrink-0">
          Learn More
        </button>
      </div>

      {/* Why choose pickup */}
      <h2 className="text-lg font-bold text-foreground mb-4">Why Choose Pickup?</h2>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Clock, title: "Save Time", desc: "Skip delivery wait and pick up when it suits you." },
          { icon: CheckCircle, title: "Secure & Safe", desc: "Your orders are stored securely until you pick them up." },
          { icon: Package, title: "No Delivery Fees", desc: "Pick up for free from any of our stations." },
          { icon: Navigation, title: "Flexible Hours", desc: "Extended hours to fit your busy schedule." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-4">
            <Icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-bold text-foreground mb-1">{title}</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
