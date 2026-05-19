export default function RefundPage() {
  const sections = [
    { title: "Eligibility", content: "Refunds are available for items returned within 30 days of delivery in original condition." },
    { title: "Non-Refundable Items", content: "Certain items like gift cards, downloadable products, and clearance items are non-refundable." },
    { title: "Refund Process", content: "Once we receive and inspect your return, we will notify you and process your refund within 5-7 business days." },
    { title: "Refund Method", content: "Refunds will be issued to the original payment method used for the purchase." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 pb-28">
      <h1 className="text-2xl font-black text-foreground mb-0.5">Refund Policy</h1>
      <p className="text-xs text-muted-foreground mb-3">Last updated: May 20, 2024</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
        We want you to be 100% satisfied with your purchase. If not, we're here to help.
      </p>

      <div className="space-y-3 mb-5">
        {sections.map((sec, i) => (
          <div key={sec.title} className="bg-card border border-border rounded-2xl p-4">
            <h2 className="text-sm font-bold text-foreground mb-1.5">
              <span className="text-primary mr-1">{i + 1}.</span>{sec.title}
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
        <p className="text-xs font-bold text-foreground mb-0.5">Need Help?</p>
        <p className="text-xs text-muted-foreground">Contact our support team.</p>
      </div>
    </div>
  );
}
