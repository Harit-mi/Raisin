import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MAIN_COLLECTIONS,
  getMainCollectionBySlug,
  getSubcategoryBySlug,
  getProductCategoryBySlug,
} from "@/lib/catalog";
import { db } from "@/lib/db";
import { ArrowLeft, Clock, Ban, ShieldCheck, Sparkles } from "lucide-react";
import ProductCategoryListing from "./ProductCategoryListing";

export async function generateStaticParams() {
  const params: {
    collectionSlug: string;
    subcategorySlug: string;
    productCategorySlug: string;
  }[] = [];

  for (const collection of MAIN_COLLECTIONS) {
    for (const subcat of collection.subcategories) {
      for (const prodCat of subcat.productCategories) {
        params.push({
          collectionSlug: collection.slug,
          subcategorySlug: subcat.slug,
          productCategorySlug: prodCat.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    collectionSlug: string;
    subcategorySlug: string;
    productCategorySlug: string;
  }>;
}) {
  const { collectionSlug, subcategorySlug, productCategorySlug } = await params;
  const prodCat = getProductCategoryBySlug(collectionSlug, subcategorySlug, productCategorySlug);
  const subcat = getSubcategoryBySlug(collectionSlug, subcategorySlug);
  const collection = getMainCollectionBySlug(collectionSlug);

  if (!prodCat || !subcat || !collection) {
    return { title: "Product Category Not Found | DRL Resin & Décor" };
  }

  return {
    title: `${prodCat.name} — ${subcat.name} | DRL Resin & Décor`,
    description: prodCat.description,
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{
    collectionSlug: string;
    subcategorySlug: string;
    productCategorySlug: string;
  }>;
}) {
  const { collectionSlug, subcategorySlug, productCategorySlug } = await params;
  const collection = getMainCollectionBySlug(collectionSlug);
  if (!collection) notFound();

  const subcategory = getSubcategoryBySlug(collectionSlug, subcategorySlug);
  if (!subcategory) notFound();

  const productCategory = getProductCategoryBySlug(
    collectionSlug,
    subcategorySlug,
    productCategorySlug
  );
  if (!productCategory) notFound();

  // Load products and filter to ONLY this product category
  const allProducts = db.getProducts();
  const matchedProducts = allProducts.filter((p) => {
    const pProdSlug = p.productCategorySlug?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const targetSlug = productCategory.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const pCatNorm = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      pProdSlug === targetSlug ||
      pCatNorm === targetSlug ||
      p.category.toLowerCase() === productCategory.name.toLowerCase()
    );
  });

  return (
    <div className="bg-[#0B0B0A] min-h-screen text-[#E2E8F0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation (Level 1 → Level 2 → Level 3 → Level 4) */}
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
            <Link
              href={`/collections/${collection.slug}/${subcategory.slug}`}
              className="text-[#94A3B8] hover:text-[#E5C77F] transition-colors"
            >
              {subcategory.name}
            </Link>
            <span className="text-[#C9A052] font-mono">/</span>
            <span className="text-[#E5C77F] font-semibold">{productCategory.name}</span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/collections/${collection.slug}/${subcategory.slug}`}
              className="inline-flex items-center gap-1.5 bg-[#161614] hover:bg-[#1E1E1B] border border-[#C9A052]/40 text-[#E5C77F] px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to {subcategory.name}</span>
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/25 text-[#CBD5E1] hover:text-[#E5C77F] px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              <span>All Collections</span>
            </Link>
          </div>
        </div>

        {/* Level 4 Header */}
        <div className="border-b border-[#C9A052]/20 pb-8 mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161614] border border-[#C9A052]/30 text-xs text-[#E5C77F] uppercase tracking-widest font-semibold mb-3">
            <span>
              {collection.name} · {subcategory.name} · Category {productCategory.number}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF8] tracking-tight">
            {productCategory.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#E5C77F] mt-2 font-medium tracking-wide">
            {productCategory.tagline}
          </p>

          <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            {productCategory.description}
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

        {/* Client Product Listing Component with Sorting & Filtering */}
        <ProductCategoryListing
          initialProducts={matchedProducts}
          productCategoryName={productCategory.name}
          subcategoryName={subcategory.name}
          subcategorySlug={subcategory.slug}
          collectionSlug={collection.slug}
        />
      </div>
    </div>
  );
}
