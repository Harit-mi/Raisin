import Link from "next/link";
import { RotateCcw, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#0B0B0A] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#C9A052]/20 pb-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Quality Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0] mt-1">
            Returns, Replacements & Guarantee
          </h1>
          <p className="text-xs text-[#94A3B8] mt-2">
            Clear, transparent policies for handcrafted art and bespoke commissions.
          </p>
        </div>

        <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A052]" />
              1. 100% Bespoke & Made-to-Order Creation
            </h2>
            <p className="text-[#94A3B8]">
              Every single creation at DRL Resin & Décor is made exclusively to order. Handcrafting fine optical resin and natural live-edge timbers requires multi-stage thermal curing, hand-pigmenting, crystal placement, and custom diamond polishing over <strong>15 to 20 days</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2 text-rose-400">
              <RotateCcw className="w-5 h-5 text-rose-400" />
              2. Strict Policy: NO Exchange · NO Return
            </h2>
            <p className="text-[#94A3B8]">
              Because all articles are individually commissioned and cast to order according to client specifications, <strong>we do not accept returns or exchanges</strong> under any circumstances once production has begun.
            </p>
            <p className="text-[#94A3B8]">
              Additionally, please note that <strong>Cash on Delivery (COD) is NOT available</strong>. All commissions require 100% pre-paid confirmation via our secure Razorpay gateway (UPI, Cards, NetBanking).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#C9A052]" />
              3. Transit Impact & Damaged Goods Resolution
            </h2>
            <p className="text-[#94A3B8]">
              In the rare event that your handcrafted piece incurs physical damage during insured transit, please share unboxing photographs and video within 24 hours of delivery to concierge@drlresindecor.com. We will inspect the transit damage and arrange an expedited priority replacement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
