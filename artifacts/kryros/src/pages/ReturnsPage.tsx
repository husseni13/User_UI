export default function ReturnsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5 pb-28">
      <h1 className="text-2xl font-black text-foreground mb-0.5">Returns & Exchanges</h1>
      <p className="text-xs text-muted-foreground mb-5">Hassle-free returns, because we care.</p>

      <div className="space-y-3 mb-5">
        <div className="bg-card border border-border rounded-2xl p-4">
          <h2 className="text-sm font-bold text-foreground mb-2">Return Eligibility</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Items must be returned within 30 days of delivery in original condition and packaging.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <h2 className="text-sm font-bold text-foreground mb-2">How to Return</h2>
          <div className="space-y-2">
            {[
              "Go to My Orders and select the item.",
              "Tap on 'Return / Exchange'.",
              "Follow the instructions and ship the item back.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[9px] font-black text-primary">{i + 1}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <h2 className="text-sm font-bold text-foreground mb-2">Exchange</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Exchanges are subject to product availability. If unavailable, a refund will be issued.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <h2 className="text-sm font-bold text-foreground mb-2">Refund Timeline</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Once returned item is received and inspected, refunds are processed within 5-7 business days.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
        <p className="text-xs text-amber-700 leading-relaxed">
          Some products may not be eligible for returns. Please check product policy before purchase.
        </p>
      </div>
    </div>
  );
}
