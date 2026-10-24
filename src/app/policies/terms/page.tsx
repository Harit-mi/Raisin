export default function TermsPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#F4EFE5] pb-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Legal Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
            Terms and Conditions
          </h1>
          <p className="text-xs text-[#77736B] mt-2">
            Governing sales, bespoke commissions, and intellectual property.
          </p>
        </div>

        <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 text-xs sm:text-sm text-[#1B1915] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">1. Acceptance of Terms</h2>
            <p className="text-[#77736B]">
              By accessing the website of DRL Resin & Décor or commissioning our artisans, you agree to abide by these Terms and Conditions and our associated delivery and returns policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">2. Artisanal Handcrafted Scope</h2>
            <p className="text-[#77736B]">
              All items are handmade. While we make every endeavor to portray accurate hues and wood grains, natural timber knots, wave textures, and pigment blends are naturally unique to each individual creation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">3. Pricing & Currency</h2>
            <p className="text-[#77736B]">
              All prices quoted on the website are in Indian Rupees (INR, ₹) and include applicable taxes. We reserve the right to modify prices for custom commissions based on dimension or raw timber market adjustments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#1B1915]">4. Intellectual Property</h2>
            <p className="text-[#77736B]">
              All visual photography, studio logos, original artwork patterns, and textual content are the protected intellectual property of DRL Resin & Décor. Unauthorized reproduction or commercial redistribution is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
