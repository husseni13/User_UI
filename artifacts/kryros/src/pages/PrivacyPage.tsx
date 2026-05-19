export default function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes your name, email address, phone number, shipping address, and payment information. We also automatically collect certain information about your device and how you interact with our services." },
    { title: "How We Use Your Information", content: "We use the information we collect to process transactions and send related information, including purchase confirmations and invoices; provide customer support; send promotional communications, such as information about products and services offered by us; and monitor and analyze trends, usage, and activities in connection with our services." },
    { title: "Information Sharing", content: "We do not share your personal information with third parties except as described in this policy. We may share your information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf." },
    { title: "Data Security", content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. All transmissions between your browser and our servers are encrypted using SSL technology." },
    { title: "Cookies", content: "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." },
    { title: "Your Rights", content: "You have the right to access, update, or delete the information we have on you. You may also have the right to data portability and to object to our processing of your personal data." },
    { title: "Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date." },
    { title: "Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at kryrosmobile@gmail.com or by phone at +260 966 423 719." },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 pb-24 md:pb-12">
      <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">Privacy Policy</h1>
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
