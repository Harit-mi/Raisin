"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, HelpCircle, PhoneCall } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Resin Care & Material Durability",
      q: "Will my epoxy resin piece turn yellow over time?",
      a: "No. At DRL Resin & Décor, we exclusively utilize premium, optically pure epoxy resins fortified with advanced HALS (Hindered Amine Light Stabilizers) and UV inhibitors. When displayed indoors away from relentless direct tropical sunlight, our creations maintain their clarity and crystalline luster across decades.",
    },
    {
      category: "Resin Care & Material Durability",
      q: "How heat-resistant are the resin coasters and dining tables?",
      a: "Our fully cured decorative and functional resins withstand temperatures up to 75°C - 80°C (167°F - 176°F), meaning everyday hot coffee and tea mugs will not warp or leave ring marks. We do advise against placing boiling iron cooking pots or scorching stovetop pans directly on resin surfaces without a heat trivet.",
    },
    {
      category: "Resin Care & Material Durability",
      q: "How should I clean and dust my resin art or clock?",
      a: "Simply wipe gently with an ultra-soft lint-free microfiber cloth moistened with lukewarm water and a drop of mild dish soap. Never use acetone, rubbing alcohol, ammonia, or abrasive scrubbing sponges, as harsh industrial solvents can dull the mirror finish.",
    },
    {
      category: "Bespoke Commissions & Custom Orders",
      q: "How long does a custom resin dining table or wall art commission take?",
      a: "Because each layer of deep-pour resin requires 72 to 120 hours of controlled thermal curing followed by sanding and multi-stage polishing, bespoke wall art typically requires 10 to 14 business days, while large live-edge dining river tables take 3 to 4 weeks.",
    },
    {
      category: "Bespoke Commissions & Custom Orders",
      q: "Can I preserve my bridal bouquet flowers or ceremonial keepsakes?",
      a: "Yes! Our 'Personalized Memory Keepsake' service specializes in freeze-drying and silica-dehydrating botanical specimens, wedding varmalas, or heirloom tokens before encapsulating them in archival-grade crystal resin blocks.",
    },
    {
      category: "Packaging & White-Glove Shipping",
      q: "How are fragile large wall pieces and glass-like tables protected in transit?",
      a: "We construct custom shock-absorbent wooden crates lined with heavy-density foam and corner bumpers. All consignments are dispatched via insured express freight partners (Blue Dart, Delhivery Express, or dedicated white-glove transport) with live tracking.",
    },
    {
      category: "Packaging & White-Glove Shipping",
      q: "What happens if a piece is damaged during courier transit?",
      a: "Every single shipment is 100% insured by DRL. In the rare event of transit damage, simply record an unboxing video upon courier receipt and email it to concierge@drlresindecor.com within 48 hours. We will immediately expedite a full replacement or refund.",
    },
  ];

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Knowledge & Care
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#E2E8F0] mt-1">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Everything you need to know regarding caring for your resin art, custom commissions, and white-glove shipping.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#161614] border border-[#C9A052]/20 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#0B0B0A] transition-colors"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C9A052] block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#E2E8F0]">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A052] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#C9A052]/20 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="bg-[#121210] text-[#FFFDF8] rounded-3xl p-8 sm:p-10 border border-[#C9A052]/30 text-center">
          <HelpCircle className="w-8 h-8 text-[#C9A052] mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-bold text-[#E5C77F] mb-2">
            Have a Specific Dimension or Color in Mind?
          </h3>
          <p className="text-xs text-[#CBD5E1] max-w-md mx-auto mb-6 leading-relaxed">
            Our atelier artisans are available to answer queries, review room photos, or schedule a virtual consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-consultation"
              className="bg-[#C9A052] text-[#0B0B0A] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#E5C77F] transition-colors"
            >
              Book Art Consultation
            </Link>
            <Link
              href="/contact"
              className="border border-[#C9A052]/50 text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#C9A052]/10 transition-colors"
            >
              Contact Atelier Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
