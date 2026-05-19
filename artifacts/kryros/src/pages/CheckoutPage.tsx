import { useState } from "react";
import { Link } from "wouter";
import {
  Check, CreditCard, Smartphone, Building2, MessageCircle,
  Lock, ChevronRight, Truck, Zap, Clock, Send, Download,
  User, Mail, Phone, MapPin, Home, Globe
} from "lucide-react";

// ── Order items (from cart) ──────────────────────────────────────────
const ORDER_ITEMS = [
  { id: "i1", name: "iPhone 15 Pro Max 256GB", variant: "Natural Titanium", qty: 1, price: 1199.00, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&q=80" },
  { id: "i2", name: "AirPods Pro 2 (USB-C)", variant: "White", qty: 1, price: 249.00, image: "https://images.unsplash.com/photo-1606741965234-b2b9b2b1c0b5?w=100&q=80" },
];
const SUBTOTAL = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const DISCOUNT = 100;
const TAX = 80.88;

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Delivery", detail: "5–10 business days", price: 0, icon: Truck },
  { id: "express", label: "Express Delivery", detail: "2–3 business days", price: 15, icon: Zap },
  { id: "priority", label: "Priority Delivery", detail: "Next business day", price: 30, icon: Clock },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Card Payment", sub: "Visa, Mastercard & more", icon: CreditCard,
    logos: <div className="flex items-center gap-1"><div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">VISA</div><div className="w-6 h-4 rounded-sm overflow-hidden flex"><div className="flex-1 bg-red-500" /><div className="flex-1 bg-yellow-400" /></div></div> },
  { id: "mobile", label: "Mobile Money", sub: "MTN, Airtel, Zamtel", icon: Smartphone,
    logos: <div className="flex items-center gap-1"><div className="bg-yellow-400 text-black text-[7px] font-black px-1 py-0.5 rounded">MTN</div><div className="bg-red-500 text-white text-[7px] font-black px-1 py-0.5 rounded">A</div></div> },
  { id: "bank", label: "Bank Transfer", sub: "Local & International", icon: Building2, logos: null },
  { id: "whatsapp", label: "WhatsApp Pay", sub: "Manual confirmation required", icon: MessageCircle, logos: null },
  { id: "apple", label: "Apple Pay", sub: "Pay with Apple Pay", icon: () => <span className="font-black text-sm"></span>, logos: <span className="text-sm font-black"> Pay</span> },
  { id: "google", label: "Google Pay", sub: "Pay with Google Pay", icon: () => <span className="text-sm font-bold text-blue-500">G</span>, logos: <span className="text-xs font-bold text-blue-500">G Pay</span> },
];

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard?.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1 text-[10px] text-primary font-semibold border border-primary/30 px-2 py-1 rounded-lg hover:bg-primary/5 transition-colors">
      {copied ? <Check className="w-3 h-3" /> : null}{copied ? "Copied" : "Copy"}
    </button>
  );
}

