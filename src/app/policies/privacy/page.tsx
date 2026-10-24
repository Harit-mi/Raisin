export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#F4EFE5] pb-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Privacy & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#77736B] mt-2">
            Last updated: October 2026 · Committed to safeguarding patron confidentiality.
          </p>
        </div>

        <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 text-xs sm:text-sm text-[#1B1915] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">1. Information We Collect</h2>
            <p className="text-[#77736B]">
              When you purchase an artwork, configure a custom piece, or request an architectural consultation, we collect necessary shipping and contact details (name, email address, physical postal address, and contact telephone number). We do NOT store payment card details; all financial transactions are processed securely through certified PCI-DSS compliant gateways like Razorpay.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">2. How Your Information is Used</h2>
            <p className="text-[#77736B]">
              Information is solely utilized to formulate quotations, fulfill crating and insured transit, generate tax invoices, and transmit order status updates. We never sell, lease, or distribute patron details to external marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">3. Contact for Privacy Inquiries</h2>
            <p className="text-[#77736B]">
              For inquiries regarding data retention, order records, or to request deletion of your atelier profile, email our privacy concierge at privacy@drlresindecor.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
