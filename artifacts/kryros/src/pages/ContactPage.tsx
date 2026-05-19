import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground">We're here to help! Reach out through any of the channels below.</p>
      </div>

      {/* Contact cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { icon: Mail, title: "Email Support", info: "kryrosmobile@gmail.com", sub: "Replies within 24 hours" },
          { icon: Phone, title: "Phone", info: "+260 966 423 719", sub: "Mon-Fri, 9am-6pm" },
          { icon: MessageCircle, title: "Live Chat", info: "Chat with us", sub: "Available on WhatsApp" },
          { icon: MapPin, title: "Head Office", info: "Burgess Hill, UK", sub: "West Sussex" },
        ].map(({ icon: Icon, title, info, sub }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-4 cursor-pointer hover:border-primary/30 transition-all">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-bold text-foreground mb-0.5">{title}</p>
            <p className="text-xs text-primary font-medium">{info}</p>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* Social */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-3">Follow Us</h3>
        <div className="flex gap-3">
          {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
            <button key={i} className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all">
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4">Send Us a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
              { label: "Email Address", key: "email", type: "email", placeholder: "Your email" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="How can we help?"
              className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us more about your inquiry..."
              rows={4}
              className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
