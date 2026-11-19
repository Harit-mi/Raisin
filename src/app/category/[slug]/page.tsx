"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const list: Product[] = await res.json();
          // Match by slug or category name slug
          const matched = list.filter((p) => {
            const pSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            return pSlug === slug.toLowerCase() || slug.toLowerCase().includes(pSlug) || pSlug.includes(slug.toLowerCase());
          });

          if (matched.length > 0) {
            setCategoryName(matched[0].category);
            setProducts(matched);
          } else {
            // Fallback formatted title
            const fallback = slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            setCategoryName(fallback);
            setProducts([]);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#161614] hover:bg-[#1D1D19] border border-[#C9A052]/40 text-[#E5C77F] px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Categories</span>
          </Link>

          <Link
            href="/"
            className="text-xs text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
          >
            Home / Collections / <span className="text-[#E5C77F]">{categoryName}</span>
          </Link>
        </div>

        {/* Category Header */}
        <div className="border-b border-[#C9A052]/20 pb-8 mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Signature Category
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#E2E8F0] mt-1">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Showing exclusive handcrafted creations curated strictly for {categoryName}.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin mx-auto mb-3" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center bg-[#161614] border border-[#C9A052]/20 rounded-3xl max-w-xl mx-auto p-8">
            <h3 className="font-serif text-xl font-bold text-[#E2E8F0] mb-2">Commissions In Atelier</h3>
            <p className="text-xs text-[#94A3B8] mb-6">
              New articles for {categoryName} are currently curing in our studio.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A052] to-[#E5C77F] text-[#0B0B0A] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md"
            >
              <span>Explore Other Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#121210] border border-[#C9A052]/40 text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#0B0B0A] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md"
          >
            <span>← Explore Other Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
