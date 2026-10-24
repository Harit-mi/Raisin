"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, cartSubtotal, itemCount } = useCart();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#121210]/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#C9A052]/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#F4EFE5] bg-[#1B1915] text-[#FFFDF8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C9A052]" />
              <h2 className="font-serif text-lg text-[#E5C77F]">Your Shopping Bag</h2>
              <span className="text-xs bg-[#C9A052]/20 text-[#E5C77F] border border-[#C9A052]/30 rounded-full px-2 py-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#A69A86] hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#F4EFE5] px-5 py-3 border-b border-[#C9A052]/20">
            {diffToFree > 0 ? (
              <p className="text-xs text-[#1B1915] mb-1.5">
                Add <span className="font-semibold text-[#C9A052]">₹{diffToFree.toLocaleString("en-IN")}</span> more to unlock <span className="font-medium">Free Insured Courier</span>!
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-medium flex items-center gap-1 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Congratulations! You qualified for Free Insured White-Glove Shipping.
              </p>
            )}
            <div className="w-full bg-[#E5C77F]/30 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C9A052] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F4EFE5]">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE5] flex items-center justify-center text-[#A69A86] mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg text-[#1B1915] mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-[#77736B] max-w-xs mb-6">
                  Explore our handcrafted resin statement wall art, clocks, and live edge tables to add beauty to your home.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#1B1915] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#121210] font-medium text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#F4EFE5] border border-[#C9A052]/20 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm font-semibold text-[#1B1915] hover:text-[#C9A052] transition-colors leading-tight line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.customization)}
                          className="text-[#A69A86] hover:text-rose-600 p-1 -mr-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.customization && (
                        <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-[#77736B]">
                          {item.customization.size && (
                            <span className="bg-[#F4EFE5] px-1.5 py-0.5 rounded border border-[#C9A052]/20">
                              {item.customization.size}
                            </span>
                          )}
                          {item.customization.color && (
                            <span className="bg-[#F4EFE5] px-1.5 py-0.5 rounded border border-[#C9A052]/20">
                              {item.customization.color}
                            </span>
                          )}
                          {item.customization.personalizationText && (
                            <span className="bg-[#F4EFE5] px-1.5 py-0.5 rounded border border-[#C9A052]/20 italic">
                              &ldquo;{item.customization.personalizationText}&rdquo;
                            </span>
                          )}
                          {item.customization.giftWrapping && (
                            <span className="bg-[#C9A052]/15 text-[#C9A052] font-medium px-1.5 py-0.5 rounded">
                              + Gift Wrap
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#A69A86]/30 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.customization)}
                          className="p-1.5 hover:bg-[#F4EFE5] text-[#1B1915] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#1B1915]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.customization)}
                          className="p-1.5 hover:bg-[#F4EFE5] text-[#1B1915] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-[#1B1915]">
                        ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#F4EFE5] bg-[#FFFDF8] shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#77736B] font-medium">Subtotal</span>
                <span className="font-serif text-lg font-bold text-[#1B1915]">
                  ₹{cartSubtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-[#77736B] mb-4">
                Taxes & final promotional discounts calculated at secure checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-3 border border-[#C9A052] text-[#1B1915] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#F4EFE5] transition-colors"
                >
                  View Full Bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-3 bg-[#1B1915] text-[#E5C77F] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#C9A052] hover:text-[#121210] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#A69A86] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A052]" />
                <span>256-bit Encrypted Checkout · Razorpay / UPI / Cards</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
