import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MAIN_COLLECTIONS, getMainCollectionBySlug, getSubcategoryBySlug } from "@/lib/catalog";
import { db } from "@/lib/db";
import { ArrowLeft, ArrowRight, Clock, Ban, ShieldCheck, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const params: { collectionSlug: string; subcategorySlug: string }[] = [];
  for (const collection of MAIN_COLLECTIONS) {
    for (const subcat of collection.subcategories) {
      params.push({
        collectionSlug: collection.slug,
        subcategorySlug: subcat.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collectionSlug: string; subcategorySlug: string }>;
}) {
  const { collectionSlug, subcategorySlug } = await params;
  const subcategory = getSubcategoryBySlug(collectionSlug, subcategorySlug);
  const collection = getMainCollectionBySlug(collectionSlug);
  if (!subcategory || !collection) {
    return { title: "Subcategory Not Found | DRL Resin & Décor" };
  }
  return {
    title: `${subcategory.name} — ${collection.name} | DRL Resin & Décor`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ collectionSlug: string; subcategorySlug: string }>;
}) {
  const { collectionSlug, subcategorySlug } = await params;
  const collection = getMainCollectionBySlug(collectionSlug);
  if (!collection) notFound();

  const subcategory = getSubcategoryBySlug(collectionSlug, subcategorySlug);
  if (!subcategory) notFound();

  // Load products to compute accurate live product counts for each product category
  const allProducts = db.getProducts();

  return (
    <div className="bg-[#0B0B0A] min-h-screen text-[#E2E8F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation (Level 1 → Level 2 → Level 3) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A052]/20 pb-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs">
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
              href={`/collections/${collection.slug}`}
              className="text-[#94A3B8] hover:text-[#E5C77F] transition-colors"
            >
              {collection.name}
            </Link>
            <span className="text-[#C9A052] font-mono">/</span>
            <span className="text-[#E5C77F] font-semibold">{subcategory.name}</span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/collections/${collection.slug}`}
              className="inline-flex items-center gap-1.5 bg-[#161614] hover:bg-[#1E1E1B] border border-[#C9A052]/40 text-[#E5C77F] px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to {collection.name}</span>
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/25 text-[#CBD5E1] hover:text-[#E5C77F] px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              <span>All Collections</span>
            </Link>
          </div>
        </div>

        {/* Subcategory Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-[#C9A052]/30 mb-14 bg-[#121210]">
          <div className="relative h-[260px] sm:h-[320px] w-full">
            <Image
              src={subcategory.image}
              alt={subcategory.name}
              fill
              priority
              className="object-cover opacity-35 scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/70 to-[#0B0B0A]/30" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-10 z-10 max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold mb-2">
                Level 3 · {collection.name} · Subcategory {subcategory.letter}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF8] tracking-tight">
                {subcategory.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#E5C77F] mt-2 font-medium tracking-wide">
                {subcategory.tagline}
              </p>
              <p className="mt-3 max-w-2xl text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed hidden sm:block">
                {subcategory.description}
              </p>

              {/* Order Policy Badges */}
              <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-[#0B0B0A]/90 border border-[#C9A052]/35 text-[11px] sm:text-xs text-[#E5C77F] font-bold">
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
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Product Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0] mt-1">
            Choose a Product Category
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Each product category opens its own dedicated product listing page with available creations.
          </p>
        </div>

        {/* Level 4 Product Categories Grid */}
        <div
          className={`grid grid-cols-1 ${
            subcategory.productCategories.length === 2
              ? "md:grid-cols-2 max-w-4xl mx-auto"
              : subcategory.productCategories.length === 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          } gap-6 sm:gap-8`}
        >
          {subcategory.productCategories.map((prodCat) => {
            const count = allProducts.filter(
              (p) =>
                p.productCategorySlug === prodCat.slug ||
                p.category.toLowerCase() === prodCat.name.toLowerCase()
            ).length;

            return (
              <div
                key={prodCat.slug}
                className="group relative rounded-3xl bg-[#121210] border border-[#C9A052]/25 hover:border-[#E5C77F] transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-[#C9A052]/10"
              >
                {/* Large Product Category Photograph */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#161614]">
                  <Image
                    src={prodCat.image}
                    alt={prodCat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-transparent to-transparent" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C9A052]/40 flex items-center justify-center font-serif text-base font-bold text-[#E5C77F]">
                    {prodCat.number}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E5C77F] bg-[#0B0B0A]/90 px-2.5 py-1 rounded-full border border-[#C9A052]/40 inline-block">
                      {count > 0 ? `${count} Masterpiece Pieces` : "Bespoke Commissions"}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#FFFDF8] group-hover:text-[#E5C77F] transition-colors">
                      {prodCat.name}
                    </h3>
                    <p className="text-xs text-[#E5C77F] mt-1 font-medium line-clamp-1">
                      {prodCat.tagline}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed font-light line-clamp-3">
                      {prodCat.description}
                    </p>
                  </div>

                  {/* Primary CTA to Level 4 */}
                  <div className="mt-6 pt-4 border-t border-[#C9A052]/15">
                    <Link
                      href={`/collections/${collection.slug}/${subcategory.slug}/${prodCat.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#161614] hover:bg-[#C9A052] text-[#E5C77F] hover:text-[#0B0B0A] border border-[#C9A052]/40 hover:border-transparent font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-300 group/btn shadow-sm"
                    >
                      <span>View {prodCat.name} Products</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className="mt-16 text-center">
          <Link
            href={`/collections/${collection.slug}`}
            className="inline-flex items-center gap-2 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/30 text-[#CBD5E1] hover:text-[#E5C77F] px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Explore Other Subcategories in {collection.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
