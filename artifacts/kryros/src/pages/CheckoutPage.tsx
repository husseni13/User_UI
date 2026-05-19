import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Check, ChevronRight, CreditCard, Smartphone, Building2, MessageCircle,
  MapPin, Truck, Lock, Edit2, ShoppingBag
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";

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
    logos: <span className="text-xs font-bold text-foreground">G Pay</span>,
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

const STATUS_COLORS: Record<string, string> = {
  "In Transit": "bg-primary/10 text-primary",
};

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("card");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("John Doe");
  const [saveCard, setSaveCard] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [, navigate] = useLocation();

  const handlePlaceOrder = () => setOrdered(true);

  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
        <div className="w-full max-w-sm">
          {/* Success card */}
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, #07392f 0%, #0a5544 100%)" }}>
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-400/20 border-4 border-green-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-black text-white mb-1">Order Placed Successfully!</h2>
              <p className="text-white/60 text-sm mb-6">Thank you, John! Your order has been placed.</p>
              <div className="bg-white/10 rounded-2xl p-4 text-left space-y-2.5 mb-6">
                {[
                  ["Order ID", "KRY-2024-00012345"],
                  ["Order Date", "20 May 2024, 09:41 AM"],
                  ["Total Paid", `$${TOTAL.toFixed(2)}`],
                  ["Payment Method", PAYMENT_METHODS.find(m => m.id === payMethod)?.label || "Card Payment"],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">{label}</span>
                    <span className="text-white text-xs font-bold">{val}</span>
                  </div>
                ))}
              </div>
              <Link href="/track">
                <button className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm mb-2.5 hover:bg-primary/90 transition-colors">
                  Track Order
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
    <div className="max-w-lg mx-auto px-4 py-5 pb-28 min-h-screen">
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
              <button className="text-xs text-primary font-semibold">Change</button>
            </div>
            <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">+233 24 123 4567</p>
                <p className="text-xs text-muted-foreground">123 KRYROS Street, Accra, Greater Accra</p>
                <p className="text-xs text-muted-foreground">Ghana, 00233</p>
                <div className="mt-2">
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-xl flex items-center gap-1 w-fit">
                    <Check className="w-2.5 h-2.5" /> Default Address
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery estimate */}
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Get it by 20 - 23 May</p>
                <p className="text-xs text-green-600 font-semibold">Standard Delivery (Free)</p>
              </div>
            </div>
            <button className="text-xs text-primary font-semibold">Change</button>
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
                  <span className="text-sm font-bold text-foreground flex-shrink-0">${item.price.toLocaleString("en", { minimumFractionDigits: 2 })}</span>
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
                  <button key={m.id} onClick={() => setPayMethod(m.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
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

      {/* ── STEP 2: PAYMENT ── */}
      {step === 2 && (
        <div className="space-y-3">
          {/* Selected method header */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{PAYMENT_METHODS.find(m => m.id === payMethod)?.label}</p>
                </div>
              </div>
              {payMethod === "card" && (
                <div className="flex items-center gap-1">
                  <div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">VISA</div>
                  <div className="w-6 h-4 rounded-sm overflow-hidden flex"><div className="flex-1 bg-red-500" /><div className="flex-1 bg-yellow-400" /></div>
                </div>
              )}
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
                    <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123"
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
                  <select className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground">
                    <option>🇿🇲 Zambia (+260)</option>
                    <option>🇬🇭 Ghana (+233)</option>
                    <option>🇰🇪 Kenya (+254)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Provider</label>
                  <select className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground">
                    <option>MTN Mobile Money</option>
                    <option>Airtel Money</option>
                    <option>Zamtel Money</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Phone Number</label>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5">
                    <input placeholder="+260 97 123 4567" className="flex-1 text-sm text-foreground outline-none bg-transparent" />
                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}

            {(payMethod === "apple" || payMethod === "google") && (
              <div className="space-y-3">
                <button className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  style={{ background: payMethod === "apple" ? "#000" : "#fff", color: payMethod === "apple" ? "#fff" : "#000", border: payMethod === "google" ? "1px solid #ddd" : "none" }}>
                  {payMethod === "apple" ? " Buy with Apple Pay" : "Buy with Google Pay"}
                </button>
                <p className="text-[10px] text-center text-muted-foreground">Secure • Fast • Encrypted</p>
                <p className="text-xs text-center text-muted-foreground">Total Payable <strong>${TOTAL.toFixed(2)}</strong></p>
              </div>
            )}
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
            {/* Delivery Address summary */}
            <div className="mb-4">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Delivery Address</p>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-foreground">John Doe</p>
                  <p className="text-[11px] text-muted-foreground">+233 24 123 4567</p>
                  <p className="text-[11px] text-muted-foreground">123 KRYROS Street, Accra, Greater Accra, Ghana, 00233</p>
                </div>
              </div>
            </div>
            {/* Items */}
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
            {/* Totals */}
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

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border px-4 py-3 z-30">
        <div className="max-w-lg mx-auto space-y-2">
          {step === 1 && (
            <button onClick={() => setStep(2)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Lock className="w-4 h-4" /> Continue to Payment
            </button>
          )}
          {step === 2 && (
            <button onClick={() => setStep(3)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Lock className="w-4 h-4" /> {payMethod === "card" ? `Pay $${TOTAL.toFixed(2)}` : "Continue to Review"} →
            </button>
          )}
          {step === 3 && (
            <button onClick={handlePlaceOrder}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Lock className="w-4 h-4" /> Place Order — ${TOTAL.toFixed(2)}
            </button>
          )}
          <p className="text-[10px] text-center text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms"><span className="text-primary underline cursor-pointer">Terms of Service</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}
