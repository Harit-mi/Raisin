import Link from "next/link";
import Image from "next/image";
import { CATALOG_TIERS } from "@/lib/catalog";
import { ArrowRight, Sparkles, ShieldCheck, Clock, Ban } from "lucide-react";

export const metadata = {
  title: "The Collections | DRL Resin & Décor",
  description:
    "Explore our three distinct tiers of luxury resin artistry: Signature Collections, Hand-Poured Masterpieces, and Gift Articles.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-[#0B0B0A] min-h-screen text-[#E2E8F0]">
      {/* Editorial Hero Header */}
      <section className="relative py-20 lg:py-24 border-b border-[#C9A052]/20 overflow-hidden bg-gradient-to-b from-[#121210] to-[#0B0B0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A052]/15 border border-[#C9A052]/40 text-[#E5C77F] text-xs uppercase tracking-widest font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A052]" />
            <span>Atelier Curations</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FFFDF8] tracking-tight leading-[1.1]">
            The{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#E5C77F] via-[#C9A052] to-[#FFFDF8] bg-clip-text text-transparent">
              Collections
            </span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[#CBD5E1] font-light leading-relaxed">
            Discover our three distinct worlds of resin artistry — from architectural statement pieces to sacred wedding preservations and auspicious gifting.
          </p>

          {/* Mandatory Policy Badges */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-[#161614] border border-[#C9A052]/30 text-xs text-[#E5C77F] font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C9A052]" />
              <strong>Note: Preparation time 15 to 20 days depending on article</strong>
            </span>
            <span className="text-[#A69A86] hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Ban className="w-3.5 h-3.5 text-[#E5C77F]" />
              <strong>NO COD</strong>
            </span>
            <span className="text-[#A69A86] hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5C77F]" />
              <strong>NO Exchange · NO Return</strong>
            </span>
          </div>
        </div>
      </section>

      {/* 3 Main Collections Showcases */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
          {CATALOG_TIERS.map((tier, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={tier.slug}
                className="group relative rounded-3xl bg-[#121210] border border-[#C9A052]/25 hover:border-[#E5C77F]/60 transition-all duration-700 overflow-hidden shadow-2xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                    isReversed ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Visual Imagery Side */}
                  <div
                    className={`relative min-h-[380px] sm:min-h-[460px] lg:min-h-full lg:col-span-7 overflow-hidden ${
                      isReversed ? "lg:col-start-6" : ""
                    }`}
                  >
                    <Image
                      src={tier.heroImage}
                      alt={tier.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-[#121210]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#121210]/30 lg:to-[#121210]" />

                    {/* Number Stamp */}
                    <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C9A052]/40 flex items-center justify-center font-serif text-2xl font-bold text-[#E5C77F] shadow-xl">
                      {tier.number}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                      <span className="text-xs uppercase tracking-widest text-[#E5C77F] font-semibold bg-[#0B0B0A]/90 px-3 py-1 rounded-full border border-[#C9A052]/40">
                        {tier.categories.length} Curated Subcategories
                      </span>
                    </div>
                  </div>

                  {/* Editorial Content Side */}
                  <div
                    className={`p-8 sm:p-12 lg:p-14 lg:col-span-5 flex flex-col justify-between ${
                      isReversed ? "lg:col-start-1" : ""
                    }`}
                  >
                    <div>
                      <div className="hidden lg:flex items-center gap-3 mb-4">
                        <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
                          Collection {tier.number}
                        </span>
                        <span className="w-8 h-[1px] bg-[#C9A052]/40" />
                        <span className="text-xs text-[#94A3B8]">
                          {tier.categories.length} Subcategories
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFDF8] group-hover:text-[#E5C77F] transition-colors leading-tight">
                        {tier.name}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#E5C77F] mt-2 font-medium tracking-wide">
                        {tier.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-[#94A3B8] mt-4 leading-relaxed font-light">
                        {tier.description}
                      </p>

                      {/* Subcategories Directory */}
                      <div className="mt-8 pt-6 border-t border-[#C9A052]/20">
                        <span className="block text-[11px] uppercase tracking-wider text-[#C9A052] font-semibold mb-3">
                          Included Subcategories:
                        </span>
                        <div className="space-y-3">
                          {tier.categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/collections/${tier.slug}/${cat.slug}`}
                              className="group/sub flex items-center justify-between p-3 rounded-xl bg-[#161614] border border-[#C9A052]/15 hover:border-[#E5C77F]/50 hover:bg-[#1D1D19] transition-all"
                            >
                              <div>
                                <span className="font-serif text-sm font-semibold text-[#E2E8F0] group-hover/sub:text-[#E5C77F] transition-colors">
                                  {cat.number}. {cat.name}
                                </span>
                                <span className="block text-[10px] text-[#94A3B8] mt-0.5">
                                  {cat.sub}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#C9A052] opacity-70 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main Dedicated CTA */}
                    <div className="mt-8 pt-6">
                      <Link
                        href={`/collections/${tier.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#C9A052] text-[#0B0B0A] hover:bg-[#E5C77F] font-semibold text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-[#C9A052]/15 group/btn"
                      >
                        <span>Explore {tier.name}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
