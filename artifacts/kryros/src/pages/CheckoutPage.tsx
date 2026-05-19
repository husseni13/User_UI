import { useState } from "react";
import { Link } from "wouter";
import {
  Check, CreditCard, Smartphone, Building2, MessageCircle,
  MapPin, Truck, Lock, Edit2, ChevronRight, Download,
  User, Phone, Globe, Home
} from "lucide-react";

const STEPS = ["Cart", "Address", "Payment", "Review"];

const PAYMENT_METHODS = [
  {
    id: "card", label: "Card Payment", sub: "Visa, Mastercard & more",
    icon: CreditCard,
    logos: (
      <div className="flex items-center gap-1">
        <div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">VISA</div>
        <div className="w-6 h-4 rounded-sm overflow-hidden flex">
          <div className="flex-1 bg-red-500" /><div className="flex-1 bg-yellow-400" />
        </div>
      </div>
    ),
  },
  {
    id: "mobile", label: "Mobile Money", sub: "MTN, Airtel, Zamtel",
    icon: Smartphone,
    logos: (
      <div className="flex items-center gap-1">
        <div className="bg-yellow-400 text-black text-[7px] font-black px-1 py-0.5 rounded">MTN</div>
        <div className="bg-red-500 text-white text-[7px] font-black px-1 py-0.5 rounded">A</div>
        <div className="bg-red-700 text-white text-[7px] font-black px-1 py-0.5 rounded">Z</div>
      </div>
    ),
  },
  {
    id: "bank", label: "Bank Transfer", sub: "Local & International",
    icon: Building2, logos: null,
  },
  {
    id: "whatsapp", label: "WhatsApp Pay", sub: "Pay securely on WhatsApp",
    icon: MessageCircle, logos: null,
  },
  {
    id: "apple", label: "Apple Pay", sub: "Pay with Apple Pay",
    icon: () => <span className="text-base font-black"></span>,
    logos: <span className="text-sm font-black text-foreground"> Pay</span>,
  },
  {
    id: "google", label: "Google Pay", sub: "Pay with Google Pay",
    icon: () => <span className="text-base font-bold text-blue-500">G</span>,
    logos: <span className="text-xs font-bold text-blue-500">G Pay</span>,
  },
];

const ORDER_ITEMS = [
  {
    id: "i1",
    name: "iPhone 15 Pro Max 256GB",
    variant: "Natural Titanium",
    qty: 1,
    price: 1199.00,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&q=80",
  },
  {
    id: "i2",
    name: "AirPods Pro 2 (USB-C)",
    variant: "White",
    qty: 1,
    price: 249.00,
    image: "https://images.unsplash.com/photo-1606741965234-b2b9b2b1c0b5?w=100&q=80",
  },
];

