"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  Ban,
} from "lucide-react";
import Link from "next/link";
import { CATALOG_TIERS, findTierForCategory } from "@/lib/catalog";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCategory = searchParams.get("category") || "";
  const urlTier = searchParams.get("tier") || "";
  const initialQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedTier, setSelectedTier] = useState<string>(urlTier || "All");
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || "All");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [filterCustomizable, setFilterCustomizable] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(50000);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Sync with searchParams
  useEffect(() => {
    const cat = searchParams.get("category");
    const tr = searchParams.get("tier");
    const q = searchParams.get("q");

    if (cat) {
      setSelectedCategory(cat);
      const tierObj = findTierForCategory(cat);
      if (tierObj) setSelectedTier(tierObj.name);
    } else if (tr) {
      setSelectedTier(tr);
      setSelectedCategory("All");
    } else {
      setSelectedCategory("All");
      setSelectedTier("All");
    }

    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Handle tier selection
  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    setSelectedCategory("All");
    if (tierName === "All") {
      router.push("/shop");
    } else {
      router.push(`/shop?tier=${encodeURIComponent(tierName)}`);
    }
  };

  // Handle category selection (opens ONLY that category and items)
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const tierObj = findTierForCategory(categoryName);
    if (tierObj) {
      setSelectedTier(tierObj.name);
    }
    router.push(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  // Back to tier or back to all collections
  const handleBackToTier = () => {
    if (selectedCategory !== "All") {
      const tierObj = findTierForCategory(selectedCategory);
      if (tierObj) {
        setSelectedCategory("All");
        setSelectedTier(tierObj.name);
        router.push(`/shop?tier=${encodeURIComponent(tierObj.name)}`);
        return;
      }
    }
    setSelectedCategory("All");
    setSelectedTier("All");
    router.push("/shop");
  };

  const handleBackToAll = () => {
    setSelectedCategory("All");
    setSelectedTier("All");
    router.push("/shop");
  };

  // Active tier object
  const activeTierObj = useMemo(() => {
    if (selectedTier !== "All") {
      return CATALOG_TIERS.find((t) => t.name.toLowerCase() === selectedTier.toLowerCase());
    }
    if (selectedCategory !== "All") {
      return findTierForCategory(selectedCategory);
    }
    return null;
  }, [selectedTier, selectedCategory]);

  // Active category object
  const activeCatObj = useMemo(() => {
    if (selectedCategory === "All") return null;
    for (const t of CATALOG_TIERS) {
      const match = t.categories.find((c) => c.name.toLowerCase() === selectedCategory.toLowerCase());
      if (match) return match;
    }
    return null;
  }, [selectedCategory]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Specific category filter
        if (selectedCategory !== "All") {
          return p.category.toLowerCase() === selectedCategory.toLowerCase();
        }

        // Tier filter (if tier is selected and category is "All")
        if (selectedTier !== "All" && activeTierObj) {
          const tierCatNames = activeTierObj.categories.map((c) => c.name.toLowerCase());
          if (!tierCatNames.includes(p.category.toLowerCase())) {
            return false;
          }
        }

        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchTagline) return false;
        }

        // Availability / Type filters
        if (filterCustomizable && !p.isCustomizable) return false;

        // Price
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
  }, [
    products,
    selectedCategory,
    selectedTier,
    activeTierObj,
    searchQuery,
    sortBy,
    filterCustomizable,
    maxPrice,
  ]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedTier("All");
    setSearchQuery("");
    setSortBy("featured");
    setFilterCustomizable(false);
    setMaxPrice(50000);
    router.push("/shop");
  };

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation & Back Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#C9A052]/20 pb-4">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleBackToAll}
              className={`hover:text-[#E5C77F] transition-colors ${
                selectedTier === "All" && selectedCategory === "All"
                  ? "text-[#E5C77F] font-semibold"
                  : "text-[#94A3B8]"
              }`}
            >
              Collections
            </button>

            {activeTierObj && (
              <>
                <span className="text-[#C9A052] font-mono">/</span>
                <button
                  onClick={() => handleTierSelect(activeTierObj.name)}
                  className={`hover:text-[#E5C77F] transition-colors ${
                    selectedCategory === "All"
                      ? "text-[#E5C77F] font-semibold"
                      : "text-[#94A3B8]"
                  }`}
                >
                  {activeTierObj.name}
                </button>
              </>
            )}

            {selectedCategory !== "All" && (
              <>
                <span className="text-[#C9A052] font-mono">/</span>
                <span className="text-[#E5C77F] font-semibold">{selectedCategory}</span>
              </>
            )}
          </div>

          {/* Explicit Back Buttons */}
          <div className="flex items-center gap-2">
            {selectedCategory !== "All" && activeTierObj && (
              <button
                onClick={handleBackToTier}
                className="inline-flex items-center gap-1.5 bg-[#161614] hover:bg-[#1E1E1B] border border-[#C9A052]/40 text-[#E5C77F] px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-sm group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Back to {activeTierObj.name}</span>
              </button>
            )}

            {(selectedCategory !== "All" || selectedTier !== "All") && (
              <button
                onClick={handleBackToAll}
                className="inline-flex items-center gap-1.5 bg-[#121210] hover:bg-[#161614] border border-[#C9A052]/25 text-[#CBD5E1] hover:text-[#E5C77F] px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>All Collections</span>
              </button>
            )}
          </div>
        </div>

        {/* Page / Category Header */}
        <div className="border-b border-[#C9A052]/20 pb-8 mb-8 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            {selectedCategory !== "All"
              ? activeTierObj?.name || "Curated Category"
              : selectedTier !== "All"
              ? "Collection Tier"
              : "Atelier Catalog"}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#E2E8F0] mt-1">
            {selectedCategory !== "All"
              ? selectedCategory
              : selectedTier !== "All"
              ? selectedTier
              : "Handcrafted Luxury Collections"}
          </h1>

          {activeCatObj && (
            <p className="text-xs sm:text-sm text-[#E5C77F] mt-2 font-medium tracking-wide">
              {activeCatObj.sub}
            </p>
          )}

          {selectedCategory === "All" && activeTierObj && (
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
              {activeTierObj.tagline}
            </p>
          )}

          {selectedCategory === "All" && selectedTier === "All" && (
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
              Explore 3 curated tiers: Signature Collections, Hand-Poured Masterpieces, and Gift Articles.
            </p>
          )}

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

        {/* Level 1: TIER SELECTOR TABS */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleTierSelect("All")}
              className={`text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedTier === "All" && selectedCategory === "All"
                  ? "bg-[#C9A052] text-[#0B0B0A] font-bold shadow-md shadow-[#C9A052]/20"
                  : "bg-[#161614] text-[#CBD5E1] hover:text-[#E5C77F] border border-[#C9A052]/20"
              }`}
            >
              All Collections
            </button>
            {CATALOG_TIERS.map((tier) => (
              <button
                key={tier.name}
                onClick={() => handleTierSelect(tier.name)}
                className={`text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedTier === tier.name && selectedCategory === "All"
                    ? "bg-[#C9A052] text-[#0B0B0A] font-bold shadow-md shadow-[#C9A052]/20"
                    : selectedTier === tier.name
                    ? "bg-[#1E1E1B] text-[#E5C77F] font-semibold border border-[#C9A052]/50"
                    : "bg-[#161614] text-[#CBD5E1] hover:text-[#E5C77F] border border-[#C9A052]/20"
                }`}
              >
                {tier.name}
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: CATEGORY SELECTOR CARDS / PILLS */}
        <div className="bg-[#121210] border border-[#C9A052]/20 rounded-2xl p-4 sm:p-5 mb-8">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-[#C9A052] uppercase tracking-wider font-semibold">
              {selectedTier !== "All"
                ? `${selectedTier} Categories`
                : "Select Category to View Articles"}
            </span>
            {selectedCategory !== "All" && (
              <button
                onClick={handleBackToTier}
                className="text-xs text-[#E5C77F] hover:underline inline-flex items-center gap-1"
              >
                <span>← Show All in {selectedTier !== "All" ? selectedTier : "Collections"}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(selectedTier === "All"
              ? CATALOG_TIERS.flatMap((t) => t.categories)
              : activeTierObj?.categories || []
            ).map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#1C1C19] border-[#E5C77F] shadow-lg ring-1 ring-[#E5C77F]"
                      : "bg-[#161614]/80 border-[#C9A052]/20 hover:border-[#C9A052]/60 hover:bg-[#161614]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-serif text-base font-semibold ${
                        isSelected ? "text-[#E5C77F]" : "text-[#E2E8F0]"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-[#E5C77F] translate-x-1" : "text-[#77736B]"
                      }`}
                    />
                  </div>
                  <span className="text-[11px] text-[#94A3B8] mt-1.5 line-clamp-1">
                    {cat.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#161614] border border-[#C9A052]/20 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creations..."
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
              <span className="text-xs text-[#94A3B8] font-medium whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "newest")
                }
                className="bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
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
              <span>Customizable Piece Only</span>
            </label>

            <div className="flex items-center gap-3">
              <span className="text-[#94A3B8]">Max: ₹{maxPrice.toLocaleString("en-IN")}</span>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 accent-[#C9A052] cursor-pointer"
              />
              {(selectedCategory !== "All" ||
                selectedTier !== "All" ||
                searchQuery ||
                filterCustomizable ||
                maxPrice < 50000) && (
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

        {/* Product Count Status */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#94A3B8]">
          <span>
            Showing <strong className="text-[#E2E8F0]">{filteredProducts.length}</strong> creations
            {selectedCategory !== "All" && (
              <>
                {" "}
                under <span className="text-[#E5C77F]">{selectedCategory}</span>
              </>
            )}
          </span>
          <span className="italic">All articles 100% made to order · In Indian Rupees (₹)</span>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin mx-auto mb-3" />
            <p className="font-serif text-lg text-[#E2E8F0]">Loading the collection...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <SlidersHorizontal className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#E2E8F0] mb-2">No creations found</h3>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
              No articles matched your active filter. Adjust the price slider or reset filters to browse the full atelier catalog.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="bg-[#C9A052] text-[#0B0B0A] px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#E5C77F]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Bottom Back Button */}
        {selectedCategory !== "All" && (
          <div className="mt-16 text-center">
            <button
              onClick={handleBackToTier}
              className="inline-flex items-center gap-2 bg-[#161614] hover:bg-[#1D1D19] border border-[#C9A052]/40 text-[#E5C77F] px-8 py-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Explore Other Categories in {activeTierObj?.name || "Collection"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center bg-[#0B0B0A]">
          <p className="font-serif text-lg text-[#E2E8F0]">Loading Atelier Collection...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
