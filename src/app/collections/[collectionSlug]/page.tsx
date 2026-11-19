import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CATALOG_TIERS, findTierBySlug } from "@/lib/catalog";
import { ArrowLeft, ArrowRight, Sparkles, Clock, Ban, ShieldCheck } from "lucide-react";

export async function generateStaticParams() {
  return CATALOG_TIERS.map((tier) => ({
    collectionSlug: tier.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collectionSlug: string }>;
}) {
  const { collectionSlug } = await params;
  const tier = findTierBySlug(collectionSlug);
  if (!tier) return { title: "Collection Not Found | DRL Resin & Décor" };
  return {
    title: `${tier.name} | DRL Resin & Décor`,
    description: tier.description,
  };
}

export default async function DedicatedCollectionPage({
  params,
}: {
  params: Promise<{ collectionSlug: string }>;
}) {
  const { collectionSlug } = await params;
  const tier = findTierBySlug(collectionSlug);

  if (!tier) {
    notFound();
  }

  return (
    <div className="bg-[#0B0B0A] min-h-screen text-[#E2E8F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation & Back To Collections */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A052]/20 pb-4">
          <div className="flex items-center gap-2 text-xs">
            <Link href="/" className="text-[#94A3B8] hover:text-[#E5C77F] transition-colors">
              Home
            </Link>
            <span className="text-[#C9A052] font-mono">/</span>
            <Link
              href="/collections"
              className="text-[#94A3B8] hover:text-[#E5C77F] transition-colors"
            >
              Collections
            </Link>
            <span className="text-[#C9A052] font-mono">/</span>
            <span className="text-[#E5C77F] font-semibold">{tier.name}</span>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-[#161614] hover:bg-[#1E1E1B] border border-[#C9A052]/40 text-[#E5C77F] px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>← Back to All Collections</span>
          </Link>
        </div>

        {/* Collection Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-[#C9A052]/30 mb-16 bg-[#121210]">
          <div className="relative h-[280px] sm:h-[340px] lg:h-[380px] w-full">
            <Image
              src={tier.heroImage}
              alt={tier.name}
              fill
              priority
              className="object-cover opacity-40 scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/70 to-[#0B0B0A]/30" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-10 z-10 max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold mb-2">
                Tier {tier.number} · Curated Atelier Portfolio
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FFFDF8] tracking-tight">
                {tier.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#E5C77F] mt-2 font-medium tracking-wide">
                {tier.tagline}
              </p>
              <p className="mt-4 max-w-2xl text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed hidden sm:block">
                {tier.description}
              </p>

              {/* Order Policy Pill */}
              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-[#0B0B0A]/90 border border-[#C9A052]/35 text-[11px] sm:text-xs text-[#E5C77F] font-bold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C9A052]" />
                  <span>Prep time 15 to 20 days</span>
                </span>
                <span className="text-[#A69A86] hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Ban className="w-3.5 h-3.5 text-[#E5C77F]" />
                  <span>NO COD</span>
                </span>
                <span className="text-[#A69A86] hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E5C77F]" />
                  <span>NO Exchange · NO Return</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Select a Subcategory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0] mt-1">
            Explore {tier.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Click on any subcategory below to explore its exclusive handcrafted pieces and commissions.
          </p>
        </div>

        {/* Grid of Subcategories */}
        <div
          className={`grid grid-cols-1 ${
            tier.categories.length === 2
              ? "md:grid-cols-2 max-w-5xl mx-auto"
              : "md:grid-cols-3"
          } gap-8`}
        >
          {tier.categories.map((cat) => (
            <div
              key={cat.slug}
              className="group relative rounded-3xl bg-[#121210] border border-[#C9A052]/25 hover:border-[#E5C77F] transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#C9A052]/10"
            >
              {/* Large High-Quality Product Photograph */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#161614]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-transparent" />

                {/* Subcategory Number Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C9A052]/40 flex items-center justify-center font-serif text-lg font-bold text-[#E5C77F]">
                  {cat.number}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E5C77F] bg-[#0B0B0A]/90 px-3 py-1 rounded-full border border-[#C9A052]/40 inline-block">
                    {cat.featuredHighlight}
                  </span>
                </div>
              </div>

              {/* Subcategory Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#FFFDF8] group-hover:text-[#E5C77F] transition-colors">
                    {cat.number}. {cat.name}
                  </h3>

                  {/* Bulleted Sub-items */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cat.subItems.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] text-[#E5C77F] bg-[#161614] border border-[#C9A052]/20 px-2.5 py-0.5 rounded-md font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#94A3B8] mt-4 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>

                {/* Dedicated CTA */}
                <div className="mt-8 pt-5 border-t border-[#C9A052]/15">
                  <Link
                    href={`/collections/${tier.slug}/${cat.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#161614] hover:bg-[#C9A052] text-[#E5C77F] hover:text-[#0B0B0A] border border-[#C9A052]/40 hover:border-transparent font-semibold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-300 group/btn shadow-sm"
                  >
                    <span>View {cat.name} Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/30 text-[#CBD5E1] hover:text-[#E5C77F] px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Explore Other Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
