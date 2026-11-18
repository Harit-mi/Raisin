"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [filterReadyToShip, setFilterReadyToShip] = useState(false);
  const [filterMadeToOrder, setFilterMadeToOrder] = useState(false);
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

  // Update if URL params change
  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category") || "All");
    }
    if (searchParams.get("q")) {
      setSearchQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== "All" && p.category !== selectedCategory) {
          return false;
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
        if (filterReadyToShip && !p.isReadyToShip) return false;
        if (filterMadeToOrder && !p.isMadeToOrder) return false;
        if (filterCustomizable && !p.isCustomizable) return false;
        // Price
        if (p.price > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    sortBy,
    filterReadyToShip,
    filterMadeToOrder,
    filterCustomizable,
    maxPrice,
  ]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
    setFilterReadyToShip(false);
    setFilterMadeToOrder(false);
    setFilterCustomizable(false);
    setMaxPrice(50000);
  };

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#C9A052]/20 pb-8 mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Atelier Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#E2E8F0] mt-1">
            Handcrafted Collection
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2">
            Explore original hand-poured ocean resin wall art, statement tables, crystal geode clocks, and bespoke functional decor.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#161614] border border-[#C9A052]/20 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm">
          {/* Top row: search + sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search art, clocks, tables..."
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
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "newest")}
                className="bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#C9A052]/20 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#121210] text-[#E5C77F] shadow-sm font-semibold"
                    : "bg-[#161614]/60 text-[#E2E8F0] hover:bg-[#161614]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Refine Options & Price Slider */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-[#E2E8F0]">
                <input
                  type="checkbox"
                  checked={filterReadyToShip}
                  onChange={(e) => setFilterReadyToShip(e.target.checked)}
                  className="rounded border-[#A69A86] text-[#C9A052] focus:ring-[#C9A052]"
                />
                <span>Ready to Ship</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#E2E8F0]">
                <input
                  type="checkbox"
                  checked={filterMadeToOrder}
                  onChange={(e) => setFilterMadeToOrder(e.target.checked)}
                  className="rounded border-[#A69A86] text-[#C9A052] focus:ring-[#C9A052]"
                />
                <span>Made to Order</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#E2E8F0]">
                <input
                  type="checkbox"
                  checked={filterCustomizable}
                  onChange={(e) => setFilterCustomizable(e.target.checked)}
                  className="rounded border-[#A69A86] text-[#C9A052] focus:ring-[#C9A052]"
                />
                <span>Customizable Piece</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#94A3B8]">Max: ₹{maxPrice.toLocaleString("en-IN")}</span>
              <input
                type="range"
                min="1500"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 accent-[#C9A052]"
              />
              {(selectedCategory !== "All" ||
                searchQuery ||
                filterReadyToShip ||
                filterMadeToOrder ||
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
          </span>
          <span className="italic">All prices in Indian Rupees (₹ INR)</span>
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
            <h3 className="font-serif text-xl font-bold text-[#E2E8F0] mb-2">No creations matched</h3>
            <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
              We couldn&apos;t find items matching your active filter criteria. Try adjusting the price slider, clearing filters, or requesting a custom commission.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="bg-[#121210] text-[#E5C77F] px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
              <Link
                href="/custom-studio"
                className="border border-[#C9A052] text-[#E2E8F0] px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#161614]"
              >
                Commission Custom
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
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
