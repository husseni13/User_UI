import { useState } from "react";
import { Link } from "wouter";
import {
  CreditCard, Smartphone, Building2, MessageCircle, Lock, Check,
  ChevronDown, Download, Headphones
} from "lucide-react";

type Screen = "main" | "success";

const AMOUNT = 250;
const FEE = 2.50;
const TOTAL = AMOUNT + FEE;

const METHODS = [
  {
    id: "card", label: "Card Payment", sub: "Visa, Mastercard & more", icon: CreditCard,
    logos: (
      <div className="flex items-center gap-1">
        <div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">VISA</div>
        <div className="w-6 h-4 rounded-sm overflow-hidden flex"><div className="flex-1 bg-red-500" /><div className="flex-1 bg-yellow-400" /></div>
      </div>
    ),
  },
  {
    id: "mobile", label: "Mobile Money", sub: "MTN, Airtel, Zamtel", icon: Smartphone,
    logos: (
      <div className="flex items-center gap-1">
        <div className="bg-yellow-400 text-black text-[7px] font-black px-1 py-0.5 rounded">MTN</div>
        <div className="bg-red-500 text-white text-[7px] font-black px-1 py-0.5 rounded">A</div>
        <div className="bg-red-700 text-white text-[7px] font-black px-1 py-0.5 rounded">Z</div>
      </div>
    ),
  },
  { id: "bank", label: "Bank Transfer", sub: "Local & International", icon: Building2, logos: null },
  { id: "whatsapp", label: "WhatsApp Payment", sub: "Pay securely on WhatsApp", icon: MessageCircle, logos: null },
  {
    id: "apple", label: "Apple Pay", sub: "Pay with Apple Pay", icon: Lock,
    logos: <span className="text-sm font-black text-foreground"> Pay</span>,
  },
  {
    id: "google", label: "Google Pay", sub: "Pay with Google Pay", icon: Check,
    logos: <span className="text-xs font-bold text-blue-500">G Pay</span>,
  },
  {
    id: "crypto", label: "Crypto Payment", sub: "Pay with USDT, BTC & more", icon: Smartphone,
    logos: <span className="text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Coming Soon</span>,
  },
];

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