const SUBTOTAL = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const DISCOUNT = 100;
const TAX = 80.88;
const TOTAL = SUBTOTAL - DISCOUNT + TAX;

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex items-center gap-1 text-[10px] text-primary font-semibold border border-primary/30 px-2 py-1 rounded-lg hover:bg-primary/5 transition-colors"
    >
      {copied ? <Check className="w-3 h-3" /> : null} {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("card");

  // Address state
  const [editingAddress, setEditingAddress] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("Ghana");
  const [zipCode, setZipCode] = useState("");

  // Card state
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // Mobile money state
  const [mmCountry, setMmCountry] = useState("Zambia (+260)");
  const [mmProvider, setMmProvider] = useState("MTN Mobile Money");
  const [mmPhone, setMmPhone] = useState("");

  const [ordered, setOrdered] = useState(false);

  const hasAddress = fullName && phone && addressLine && city && country;

  const handlePlaceOrder = () => setOrdered(true);

  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
        <div className="w-full max-w-sm">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, #07392f 0%, #0a5544 100%)" }}>
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-400/20 border-4 border-green-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-black text-white mb-1">Order Placed Successfully!</h2>
              <p className="text-white/60 text-sm mb-6">Thank you{fullName ? `, ${fullName.split(" ")[0]}` : ""}! Your order is confirmed.</p>
              <div className="bg-white/10 rounded-2xl p-4 text-left space-y-2.5 mb-6">
                {[
                  ["Order ID", "KRY-2024-00012345"],
                  ["Order Date", "20 May 2024, 09:41 AM"],
                  ["Total Paid", `$${TOTAL.toFixed(2)}`],
                  ["Payment Method", PAYMENT_METHODS.find((m) => m.id === payMethod)?.label || "Card Payment"],
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

  return (
    <div className="max-w-lg mx-auto px-4 py-5 pb-52 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-black text-foreground">Checkout</h1>
        <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
          <Lock className="w-3.5 h-3.5" /> Secure Checkout
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-5">Complete your order securely</p>

      {/* Step indicator */}
      <div className="flex items-center mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2
                ${i < step ? "bg-primary border-primary text-white"
                  : i === step ? "bg-primary border-primary text-white ring-4 ring-primary/20"
                  : "bg-background border-border text-muted-foreground"}`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1 font-bold ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 -mt-4 transition-all ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: ADDRESS ── */}
      {step === 1 && (
        <div className="space-y-3">
          {/* Delivery Address */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground">Delivery Address</h2>
              {hasAddress && !editingAddress && (
                <button
                  onClick={() => setEditingAddress(true)}
                  className="flex items-center gap-1 text-xs text-primary font-semibold"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              )}
            </div>

            {/* Address Form */}
            {(editingAddress || !hasAddress) && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Full Name</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                    <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="flex-1 text-sm text-foreground outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Phone Number</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+233 24 123 4567"
                      type="tel"
                      className="flex-1 text-sm text-foreground outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Street Address</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                    <Home className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <input
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="123 Main Street"
                      className="flex-1 text-sm text-foreground outline-none bg-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">City</label>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Accra"
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Region / State</label>
                    <input
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Greater Accra"
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Country</label>
                    <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="flex-1 text-sm text-foreground outline-none bg-transparent"
                      >
                        <option>Ghana</option>
                        <option>Nigeria</option>
                        <option>Kenya</option>
                        <option>Zambia</option>
                        <option>Uganda</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Postal Code</label>
                    <input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="00233"
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground"
                    />
                  </div>
                </div>
                {hasAddress && (
                  <button
                    onClick={() => setEditingAddress(false)}
                    className="w-full py-2.5 border border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary/5 transition-colors"
                  >
                    Save Address
                  </button>
                )}
              </div>
            )}

            {/* Address Preview (when saved) */}
            {hasAddress && !editingAddress && (
              <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{fullName}</p>
                  <p className="text-xs text-muted-foreground">{phone}</p>
                  <p className="text-xs text-muted-foreground">{addressLine}, {city}{region ? `, ${region}` : ""}</p>
                  <p className="text-xs text-muted-foreground">{country}{zipCode ? ` ${zipCode}` : ""}</p>
                  <div className="mt-2">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-xl flex items-center gap-1 w-fit">
                      <Check className="w-2.5 h-2.5" /> Delivery Address Set
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery estimate */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Estimated Delivery</p>
                <p className="text-xs text-green-600 font-semibold">Standard Delivery — Free (5–10 business days)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Order Items */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground">Order Items ({ORDER_ITEMS.length})</h2>
              <Link href="/cart"><span className="text-xs text-primary font-semibold">Edit Cart</span></Link>
            </div>
            <div className="space-y-3">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.variant}</p>
                    <p className="text-[10px] text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground flex-shrink-0">
                    ${item.price.toLocaleString("en", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-3">Order Summary</h2>
            <div className="space-y-2">
              {[
                ["Subtotal", `$${SUBTOTAL.toLocaleString("en", { minimumFractionDigits: 2 })}`, false],
                ["Shipping", "Free", false],
                ["Discount", `-$${DISCOUNT.toFixed(2)}`, true],
                ["Tax", `$${TAX.toFixed(2)}`, false],
              ].map(([label, val, isDis]) => (
                <div key={label as string} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className={`text-xs font-semibold ${isDis ? "text-red-500" : "text-foreground"}`}>{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm font-black text-foreground">Total</span>
                <span className="text-xl font-black text-primary">${TOTAL.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Choose Payment Method */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-3">Choose Payment Method</h2>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                const isSelected = payMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
                      ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                  >
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
        </div>
      )}

      {/* ── STEP 2: PAYMENT DETAILS ── */}
      {step === 2 && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-bold text-foreground">
                {PAYMENT_METHODS.find((m) => m.id === payMethod)?.label}
              </p>
            </div>

            {payMethod === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Card Number</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 bg-background">
                    <input value={cardNum} onChange={(e) => setCardNum(e.target.value)} placeholder="1234 1234 1234 1234"
                      className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                    <CreditCard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Expiry Date</label>
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
              </div>
            )}

            {payMethod === "mobile" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Country</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                    <span className="text-base">🇿🇲</span>
                    <select value={mmCountry} onChange={(e) => setMmCountry(e.target.value)}
                      className="flex-1 text-sm text-foreground outline-none bg-transparent">
                      <option>Zambia (+260)</option>
                      <option>Ghana (+233)</option>
                      <option>Kenya (+254)</option>
                      <option>Nigeria (+234)</option>
                    </select>
                  </div>
                </div>
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
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Phone Number</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
                    <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <input value={mmPhone} onChange={(e) => setMmPhone(e.target.value)} placeholder="+260 97 123 4567"
                      className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground bg-muted/40 rounded-xl px-3 py-2.5">
                  You will receive a payment prompt on your phone to confirm this payment.
                </p>
              </div>
            )}

            {payMethod === "bank" && (
              <div className="space-y-3">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-[11px] text-muted-foreground space-y-1">
                  <p>• Transfer the exact amount to the account below</p>
                  <p>• Use your Order ID as payment reference</p>
                </div>
                {[
                  { label: "Bank Name", val: "Stanbic Bank Zambia" },
                  { label: "Account Name", val: "KRYROS LIMITED" },
                  { label: "Account Number", val: "91200013456" },
                  { label: "SWIFT Code", val: "SBICZM XXXX" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                      <p className="text-xs font-bold text-foreground">{val}</p>
                    </div>
                    <CopyBtn text={val} />
                  </div>
                ))}
              </div>
            )}

            {payMethod === "whatsapp" && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Tap continue below and we'll guide you through the payment on WhatsApp.
                </p>
                <div className="bg-muted/40 rounded-xl p-3 space-y-1.5 text-xs">
                  {[["Total to Pay", `$${TOTAL.toFixed(2)}`]].map(([l, v]) => (
                    <div key={l} className="flex justify-between">
                      <span className="text-muted-foreground">{l}</span>
                      <span className="font-bold text-primary">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(payMethod === "apple" || payMethod === "google") && (
              <div className="space-y-3">
                <button
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  style={{
                    background: payMethod === "apple" ? "#000" : "#fff",
                    color: payMethod === "apple" ? "#fff" : "#000",
                    border: payMethod === "google" ? "1px solid #ddd" : "none",
                  }}
                >
                  {payMethod === "apple" ? " Buy with Apple Pay" : "Buy with Google Pay"}
                </button>
                <p className="text-[10px] text-center text-muted-foreground">Secure • Fast • Encrypted</p>
                <p className="text-xs text-center text-muted-foreground">Total Payable <strong className="text-foreground">${TOTAL.toFixed(2)}</strong></p>
              </div>
            )}
          </div>

          {/* Order total reminder */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-foreground">Total to Pay</span>
              <span className="text-xl font-black text-primary">${TOTAL.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-muted-foreground">
              <Lock className="w-3 h-3" /> Your payment is secure and encrypted
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: REVIEW ── */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground">Order Review</h2>
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs text-primary font-semibold">
                <Edit2 className="w-3 h-3" /> Edit
              </button>
            </div>
            <div className="mb-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Delivery Address</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">{fullName || "—"}</p>
                  <p className="text-[11px] text-muted-foreground">{phone || "—"}</p>
                  <p className="text-[11px] text-muted-foreground">{[addressLine, city, region, country, zipCode].filter(Boolean).join(", ")}</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Payment Method</p>
              <p className="text-xs font-semibold text-foreground">{PAYMENT_METHODS.find((m) => m.id === payMethod)?.label}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Items ({ORDER_ITEMS.length})</p>
              <div className="space-y-2.5">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <span className="text-xs font-bold text-foreground">${item.price.toLocaleString("en", { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border space-y-1.5">
              {[["Subtotal", `$${SUBTOTAL.toFixed(2)}`], ["Shipping", "Free"], ["Discount", `-$${DISCOUNT.toFixed(2)}`], ["Tax", `$${TAX.toFixed(2)}`]].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-xs text-muted-foreground">{l}</span>
                  <span className={`text-xs font-semibold ${l === "Discount" ? "text-red-500" : "text-foreground"}`}>{v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-sm font-black text-foreground">Total</span>
                <span className="text-lg font-black text-primary">${TOTAL.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FIXED BOTTOM — sits above mobile nav ── */}
      <div className="fixed bottom-24 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border px-4 py-3 z-50">
        <div className="max-w-lg mx-auto space-y-2">
          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              disabled={!hasAddress}
              className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors
                ${hasAddress ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
            >
              <Lock className="w-4 h-4" />
              {hasAddress ? "Continue to Payment" : "Please fill in your delivery address"}
            </button>
          )}
          {step === 2 && payMethod === "card" && (
            <button onClick={() => setStep(3)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Lock className="w-4 h-4" /> Review Order →
            </button>
          )}
          {step === 2 && payMethod === "mobile" && (
            <button onClick={() => setStep(3)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Smartphone className="w-4 h-4" /> Continue to Review →
            </button>
          )}
          {step === 2 && payMethod === "bank" && (
            <button onClick={() => setStep(3)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Lock className="w-4 h-4" /> Continue to Review →
            </button>
          )}
          {step === 2 && payMethod === "whatsapp" && (
            <button onClick={handlePlaceOrder}
              className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
              <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
            </button>
          )}
          {step === 2 && payMethod === "apple" && (
            <button onClick={handlePlaceOrder}
              className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "#000", color: "#fff" }}>
               Pay ${TOTAL.toFixed(2)}
            </button>
          )}
          {step === 2 && payMethod === "google" && (
            <button onClick={handlePlaceOrder}
              className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "#fff", color: "#000", border: "1px solid #ddd" }}>
              <span className="font-black">
                <span className="text-blue-500">G</span><span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span><span className="text-blue-500">g</span>
                <span className="text-green-500">l</span><span className="text-red-500">e</span>
              </span>
              &nbsp;Pay ${TOTAL.toFixed(2)}
            </button>
          )}
          {step === 3 && (
            <button onClick={handlePlaceOrder}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Lock className="w-4 h-4" /> Place Order — ${TOTAL.toFixed(2)}
            </button>
          )}
          <p className="text-[10px] text-center text-muted-foreground">
            By placing your order, you agree to our{" "}
            <Link href="/terms"><span className="text-primary underline cursor-pointer">Terms of Service</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}
