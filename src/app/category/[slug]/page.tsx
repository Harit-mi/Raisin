"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, ArrowRight, Sparkles, Clock, Ban, ShieldCheck } from "lucide-react";
import { CATALOG_TIERS } from "@/lib/catalog";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Find tier and category metadata
  const categoryMeta = useMemo(() => {
    for (const tier of CATALOG_TIERS) {
      const match = tier.categories.find(
        (c) => c.slug.toLowerCase() === slug.toLowerCase() ||
          c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
      );
      if (match) {
        return { tier, category: match };
      }
    }
    return null;
  }, [slug]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const list: Product[] = await res.json();
          // Match products by slug or matching category name
          const matched = list.filter((p) => {
            const pSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            const currentSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              pSlug === currentSlug ||
              (categoryMeta && p.category.toLowerCase() === categoryMeta.category.name.toLowerCase())
            );
          });

          if (categoryMeta) {
            setCategoryName(categoryMeta.category.name);
          } else if (matched.length > 0) {
            setCategoryName(matched[0].category);
          } else {
            const fallback = slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            setCategoryName(fallback);
          }

          setProducts(matched);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, categoryMeta]);

  const tierName = categoryMeta?.tier.name || "Collections";
  const subCategories = categoryMeta?.category.sub;

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Back Buttons */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A052]/20 pb-4">
          <div className="flex items-center gap-2">
            <Link
              href={
                categoryMeta?.tier
                  ? `/shop?tier=${encodeURIComponent(categoryMeta.tier.name)}`
                  : "/shop"
              }
              className="inline-flex items-center gap-1.5 bg-[#161614] hover:bg-[#1E1E1B] border border-[#C9A052]/40 text-[#E5C77F] px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to {tierName}</span>
            </Link>

            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/25 text-[#CBD5E1] hover:text-[#E5C77F] px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              <span>All Collections</span>
            </Link>
          </div>

          <div className="text-xs text-[#94A3B8]">
            <Link href="/" className="hover:text-[#E5C77F] transition-colors">
              Home
            </Link>
            <span className="mx-1.5 text-[#C9A052]">/</span>
            <Link href="/shop" className="hover:text-[#E5C77F] transition-colors">
              Collections
            </Link>
            {categoryMeta?.tier && (
              <>
                <span className="mx-1.5 text-[#C9A052]">/</span>
                <Link
                  href={`/shop?tier=${encodeURIComponent(categoryMeta.tier.name)}`}
                  className="hover:text-[#E5C77F] transition-colors"
                >
                  {categoryMeta.tier.name}
                </Link>
              </>
            )}
            <span className="mx-1.5 text-[#C9A052]">/</span>
            <span className="text-[#E5C77F] font-semibold">{categoryName}</span>
          </div>
        </div>

        {/* Category Header */}
        <div className="border-b border-[#C9A052]/20 pb-8 mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            {tierName} · Exclusive Curations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#E2E8F0] mt-1">
            {categoryName}
          </h1>

          {subCategories && (
            <p className="text-xs sm:text-sm text-[#E5C77F] mt-2 font-medium tracking-wide">
              {subCategories}
            </p>
          )}

          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Showing exclusive handcrafted creations curated strictly for {categoryName}.
          </p>

          {/* Mandatory Order Policies Notice */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-[#161614] border border-[#C9A052]/30 text-xs text-[#E5C77F] font-bold">
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

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin mx-auto mb-3" />
            <p className="font-serif text-lg text-[#E2E8F0]">Loading {categoryName} creations...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center bg-[#161614] border border-[#C9A052]/20 rounded-3xl max-w-xl mx-auto p-8">
            <h3 className="font-serif text-xl font-bold text-[#E2E8F0] mb-2">Commissions In Atelier</h3>
            <p className="text-xs text-[#94A3B8] mb-6">
              New articles for {categoryName} are currently curing in our studio.
            </p>
            <Link
              href={
                categoryMeta?.tier
                  ? `/shop?tier=${encodeURIComponent(categoryMeta.tier.name)}`
                  : "/shop"
              }
              className="inline-flex items-center gap-2 bg-[#C9A052] text-[#0B0B0A] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md hover:bg-[#E5C77F]"
            >
              <span>Explore Other Categories in {tierName}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 text-center">
          <Link
            href={
              categoryMeta?.tier
                ? `/shop?tier=${encodeURIComponent(categoryMeta.tier.name)}`
                : "/shop"
            }
            className="inline-flex items-center gap-2 bg-[#161614] hover:bg-[#1D1D19] border border-[#C9A052]/40 text-[#E5C77F] px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← Explore Other Categories in {tierName}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