export default function PayPage() {
  const [method, setMethod] = useState("card");
  const [screen, setScreen] = useState<Screen>("main");

  // Card fields
  const [cardName, setCardName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // Mobile money fields
  const [country, setCountry] = useState("Zambia (+260)");
  const [provider, setProvider] = useState("MTN Mobile Money");
  const [phone, setPhone] = useState("+260 97 123 4567");

  const handlePay = () => setScreen("success");

  if (screen === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, #07392f 0%, #0a5544 100%)" }}>
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-400/20 border-4 border-green-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl font-black text-white mb-1">Payment Successful!</h2>
              <p className="text-white/60 text-sm mb-6">Your payment has been processed successfully.</p>
              <div className="bg-white/10 rounded-2xl p-4 text-left space-y-2.5 mb-6">
                {[
                  ["Reference ID", "PAY-2024-00123345"],
                  ["Amount Paid", `$${TOTAL.toFixed(2)}`],
                  ["Payment Method", METHODS.find((m) => m.id === method)?.label || "Card Payment"],
                  ["Date", "20 May 2024, 09:41 AM"],
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
              <Link href="/">
                <button className="w-full py-3.5 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-colors">
                  Back to Home
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
        <h1 className="text-2xl font-black text-foreground">Make a Payment</h1>
        <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
          <Lock className="w-3.5 h-3.5" /> Secure Payment
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-5">Choose how you'd like to pay KRYROS</p>

      {/* Payment Amount */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-foreground">Payment Amount</p>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground border border-border rounded-xl px-2.5 py-1.5">
            <div
              className="w-4 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundImage: "linear-gradient(#B22234 0%, #B22234 33%, #fff 33%, #fff 66%, #3C3B6E 66%)" }}
            />
            USD <ChevronDown className="w-3 h-3" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-muted-foreground">$</span>
          <span className="text-5xl font-black text-foreground">{AMOUNT.toFixed(2)}</span>
        </div>
      </div>

      {/* Choose Payment Method */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-3">
        <p className="text-sm font-bold text-foreground mb-3">Choose Payment Method</p>
        <div className="space-y-2">
          {METHODS.map((m) => {
            const Icon = m.icon;
            const isSelected = method === m.id;
            const isComing = m.id === "crypto";
            return (
              <button
                key={m.id}
                onClick={() => !isComing && setMethod(m.id)}
                disabled={isComing}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
                  ${isSelected ? "border-primary bg-primary/5" : isComing ? "border-border opacity-60" : "border-border hover:border-primary/30"}`}
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Payment Form */}
      {method === "card" && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-bold text-foreground">Card Details</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">VISA</div>
              <div className="w-6 h-4 rounded-sm overflow-hidden flex"><div className="flex-1 bg-red-500" /><div className="flex-1 bg-yellow-400" /></div>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Cardholder Name</label>
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Card Number</label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/30 bg-background">
              <input
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="flex-1 text-sm text-foreground outline-none bg-transparent"
              />
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Expiry Date</label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM / YY"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">CVV</label>
              <input
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                type="password"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-background text-foreground"
              />
            </div>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-semibold text-foreground">Save card for future payments</span>
            <button
              onClick={() => setSaveCard(!saveCard)}
              className={`w-11 h-6 rounded-full transition-colors relative ${saveCard ? "bg-primary" : "bg-muted"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow absolute top-1 transition-transform ${saveCard ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Money Form */}
      {method === "mobile" && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground">Mobile Money Details</p>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Country</label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
              <span className="text-base">🇿🇲</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex-1 text-sm text-foreground outline-none bg-transparent"
              >
                <option>Zambia (+260)</option>
                <option>Ghana (+233)</option>
                <option>Kenya (+254)</option>
                <option>Nigeria (+234)</option>
                <option>Uganda (+256)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-muted-foreground mb-1.5">Mobile Money Provider</label>
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 bg-background focus-within:ring-2 focus-within:ring-primary/30">
              <div className="bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0">MTN</div>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="flex-1 text-sm text-foreground outline-none bg-transparent"
              >
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
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+260 97 123 4567"
                className="flex-1 text-sm text-foreground outline-none bg-transparent"
              />
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground bg-muted/40 rounded-xl px-3 py-2.5">
            You will receive a payment prompt on your mobile phone to confirm.
          </p>
        </div>
      )}

      {/* Bank Transfer */}
      {method === "bank" && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground">Bank Transfer Details</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-[11px] text-muted-foreground space-y-1">
            <p>• Transfer the exact amount shown below</p>
            <p>• Use your Payment Reference as payment note</p>
            <p>• Upload proof of payment after transferring</p>
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
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground mb-2">Upload Payment Proof</p>
            <label className="block border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/40 transition-colors">
              <Download className="w-5 h-5 text-muted-foreground mx-auto mb-1 rotate-180" />
              <p className="text-xs font-semibold text-foreground">Choose File or Drag & Drop</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, PDF up to 5MB</p>
              <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.pdf" />
            </label>
          </div>
        </div>
      )}

      {/* WhatsApp */}
      {method === "whatsapp" && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm font-bold text-foreground">WhatsApp Payment</p>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            We'll send your payment details via WhatsApp and guide you through the process.
          </p>
          <div className="bg-muted/40 rounded-xl p-3 space-y-1.5 text-xs">
            {[["Amount", `$${AMOUNT.toFixed(2)}`], ["Processing Fee", `$${FEE.toFixed(2)}`], ["Total", `$${TOTAL.toFixed(2)}`]].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-muted-foreground">{l}</span>
                <span className={`font-bold ${l === "Total" ? "text-primary" : "text-foreground"}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apple / Google Pay */}
      {(method === "apple" || method === "google") && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
          <button
            className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            onClick={handlePay}
            style={{
              background: method === "apple" ? "#000" : "#fff",
              color: method === "apple" ? "#fff" : "#000",
              border: method === "google" ? "1px solid #ddd" : "none",
            }}
          >
            {method === "apple" ? " Buy with Apple Pay" : "Buy with Google Pay"}
          </button>
          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
            <Lock className="w-3 h-3" /> Secure &bull; Fast &bull; Encrypted
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Total Payable <strong className="text-foreground">${TOTAL.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-3">
        <p className="text-sm font-bold text-foreground mb-3">Payment Summary</p>
        <div className="space-y-2">
          {[["Amount", `$${AMOUNT.toFixed(2)}`], ["Processing Fee", `$${FEE.toFixed(2)}`]].map(([l, v]) => (
            <div key={l} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{l}</span>
              <span className="text-foreground font-semibold">{v}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-primary/20">
            <span className="text-sm font-black text-foreground">Total Payable</span>
            <span className="text-sm font-black text-primary">${TOTAL.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
          <Lock className="w-3 h-3" /> Your payment is secure and encrypted
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Headphones className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Need Help?</p>
            <p className="text-[10px] text-muted-foreground">Contact our support team if you face any issues.</p>
          </div>
        </div>
      </div>

      {/* ── FIXED BOTTOM CTA — sits above the mobile nav ── */}
      <div className="fixed bottom-24 md:bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border px-4 py-3 z-50">
        <div className="max-w-lg mx-auto space-y-2">
          {method === "bank" && (
            <button
              onClick={handlePay}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Check className="w-4 h-4" /> I Have Made the Transfer
            </button>
          )}
          {method === "whatsapp" && (
            <button
              onClick={handlePay}
              className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
            </button>
          )}
          {method === "apple" && (
            <button
              onClick={handlePay}
              className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "#000", color: "#fff" }}
            >
               Pay ${TOTAL.toFixed(2)}
            </button>
          )}
          {method === "google" && (
            <button
              onClick={handlePay}
              className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "#fff", color: "#000", border: "1px solid #ddd" }}
            >
              <span className="font-black">
                <span className="text-blue-500">G</span><span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span><span className="text-blue-500">g</span>
                <span className="text-green-500">l</span><span className="text-red-500">e</span>
              </span>
              &nbsp;Pay ${TOTAL.toFixed(2)}
            </button>
          )}
          {method === "card" && (
            <button
              onClick={handlePay}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Lock className="w-4 h-4" /> Pay with KRYROS — ${TOTAL.toFixed(2)}
            </button>
          )}
          {method === "mobile" && (
            <button
              onClick={handlePay}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Smartphone className="w-4 h-4" /> Pay with KRYROS — ${TOTAL.toFixed(2)}
            </button>
          )}
          {method === "crypto" && (
            <button
              disabled
              className="w-full py-4 bg-muted text-muted-foreground rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
            >
              Coming Soon
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
