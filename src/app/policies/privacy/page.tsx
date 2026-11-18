export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#0B0B0A] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#C9A052]/20 pb-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Privacy & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0] mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#94A3B8] mt-2">
            Last updated: October 2026 · Committed to safeguarding patron confidentiality.
          </p>
        </div>

        <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#E2E8F0]">1. Information We Collect</h2>
            <p className="text-[#94A3B8]">
              When you purchase an artwork, configure a custom piece, or request an architectural consultation, we collect necessary shipping and contact details (name, email address, physical postal address, and contact telephone number). We do NOT store payment card details; all financial transactions are processed securely through certified PCI-DSS compliant gateways like Razorpay.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#E2E8F0]">2. How Your Information is Used</h2>
            <p className="text-[#94A3B8]">
              Information is solely utilized to formulate quotations, fulfill crating and insured transit, generate tax invoices, and transmit order status updates. We never sell, lease, or distribute patron details to external marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#E2E8F0]">3. Contact for Privacy Inquiries</h2>
            <p className="text-[#94A3B8]">
              For inquiries regarding data retention, order records, or to request deletion of your atelier profile, email our privacy concierge at privacy@drlresindecor.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
