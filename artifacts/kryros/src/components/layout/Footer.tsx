import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const shopLinks = [
  { label: "Smartphones", href: "/shop" },
  { label: "Laptops", href: "/shop" },
  { label: "Fashion", href: "/shop" },
  { label: "Shoes", href: "/shop" },
  { label: "Audio", href: "/shop" },
  { label: "Accessories", href: "/shop" },
  { label: "All Categories", href: "/shop" },
];

const serviceLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Track Order", href: "/track" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Shipping Information", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
  { label: "Security", href: "/security" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-background">Subscribe to Our Newsletter</h3>
            <p className="text-background/60 text-sm mt-1">Get the latest updates on new arrivals, exclusive offers and more.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 md:w-72 px-4 py-2.5 bg-background/10 border border-background/20 rounded-xl text-background placeholder:text-background/40 outline-none focus:border-primary text-sm"
            />
            <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex-shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <span className="text-2xl font-black tracking-tight">KRY<span className="text-primary">ROS</span></span>
            <p className="text-background/60 text-sm mt-3 leading-relaxed max-w-xs">
              Your trusted global e-commerce platform for tech, fashion and lifestyle products. Shopping made simple, fast and secure.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-background text-sm mb-4">Shop</h4>
            <ul className="space-y-2">
              {shopLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span className="text-background/60 text-sm hover:text-primary transition-colors cursor-pointer">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-background text-sm mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span className="text-background/60 text-sm hover:text-primary transition-colors cursor-pointer">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <h4 className="font-bold text-background text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span className="text-background/60 text-sm hover:text-primary transition-colors cursor-pointer">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-background text-sm mb-3 mt-5">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>
                    <span className="text-background/60 text-sm hover:text-primary transition-colors cursor-pointer">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-background text-sm mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/60 text-xs leading-relaxed">KRYROS MOBILE TECH LIMITED<br />West Sussex, Burgess Hill, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-background/60 text-xs">support@kryros.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-background/60 text-xs">+1(800) 123-4567</span>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xs text-background/40 mb-2">We accept</p>
              <div className="flex flex-wrap gap-1">
                {["VISA", "MC", "PayPal", "G Pay", "Apple"].map((m) => (
                  <span key={m} className="text-[10px] px-2 py-1 bg-background/10 rounded text-background/60 font-medium">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-background/40 text-xs">&copy; 2024 KRYROS MOBILE TECH LIMITED. All Rights Reserved.</p>
          <p className="text-background/40 text-xs text-center">Trusted Online Store | Secure Payments | Customer Support Available 24/7</p>
        </div>
      </div>
    </footer>
  );
}
