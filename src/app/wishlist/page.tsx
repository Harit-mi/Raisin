"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const all: Product[] = await res.json();
          setProducts(all);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#F4EFE5] pb-6 mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Saved Curations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
            Your Wishlist ({wishlistCount})
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] mt-2">
            Keep track of pieces you admire for upcoming home styling or gifting milestones.
          </p>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin mx-auto mb-3" />
          </div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#F4EFE5] flex items-center justify-center text-[#A69A86] mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1B1915] mb-2">No Saved Items</h3>
            <p className="text-xs text-[#77736B] mb-6 leading-relaxed">
              Click the heart icon on any ocean wall art piece, clock, or live edge table to bookmark it here.
            </p>
            <Link
              href="/shop"
              className="bg-[#1B1915] text-[#E5C77F] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-[#C9A052] hover:text-[#121210] transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
