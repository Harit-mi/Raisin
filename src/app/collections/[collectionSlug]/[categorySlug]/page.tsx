import { notFound } from "next/navigation";
import Link from "next/link";
import { CATALOG_TIERS, findTierBySlug, findCategoryInTier } from "@/lib/catalog";
import { db } from "@/lib/db";
import { ArrowLeft, Clock, Ban, ShieldCheck } from "lucide-react";
import SubcategoryProductGrid from "./SubcategoryProductGrid";

export async function generateStaticParams() {
  const params: { collectionSlug: string; categorySlug: string }[] = [];
  for (const tier of CATALOG_TIERS) {
    for (const cat of tier.categories) {
      params.push({
        collectionSlug: tier.slug,
        categorySlug: cat.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collectionSlug: string; categorySlug: string }>;
}) {
  const { collectionSlug, categorySlug } = await params;
  const tier = findTierBySlug(collectionSlug);
  if (!tier) return { title: "Collection Not Found | DRL Resin & Décor" };
  const cat = findCategoryInTier(tier, categorySlug);
  if (!cat) return { title: "Category Not Found | DRL Resin & Décor" };

  return {
    title: `${cat.name} — ${tier.name} | DRL Resin & Décor`,
    description: cat.description,
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ collectionSlug: string; categorySlug: string }>;
}) {
  const { collectionSlug, categorySlug } = await params;
  const tier = findTierBySlug(collectionSlug);
  if (!tier) notFound();

  const category = findCategoryInTier(tier, categorySlug);
  if (!category) notFound();

  // Load all products and filter to ONLY this subcategory
  const allProducts = db.getProducts();
  const matchedProducts = allProducts.filter((p) => {
    const pCatNorm = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const catNorm = category.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      p.category.toLowerCase() === category.name.toLowerCase() ||
      pCatNorm === catNorm
    );
  });

  return (
    <div className="bg-[#0B0B0A] min-h-screen text-[#E2E8F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation & Back Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A052]/20 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
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
            <Link
              href={`/collections/${tier.slug}`}
              className="text-[#94A3B8] hover:text-[#E5C77F] transition-colors"
            >
              {tier.name}
            </Link>
            <span className="text-[#C9A052] font-mono">/</span>
            <span className="text-[#E5C77F] font-semibold">{category.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/collections/${tier.slug}`}
              className="inline-flex items-center gap-1.5 bg-[#161614] hover:bg-[#1E1E1B] border border-[#C9A052]/40 text-[#E5C77F] px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to {tier.name}</span>
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/25 text-[#CBD5E1] hover:text-[#E5C77F] px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              <span>All Collections</span>
            </Link>
          </div>
        </div>

        {/* Subcategory Header */}
        <div className="border-b border-[#C9A052]/20 pb-8 mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161614] border border-[#C9A052]/30 text-xs text-[#E5C77F] uppercase tracking-widest font-semibold mb-3">
            <span>{tier.name} · Subcategory {category.number}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF8] tracking-tight">
            {category.name}
          </h1>

          {/* Sub-items Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {category.subItems.map((item) => (
              <span
                key={item}
                className="text-xs text-[#E5C77F] bg-[#161614] border border-[#C9A052]/30 px-3 py-1 rounded-lg font-medium tracking-wide"
              >
                ✦ {item}
              </span>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#94A3B8] mt-4 font-light leading-relaxed max-w-2xl mx-auto">
            {category.description}
          </p>

          {/* Mandatory Order Policies Notice */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-[#161614] border border-[#C9A052]/30 text-xs text-[#E5C77F] font-bold">
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

        {/* Client Product Grid with Search, Sort, Filter */}
        <SubcategoryProductGrid
          initialProducts={matchedProducts}
          categoryName={category.name}
          tierName={tier.name}
          tierSlug={tier.slug}
        />
      </div>
    </div>
  );
}
