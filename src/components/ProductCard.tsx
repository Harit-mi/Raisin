"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { Heart, ShoppingBag, Check, Sparkles, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group flex flex-col bg-[#161614] border border-[#C9A052]/25 hover:border-[#E5C77F] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#C9A052]/10 transition-all duration-300">
      {/* Image Container with Badges & Wishlist Button */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-[#121210]">
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isReadyToShip ? (
            <span className="bg-[#0B0B0A]/90 backdrop-blur-sm text-[#E5C77F] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#C9A052]/40 shadow-sm">
              Ready to Ship
            </span>
          ) : (
            <span className="bg-[#0B0B0A]/90 backdrop-blur-sm text-[#E2E8F0] text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#94A3B8]/30 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#C9A052]" />
              Made to Order
            </span>
          )}

          {discountPercent && (
            <span className="bg-gradient-to-r from-[#C9A052] to-[#E5C77F] text-[#0B0B0A] font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full w-fit shadow-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-200 z-10 shadow-md border ${
            isWishlisted
              ? "bg-[#0B0B0A] border-rose-500/60 text-rose-400"
              : "bg-[#121210]/85 border-[#C9A052]/30 text-[#E2E8F0] hover:bg-[#0B0B0A] hover:border-[#E5C77F] hover:text-rose-400"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500" : ""}`} />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:block z-10">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full bg-gradient-to-r from-[#C9A052] to-[#E5C77F] hover:from-[#E5C77F] hover:to-[#C9A052] text-[#0B0B0A] py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-medium">
              {product.category}
            </span>
            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-[#E5C77F]">
                <Star className="w-3 h-3 fill-[#C9A052] text-[#C9A052]" />
                <span className="font-semibold text-[#E2E8F0]">{product.rating}</span>
                <span className="text-[#94A3B8]">({product.reviewCount})</span>
              </div>
            )}
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-base font-semibold text-[#E2E8F0] hover:text-[#E5C77F] transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#94A3B8] line-clamp-2 mb-3 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-[#C9A052]/15">
            <span className="font-serif text-lg font-bold text-[#E5C77F]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#94A3B8] line-through">
                ₹{product.compareAtPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full mt-3 sm:hidden bg-gradient-to-r from-[#C9A052] to-[#E5C77F] text-[#0B0B0A] py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAdding ? "Added to Bag" : "Add to Bag"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
