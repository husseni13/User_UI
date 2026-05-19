import { useState } from "react";
import { Search, Package, RefreshCcw, Truck, CreditCard, User, Info, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";

const topics = [
  { icon: Package, title: "Track Your Order", desc: "Find out where your order is and when it'll arrive.", href: "/track" },
  { icon: RefreshCcw, title: "Returns & Refunds", desc: "Learn about our return policy and how to start a return.", href: "/refund" },
  { icon: Truck, title: "Shipping & Delivery", desc: "Shipping methods, costs, and estimated delivery times.", href: "/help" },
  { icon: CreditCard, title: "Payment Methods", desc: "Accepted payment methods and secure checkout.", href: "/help" },
  { icon: User, title: "Account & Profile", desc: "Manage your account settings, addresses, and preferences.", href: "/dashboard" },
  { icon: Info, title: "Product Information", desc: "Get details on products, warranties, and authenticity.", href: "/shop" },
];

export default function HelpPage() {
  const [searchQ, setSearchQ] = useState("");

  const filtered = topics.filter((t) =>
    !searchQ || t.title.toLowerCase().includes(searchQ.toLowerCase()) || t.desc.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">Help Center</h1>
        <p className="text-muted-foreground">How can we help you today?</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for help topics..."
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
        />
      </div>

      {/* Topics */}
      <h2 className="text-lg font-bold text-foreground mb-4">Popular Topics</h2>
      <div className="space-y-2 mb-8">
        {filtered.map(({ icon: Icon, title, desc, href }) => (
          <Link key={title} href={href}>
            <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl cursor-pointer hover:border-primary/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No topics found for "{searchQ}"</p>
        </div>
      )}

      {/* Can't find banner */}
      <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-foreground">Can't find what you need?</p>
          <p className="text-xs text-muted-foreground">Our support team is always ready to help you.</p>
        </div>
        <Link href="/contact">
          <button className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all flex-shrink-0">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}
