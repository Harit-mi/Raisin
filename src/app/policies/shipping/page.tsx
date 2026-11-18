import Link from "next/link";
import { Truck, ShieldCheck, Box, Clock, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#0B0B0A] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#C9A052]/20 pb-6 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Atelier Standards
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0] mt-1">
            Shipping & White-Glove Delivery Policy
          </h1>
          <p className="text-xs text-[#94A3B8] mt-2">
            Last updated: October 2026 · Handcrafted and crated with total dedication to safe transit.
          </p>
        </div>

        <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#C9A052]" />
              1. Pan-India Delivery Coverage & Logistics Partners
            </h2>
            <p className="text-[#94A3B8]">
              DRL Resin & Décor dispatches shipments to all serviceable pincodes across India via premium air and surface courier partners, including <strong>Blue Dart Express, Delhivery Prime, and dedicated White-Glove Surface Logistics</strong> for heavy furniture pieces.
            </p>
            <p className="text-[#94A3B8]">
              International consignments are serviced upon individual inquiry through DHL Express with export crating.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C9A052]" />
              2. Production & Dispatch Lead Times
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-[#C9A052]/20 rounded-xl overflow-hidden">
                <thead className="bg-[#121210] text-[#E5C77F] text-xs">
                  <tr>
                    <th className="p-3">Category</th>
                    <th className="p-3">Production & Curing</th>
                    <th className="p-3">Estimated Transit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A052]/15 text-xs text-[#94A3B8]">
                  <tr>
                    <td className="p-3 font-semibold text-[#E2E8F0]">Ready-to-Ship Coasters, Clocks & Trays</td>
                    <td className="p-3">24 – 48 Hours</td>
                    <td className="p-3">3 – 5 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E2E8F0]">Made-to-Order Ocean Wall Art</td>
                    <td className="p-3">7 – 10 Business Days</td>
                    <td className="p-3">4 – 6 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#E2E8F0]">Custom Live Edge River Dining Tables</td>
                    <td className="p-3">3 – 4 Weeks (Multi-pour cure)</td>
                    <td className="p-3">White-Glove Dedicated Truck</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2">
              <Box className="w-5 h-5 text-[#C9A052]" />
              3. Museum-Grade Shock-Proof Packaging
            </h2>
            <p className="text-[#94A3B8]">
              Because cured resin and raw crystals require careful cushioning, every piece undergoes a 5-tier protective packaging protocol:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#94A3B8]">
              <li>Acid-free protective release film to preserve the high-gloss mirror surface.</li>
              <li>Two layers of high-density air-bubble armor.</li>
              <li>Edge-reinforcing corner guards to prevent corner impact.</li>
              <li>Reinforced 5-ply corrugated carton or tailor-made wooden plywood crates for furniture and large artwork.</li>
              <li>Waterproof poly-shield exterior barrier.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C9A052]" />
              4. 100% Transit Insurance Guarantee
            </h2>
            <p className="text-[#94A3B8]">
              Every parcel leaving our studio is fully insured at 100% of purchase value against loss or courier transit accidents. If a parcel arrives visibly damaged, please inspect the box and notify us within 48 hours for immediate priority replacement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
