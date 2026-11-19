"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal, RotateCcw, ArrowLeft } from "lucide-react";

interface SubcategoryProductGridProps {
  initialProducts: Product[];
  categoryName: string;
  tierName: string;
  tierSlug: string;
}

export default function SubcategoryProductGrid({
  initialProducts,
  categoryName,
  tierName,
  tierSlug,
}: SubcategoryProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [filterCustomizable, setFilterCustomizable] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(50000);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTag = p.tagline.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTag) return false;
        }
        if (filterCustomizable && !p.isCustomizable) return false;
        if (p.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest")
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [initialProducts, searchQuery, sortBy, filterCustomizable, maxPrice]);

  const resetFilters = () => {
    setSearchQuery("");
    setSortBy("featured");
    setFilterCustomizable(false);
    setMaxPrice(50000);
  };

  return (
    <div>
      {/* Filter and Refine Bar */}
      <div className="bg-[#121210] border border-[#C9A052]/20 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${categoryName}...`}
              className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-4 py-2.5 pl-10 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
            />
            <Search className="w-4 h-4 text-[#CBD5E1] absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-[#94A3B8] hover:text-[#E2E8F0]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs text-[#94A3B8] font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "newest")
              }
              className="bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052] cursor-pointer"
            >
              <option value="featured">Featured Masterpieces</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-[#C9A052]/15 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-[#E2E8F0]">
            <input
              type="checkbox"
              checked={filterCustomizable}
              onChange={(e) => setFilterCustomizable(e.target.checked)}
              className="rounded border-[#A69A86] text-[#C9A052] focus:ring-[#C9A052]"
            />
            <span>Customizable Art Only</span>
          </label>

          <div className="flex items-center gap-3">
            <span className="text-[#94A3B8]">Max Price: ₹{maxPrice.toLocaleString("en-IN")}</span>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 sm:w-36 accent-[#C9A052] cursor-pointer"
            />
            {(searchQuery || filterCustomizable || maxPrice < 50000) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[#C9A052] hover:text-[#E2E8F0] transition-colors ml-2 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Count Header */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#94A3B8]">
        <span>
          Showing <strong className="text-[#E2E8F0]">{filteredProducts.length}</strong> creations exclusively in{" "}
          <span className="text-[#E5C77F] font-semibold">{categoryName}</span>
        </span>
        <span className="italic">100% Made to Order · In Indian Rupees (₹)</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#121210] border border-[#C9A052]/20 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
          <SlidersHorizontal className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-[#E2E8F0] mb-2">No creations matched</h3>
          <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
            No pieces matched your selected filter criteria. Try clearing search or adjusting the price slider.
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#C9A052] text-[#0B0B0A] px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#E5C77F]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Bottom Back Button to Main Collection */}
      <div className="mt-16 text-center">
        <Link
          href={`/collections/${tierSlug}`}
          className="inline-flex items-center gap-2 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/40 text-[#E5C77F] px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>← Back to Explore Other Categories in {tierName}</span>
        </Link>
      </div>
    </div>
  );
}
