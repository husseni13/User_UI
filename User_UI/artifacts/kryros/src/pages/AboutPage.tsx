import { ShieldCheck, Target, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-12">
      {/* Hero */}
      <div className="rounded-2xl overflow-hidden bg-card border border-border mb-8">
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl font-black">KRY<span className="text-primary">ROS</span></span>
          </div>
        </div>
        <div className="p-6">
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 mb-3">
            Your Trusted Shopping Partner!
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            KRYROS is a global premium ecommerce marketplace connecting customers with the world's best brands. Founded with the mission to make technology and fashion accessible to everyone, we offer a curated selection of smartphones, laptops, fashion, shoes, electronics, audio, cameras, and accessories.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            With a presence in over 50 countries, KRYROS continues to grow as one of the most trusted online shopping destinations. We partner only with verified brands to ensure the quality and authenticity of every product.
          </p>
        </div>
      </div>

      {/* Mission/Vision/Values */}
      <h2 className="text-xl font-bold text-foreground mb-4">Our Foundation</h2>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {[
          {
            icon: Target,
            title: "Our Mission",
            text: "To provide a seamless, premium shopping experience for customers worldwide — connecting them with the world's best technology, fashion, and lifestyle products."
          },
          {
            icon: Globe,
            title: "Our Vision",
            text: "To become the world's most trusted global ecommerce platform, making premium products accessible to everyone, everywhere."
          },
          {
            icon: Heart,
            title: "Our Values",
            text: "Customer First. Integrity. Innovation. Quality. We believe in doing right by our customers, partners, and communities every single day."
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: "50+", label: "Countries" },
          { value: "1M+", label: "Customers" },
          { value: "10K+", label: "Products" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-primary">{value}</p>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Company info */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold text-foreground mb-3">Company Information</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-2"><span className="font-medium text-foreground w-32">Registered Name</span><span>KRYROS MOBILE TECH LIMITED</span></div>
          <div className="flex gap-2"><span className="font-medium text-foreground w-32">Address</span><span>West Sussex, Burgess Hill, United Kingdom</span></div>
          <div className="flex gap-2"><span className="font-medium text-foreground w-32">Email</span><span>kryrosmobile@gmail.com</span></div>
          <div className="flex gap-2"><span className="font-medium text-foreground w-32">Phone</span><span>+260 966 423 719</span></div>
        </div>
      </div>
    </div>
  );
}
