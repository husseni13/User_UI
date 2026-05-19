import { useState } from "react";
import { Link } from "wouter";
import { Check, ChevronRight, CreditCard, Smartphone, Building2, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const steps = ["Delivery", "Shipping", "Payment", "Review"];

const paymentMethods = [
  { id: "card", icon: CreditCard, label: "Card Payment" },
  { id: "mobile", icon: Smartphone, label: "Mobile Money" },
  { id: "bank", icon: Building2, label: "Bank Transfer" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp Payment" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "Zambia" });
  const [shipping, setShipping] = useState("standard");
  const { items } = useCartStore();
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0);
  const shippingCost = shipping === "express" ? 19.99 : (subtotal >= 100 ? 0 : 9.99);
  const total = subtotal + shippingCost;

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 pb-24 md:pb-10">
      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-6">Checkout</h1>

      {/* Progress */}
      <div className="flex items-center mb-8">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < currentStep ? "bg-primary text-white" : i === currentStep ? "bg-primary text-white ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${i < currentStep ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          {currentStep === 0 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-lg font-bold text-foreground mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[["Full Name", "name", "text"], ["Email Address", "email", "email"], ["Phone Number", "phone", "tel"], ["Street Address", "address", "text"], ["City", "city", "text"], ["Country", "country", "text"]].map(([label, field, type]) => (
                  <div key={field} className={field === "address" ? "md:col-span-2" : ""}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                      data-testid={`input-${field}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-lg font-bold text-foreground mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standard Delivery", sub: "3-7 business days", price: subtotal >= 100 ? "Free" : "$9.99" },
                  { id: "express", label: "Express Delivery", sub: "1-3 business days", price: "$19.99" },
                ].map((opt) => (
                  <button key={opt.id} onClick={() => setShipping(opt.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${shipping === opt.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${shipping === opt.id ? "border-primary" : "border-muted-foreground"}`}>
                        {shipping === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.sub}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${opt.price === "Free" ? "text-green-600" : "text-foreground"}`}>{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-lg font-bold text-foreground mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {paymentMethods.map(({ id, icon: Icon, label }) => (
                  <button key={id} onClick={() => setPaymentMethod(id)} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <Icon className={`w-6 h-6 ${paymentMethod === id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-semibold text-center text-foreground">{label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <input type="text" placeholder="Card Number" className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM / YY" className="px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    <input type="text" placeholder="CVV" className="px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <input type="text" placeholder="Cardholder Name" className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h2 className="text-lg font-bold text-foreground mb-4">Order Review</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl bg-muted" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <span className="font-bold text-foreground">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-base font-bold border-t border-border pt-2"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-5">
            {currentStep > 0 && (
              <button onClick={handlePrev} className="flex-1 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all">
                Back
              </button>
            )}
            <button
              onClick={currentStep === steps.length - 1 ? () => {} : handleNext}
              className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Place Order" : <>Next <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
            <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded-lg bg-muted" />
                  <span className="flex-1 text-xs text-muted-foreground truncate">{item.name}</span>
                  <span className="text-xs font-semibold text-foreground">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              {items.length > 3 && <p className="text-xs text-muted-foreground">+{items.length - 3} more items</p>}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="font-semibold">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold border-t border-border pt-2"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
