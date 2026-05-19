export default function RefundPage() {
  const sections = [
    { title: "Eligibility for Returns", content: "Items are eligible for return within 30 days of the delivery date. To be eligible, your item must be unused and in the same condition that you received it. It must also be in the original packaging." },
    { title: "Non-Returnable Items", content: "Several types of goods are exempt from being returned, including perishable goods, intimate or sanitary goods, hazardous materials, flammable liquids or gases, downloadable software products, and gift cards." },
    { title: "Return Process", content: "To initiate a return, contact our customer service team with your order number and reason for return. Our team will provide you with a Return Merchandise Authorization (RMA) number and instructions for shipping your item back." },
    { title: "Refund Processing", content: "Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days." },
    { title: "Late or Missing Refunds", content: "If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, as it may take some time before your refund is officially posted. If you've done all of this and you still have not received your refund, please contact us." },
    { title: "Exchanges", content: "We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact our customer service team and we will arrange the exchange." },
    { title: "Shipping Costs", content: "You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-12">
      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">Refund Policy</h1>
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
