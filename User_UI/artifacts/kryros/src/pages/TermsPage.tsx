export default function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing and using the KRYROS platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service." },
    { title: "Use of Service", content: "KRYROS provides an online marketplace for purchasing products. You agree to use the service only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the service." },
    { title: "Account Registration", content: "To access certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information and to update such information to keep it accurate, current, and complete." },
    { title: "Product Information", content: "We strive to ensure all product descriptions, images, and prices are accurate. However, KRYROS does not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free." },
    { title: "Pricing and Payment", content: "All prices are displayed in USD unless otherwise specified. We reserve the right to change prices at any time. Payment must be received before an order is processed and shipped." },
    { title: "Shipping and Delivery", content: "Delivery times are estimates and are not guaranteed. KRYROS is not responsible for delays caused by customs, weather, or other circumstances beyond our control." },
    { title: "Returns and Refunds", content: "Please review our Refund Policy for information about returning products. Returns must be initiated within 30 days of delivery and items must be in their original condition." },
    { title: "Limitation of Liability", content: "KRYROS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill arising from your use of the service." },
    { title: "Changes to Terms", content: "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes your acceptance of the updated terms." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-12">
      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground mb-8">Last Updated: January 1, 2024</p>
      <div className="space-y-6">
        {sections.map((sec, i) => (
          <div key={sec.title} className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground mb-2">
              <span className="text-primary mr-2">{i + 1}.</span>
              {sec.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