const STEPS = [
  { id: 1, label: "Details" },
  { id: 2, label: "Address" },
  { id: 3, label: "Shipping" },
  { id: 4, label: "Payment" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [ordered, setOrdered] = useState(false);

  // Step 1 — Personal details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 — Shipping address
  const [country, setCountry] = useState("Ghana");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Step 3 — Shipping method
  const [shippingId, setShippingId] = useState("standard");
  const shippingPrice = SHIPPING_OPTIONS.find((s) => s.id === shippingId)?.price ?? 0;
  const total = SUBTOTAL - DISCOUNT + TAX + shippingPrice;

  // Step 4 — Payment
  const [payMethod, setPayMethod] = useState("card");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [mmProvider, setMmProvider] = useState("MTN Mobile Money");
  const [mmPhone, setMmPhone] = useState("");

  const handlePlaceOrder = () => setOrdered(true);

  // ── SUCCESS SCREEN ───────────────────────────────────────────────
  if (ordered) {
    const isManual = payMethod === "bank" || payMethod === "whatsapp";
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
        <div className="w-full max-w-sm">
          <div className="rounded-3xl overflow-hidden" style={{ background: isManual ? "linear-gradient(160deg, #2d2000 0%, #5a3a00 100%)" : "linear-gradient(160deg, #07392f 0%, #0a5544 100%)" }}>
            <div className="p-8 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isManual ? "bg-yellow-400/20 border-4 border-yellow-400" : "bg-green-400/20 border-4 border-green-400"}`}>
                {isManual ? <Clock className="w-8 h-8 text-yellow-400" /> : <Check className="w-8 h-8 text-green-400" />}
              </div>
              <h2 className="text-xl font-black text-white mb-1">
                {isManual ? "Order Placed — Pending" : "Order Placed!"}
              </h2>
              <p className="text-white/60 text-sm mb-6">
                {isManual
                  ? "Your order is placed. We'll confirm it once we verify your payment."
                  : `Thank you${firstName ? `, ${firstName}` : ""}! Your order is confirmed.`}
              </p>
              {isManual && (
                <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-3 mb-4 text-left">
                  <p className="text-yellow-300 text-xs font-semibold">What happens next?</p>
                  <p className="text-white/60 text-xs mt-1">
                    {payMethod === "whatsapp"
                      ? "Our team will contact you on WhatsApp to confirm your payment."
                      : "Send your proof of transfer to support. Once confirmed, your order will be processed."}
                  </p>
                </div>
              )}
              <div className="bg-white/10 rounded-2xl p-4 text-left space-y-2.5 mb-6">
                {[
                  ["Order ID", "KRY-2024-00012345"],
                  ["Total", `$${total.toFixed(2)}`],
                  ["Payment", PAYMENT_METHODS.find((m) => m.id === payMethod)?.label || "Card"],
                  ["Status", isManual ? "⏳ Pending Confirmation" : "✅ Confirmed"],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{label}</span>
                    <span className="text-white text-xs font-bold">{val}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3.5 bg-white/20 border border-white/30 text-white rounded-2xl font-bold text-sm mb-2.5 flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                <Download className="w-4 h-4" /> Download Receipt
              </button>
              <Link href="/track">
                <button className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm mb-2.5 hover:bg-primary/90 transition-colors">
                  Track My Order
                </button>
              </Link>
              <Link href="/">
                <button className="w-full py-3.5 border border-white/30 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN CHECKOUT ────────────────────────────────────────────────
  return (
    <div className="max-w-lg mx-auto px-4 py-5 pb-32 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-black text-foreground">Checkout</h1>
        <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
          <Lock className="w-3.5 h-3.5" /> Secure
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-5">Complete your order in a few easy steps</p>

      {/* Step indicator */}
      <div className="flex items-center mb-6">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2
                ${i + 1 < step ? "bg-primary border-primary text-white"
                  : i + 1 === step ? "bg-primary border-primary text-white ring-4 ring-primary/20"
                  : "bg-background border-border text-muted-foreground"}`}>
                {i + 1 < step ? <Check className="w-3.5 h-3.5" /> : s.id}
              </div>
              <span className={`text-[10px] mt-1 font-bold ${i + 1 <= step ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 -mt-4 transition-all ${i + 1 < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: PERSONAL DETAILS ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <h2 className="text-sm font-bold text-foreground">Your Details</h2>
            <p className="text-xs text-muted-foreground">We need these details for your order confirmation.</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">First Name</label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                  <User className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"
                    className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Last Name</label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                  <User className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"
                    className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Email Address</label>
              <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" type="email"
                  className="flex-1 text-sm text-foreground outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Phone Number</label>
              <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+233 24 123 4567" type="tel"
                  className="flex-1 text-sm text-foreground outline-none bg-transparent" />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!firstName || !lastName || !email || !phone}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2
                ${firstName && lastName && email && phone ? "bg-primary text-white hover:bg-primary/90 active:scale-95" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
            >
              Continue to Address <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: SHIPPING ADDRESS ── */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <h2 className="text-sm font-bold text-foreground">Shipping Address</h2>
            <p className="text-xs text-muted-foreground">Enter where you'd like your order delivered.</p>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Country</label>
              <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                  className="flex-1 text-sm text-foreground outline-none bg-transparent">
                  <option>Ghana</option>
                  <option>Nigeria</option>
                  <option>Kenya</option>
                  <option>Zambia</option>
                  <option>Uganda</option>
                  <option>Tanzania</option>
                  <option>South Africa</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Germany</option>
                  <option>France</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">State / Region</label>
                <input value={state} onChange={(e) => setState(e.target.value)} placeholder="Greater Accra"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Accra"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Street Address</label>
              <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                <Home className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <input value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder="123 Main Street, Apt 4B"
                  className="flex-1 text-sm text-foreground outline-none bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Postal / ZIP Code (optional)</label>
              <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="00233"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground" />
            </div>

            {/* Address preview */}
            {country && city && addressLine && (
              <div className="bg-muted/40 rounded-xl p-3 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  {[addressLine, city, state, country, zipCode].filter(Boolean).join(", ")}
                </p>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              disabled={!city || !addressLine}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2
                ${city && addressLine ? "bg-primary text-white hover:bg-primary/90 active:scale-95" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
            >
              Continue to Shipping <ChevronRight className="w-4 h-4" />
            </button>

            <button onClick={() => setStep(1)} className="w-full text-xs text-muted-foreground text-center hover:text-primary transition-colors">
              ← Back to Details
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: SHIPPING METHOD ── */}
      {step === 3 && (
        <div className="space-y-4">
          {/* Order items summary */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-3">Your Items ({ORDER_ITEMS.length})</h2>
            <div className="space-y-3">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.variant} · Qty: {item.qty}</p>
                  </div>
                  <span className="text-xs font-bold text-foreground">${item.price.toLocaleString("en", { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping options */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-3">Choose Shipping Method</h2>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = shippingId === opt.id;
                return (
                  <button key={opt.id} onClick={() => setShippingId(opt.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
                      ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-primary" : "border-muted-foreground"}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-foreground">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground">{opt.detail}</p>
                    </div>
                    <span className={`text-sm font-black ${opt.price === 0 ? "text-green-600" : "text-foreground"}`}>
                      {opt.price === 0 ? "Free" : `+$${opt.price.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-3">Order Summary</h2>
            <div className="space-y-1.5 text-xs">
              {[
                ["Subtotal", `$${SUBTOTAL.toLocaleString("en", { minimumFractionDigits: 2 })}`],
                ["Shipping", shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`],
                ["Discount", `-$${DISCOUNT.toFixed(2)}`],
                ["Tax", `$${TAX.toFixed(2)}`],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-muted-foreground">{l}</span>
                  <span className={`font-semibold ${l === "Discount" ? "text-red-500" : "text-foreground"}`}>{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-primary/20">
                <span className="font-black text-foreground">Total</span>
                <span className="font-black text-primary text-base">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button onClick={() => setStep(4)}
            className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all">
            Continue to Payment <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={() => setStep(2)} className="w-full text-xs text-muted-foreground text-center hover:text-primary transition-colors">
            ← Back to Address
          </button>
        </div>
      )}

      {/* ── STEP 4: PAYMENT ── */}
      {step === 4 && (
        <div className="space-y-4">
          {/* Choose payment method */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-3">Choose Payment Method</h2>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                const isSelected = payMethod === m.id;
                return (
                  <button key={m.id} onClick={() => setPayMethod(m.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
                      ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-primary" : "border-muted-foreground"}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground">{m.label}</p>
                      <p className="text-[10px] text-muted-foreground">{m.sub}</p>
                    </div>
                    {m.logos && <div className="flex-shrink-0">{m.logos}</div>}
                    {!m.logos && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card form */}
          {payMethod === "card" && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <p className="text-sm font-bold text-foreground">Card Details</p>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Card Number</label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 bg-background">
                  <input value={cardNum} onChange={(e) => setCardNum(e.target.value)} placeholder="1234 1234 1234 1234"
                    className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Expiry</label>
                  <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM / YY"
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">CVV</label>
                  <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" type="password"
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Cardholder Name</label>
                <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground" />
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-semibold text-foreground">Save card for future payments</span>
                <button onClick={() => setSaveCard(!saveCard)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${saveCard ? "bg-primary" : "bg-muted"}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-1 transition-transform ${saveCard ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
              <button onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all mt-2">
                <Lock className="w-4 h-4" /> Place Order — ${total.toFixed(2)}
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                By placing your order, you agree to our <Link href="/terms"><span className="text-primary underline cursor-pointer">Terms</span></Link>
              </p>
            </div>
          )}

          {/* Mobile money form */}
          {payMethod === "mobile" && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <p className="text-sm font-bold text-foreground">Mobile Money Details</p>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Provider</label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                  <div className="bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0">MTN</div>
                  <select value={mmProvider} onChange={(e) => setMmProvider(e.target.value)}
                    className="flex-1 text-sm text-foreground outline-none bg-transparent">
                    <option>MTN Mobile Money</option>
                    <option>Airtel Money</option>
                    <option>Zamtel Money</option>
                    <option>M-Pesa</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Mobile Money Number</label>
                <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                  <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <input value={mmPhone} onChange={(e) => setMmPhone(e.target.value)} placeholder="+260 97 123 4567" type="tel"
                    className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground bg-muted/40 rounded-xl px-3 py-2.5">
                A payment prompt will be sent to your phone. Approve it to confirm your order.
              </p>
              <button onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all">
                <Send className="w-4 h-4" /> Place Order — ${total.toFixed(2)}
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                By placing your order, you agree to our <Link href="/terms"><span className="text-primary underline cursor-pointer">Terms</span></Link>
              </p>
            </div>
          )}

          {/* Bank Transfer */}
          {payMethod === "bank" && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <p className="text-sm font-bold text-foreground">Bank Transfer Details</p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-[11px] text-muted-foreground space-y-1">
                <p className="text-yellow-600 font-semibold">⏳ Manual Confirmation Required</p>
                <p>Your order will be placed as pending. We confirm once we verify your transfer.</p>
              </div>
              {[
                { label: "Bank Name", val: "Stanbic Bank Zambia" },
                { label: "Account Name", val: "KRYROS LIMITED" },
                { label: "Account Number", val: "91200013456" },
                { label: "Amount to Send", val: `$${total.toFixed(2)}` },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                    <p className="text-xs font-bold text-foreground">{val}</p>
                  </div>
                  <CopyBtn text={val} />
                </div>
              ))}
              <button onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all">
                <Check className="w-4 h-4" /> Place Order (Pending Payment)
              </button>
            </div>
          )}

          {/* WhatsApp */}
          {payMethod === "whatsapp" && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-[11px] text-muted-foreground space-y-1">
                <p className="text-yellow-600 font-semibold">⏳ Manual Confirmation Required</p>
                <p>We'll contact you on WhatsApp to confirm payment before processing your order.</p>
              </div>
              <div className="bg-muted/40 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total to Pay</span>
                  <span className="font-black text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 active:scale-95 transition-all">
                <MessageCircle className="w-4 h-4" /> Place Order via WhatsApp
              </button>
            </div>
          )}

          {/* Apple Pay */}
          {payMethod === "apple" && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <button onClick={handlePlaceOrder}
                className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "#000", color: "#fff" }}>
                 Buy with Apple Pay — ${total.toFixed(2)}
              </button>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure &bull; Fast &bull; Encrypted
              </p>
            </div>
          )}

          {/* Google Pay */}
          {payMethod === "google" && (
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <button onClick={handlePlaceOrder}
                className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "#fff", color: "#000", border: "1px solid #ddd" }}>
                <span className="font-black text-lg">
                  <span className="text-blue-500">G</span><span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span><span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span><span className="text-red-500">e</span>
                </span>
                &nbsp;Pay — ${total.toFixed(2)}
              </button>
              <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Secure &bull; Fast &bull; Encrypted
              </p>
            </div>
          )}

          <button onClick={() => setStep(3)} className="w-full text-xs text-muted-foreground text-center hover:text-primary transition-colors">
            ← Back to Shipping
          </button>
        </div>
      )}
    </div>
  );
}
