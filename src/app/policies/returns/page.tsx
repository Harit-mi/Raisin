import Link from "next/link";
import { RotateCcw, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#F4EFE5] pb-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Quality Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
            Returns, Replacements & Guarantee
          </h1>
          <p className="text-xs text-[#77736B] mt-2">
            Clear, transparent policies for handcrafted art and bespoke commissions.
          </p>
        </div>

        <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-[#1B1915] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1B1915] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A052]" />
              1. The Nature of Hand-Poured Artisanal Craft
            </h2>
            <p className="text-[#77736B]">
              Every piece crafted by DRL Resin & Décor is individually hand-poured, shaped, and polished. Because epoxy resin cures organically in liquid flow, minor variations in micro-bubbles, wave patterns, natural wood grain contours, and pigment swirls are not defects; they are the authentic hallmarks of handcrafted luxury artwork.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1B1915] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#C9A052]" />
              2. Ready-to-Ship Decor (Coasters, Bowls, Standard Clocks & Trays)
            </h2>
            <p className="text-[#77736B]">
              If you are not completely enchanted with a non-customized, ready-to-ship decor item, you may request a return within <strong>7 days</strong> of delivery, provided the item remains unused, in original pristine condition, and within its protective packaging vault.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1B1915] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C9A052]" />
              3. Custom & Made-to-Order Commissions
            </h2>
            <p className="text-[#77736B]">
              Custom studio creations (including bespoke river tables, custom-sized wall canvases, personalized name engravings, and bridal floral preservation pieces) are created exclusively to individual client specifications. Consequently, custom orders cannot be returned once approved and cast into production.
            </p>
            <p className="text-[#77736B]">
              To ensure 100% satisfaction, we provide digital photographs of your timber slab and pigment swatches prior to final topcoat casting.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#1B1915] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#C9A052]" />
              4. Damaged in Transit Resolution
            </h2>
            <p className="text-[#77736B]">
              In the unlikely circumstance that your item experiences impact damage during courier transit, please take photographs/video of the outer carton and product within 48 hours of delivery and contact concierge@drlresindecor.com. We will immediately arrange a return pickup and expedite a complimentary priority replacement or full refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
