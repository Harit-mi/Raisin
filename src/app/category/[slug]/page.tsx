"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, Category } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Map category slug to display name
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const list: Product[] = await res.json();
          // Match by slug or category name substring
          const filtered = list.filter(
            (p) =>
              p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").includes(slug.toLowerCase()) ||
              slug.toLowerCase().includes(p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
          );
          setProducts(filtered.length ? filtered : list.slice(0, 4));
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
    <div className="bg-[#FFFDF8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#F4EFE5] pb-6 mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Signature Category
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B1915] mt-1">
            {formattedTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] mt-2">
            Explore authentic hand-poured creations crafted in our atelier for this collection.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin mx-auto mb-3" />
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
            className="inline-flex items-center gap-2 bg-[#1B1915] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#121210] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
