"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/lib/constants";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    cartSubtotal,
    couponCode,
    setCouponCode,
    itemCount,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [couponStatus, setCouponStatus] = useState<"idle" | "applying" | "applied" | "error">("idle");
  const [couponMsg, setCouponMsg] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  // Validate cart on server
  useEffect(() => {
    async function validate() {
      if (items.length === 0) return;
      try {
        const payload = {
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            customization: i.customization,
          })),
          couponCode: couponCode || undefined,
        };
        const res = await fetch("/api/cart/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          setDiscountAmount(data.discount || 0);
          if (data.couponCode) {
            setCouponStatus("applied");
            setCouponMsg(`Code ${data.couponCode} applied! Saved ₹${data.discount.toLocaleString("en-IN")}`);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    validate();
  }, [items, couponCode]);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setCouponStatus("applying");
    try {
      const payload = {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          customization: i.customization,
        })),
        couponCode: inputCoupon.trim(),
      };
      const res = await fetch("/api/cart/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.couponCode) {
        setCouponCode(data.couponCode);
        setDiscountAmount(data.discount);
        setCouponStatus("applied");
        setCouponMsg(`Promo code applied! You save ₹${data.discount.toLocaleString("en-IN")}`);
      } else {
        setCouponStatus("error");
        setCouponMsg(data.errors?.[0] || "Invalid or ineligible promotional code.");
      }
    } catch {
      setCouponStatus("error");
      setCouponMsg("Could not validate coupon. Please try again.");
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setInputCoupon("");
    setDiscountAmount(0);
    setCouponStatus("idle");
    setCouponMsg("");
  };

  const discountedSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || couponCode === "FREESHIP";
  const shippingFee = items.length === 0 || isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const finalTotal = discountedSubtotal + shippingFee;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  if (items.length === 0) {
    return (
      <div className="bg-[#FFFDF8] min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F4EFE5] flex items-center justify-center text-[#A69A86] mb-5">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1B1915] mb-2">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-[#77736B] max-w-md mb-8 leading-relaxed">
          Discover our curated gallery of ocean resin canvases, live edge river tables, crystal clocks, and customized keepsake gifts.
        </p>
        <Link
          href="/shop"
          className="bg-[#1B1915] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#121210] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-colors shadow-md"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#F4EFE5] pb-6 mb-8 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              Shopping Bag
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
              Review Selected Pieces ({itemCount})
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-[#1B1915] hover:text-[#C9A052] transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[#F4EFE5] border border-[#C9A052]/30 rounded-2xl p-4 sm:p-5 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            {diffToFree > 0 ? (
              <p className="text-xs text-[#1B1915]">
                Add <strong className="text-[#C9A052]">₹{diffToFree.toLocaleString("en-IN")}</strong> more to qualify for <strong className="font-semibold">Free Insured White-Glove Transit</strong>.
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Your order qualifies for Complimentary White-Glove Insured Delivery!
              </p>
            )}
            <span className="text-[11px] font-semibold text-[#A69A86]">{progressPercent}% unlocked</span>
          </div>
          <div className="w-full bg-[#E5C77F]/30 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#C9A052] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                className="bg-white border border-[#C9A052]/20 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#C9A052]/20 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#77736B] font-medium">
                      {item.product.category}
                    </span>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="block font-serif text-base font-semibold text-[#1B1915] hover:text-[#C9A052] transition-colors leading-snug"
                    >
                      {item.product.name}
                    </Link>

                    {/* Custom specifications */}
                    {item.customization && (
                      <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-[#77736B]">
                        {item.customization.size && (
                          <span className="bg-[#F4EFE5] px-2 py-0.5 rounded border border-[#C9A052]/20">
                            Size: {item.customization.size}
                          </span>
                        )}
                        {item.customization.color && (
                          <span className="bg-[#F4EFE5] px-2 py-0.5 rounded border border-[#C9A052]/20">
                            Color: {item.customization.color}
                          </span>
                        )}
                        {item.customization.personalizationText && (
                          <span className="bg-[#F4EFE5] px-2 py-0.5 rounded border border-[#C9A052]/20 italic">
                            &ldquo;{item.customization.personalizationText}&rdquo;
                          </span>
                        )}
                        {item.customization.giftWrapping && (
                          <span className="bg-[#C9A052]/15 text-[#C9A052] font-semibold px-2 py-0.5 rounded">
                            + Signature Gift Wrap
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-2 text-xs text-[#77736B]">
                      Unit: ₹{item.unitPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                {/* Quantity + Item Total + Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F4EFE5]">
                  <div className="flex items-center border border-[#A69A86]/30 rounded-xl bg-[#FFFDF8] overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1, item.customization)}
                      className="p-2 hover:bg-[#F4EFE5] text-[#1B1915] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1B1915]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1, item.customization)}
                      className="p-2 hover:bg-[#F4EFE5] text-[#1B1915] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-base font-bold text-[#1B1915] block">
                      ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId, item.customization)}
                    className="p-2 text-[#A69A86] hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Coupon Card */}
          <div className="bg-white border border-[#C9A052]/30 rounded-3xl p-6 sm:p-7 shadow-lg sticky top-24">
            <h3 className="font-serif text-xl font-bold text-[#1B1915] mb-5 pb-3 border-b border-[#F4EFE5]">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            <div className="mb-6">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    placeholder="Promo code (e.g. LUXURY10)"
                    disabled={couponStatus === "applied"}
                    className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs uppercase text-[#1B1915] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052] disabled:opacity-60"
                  />
                  <Tag className="w-3.5 h-3.5 text-[#A69A86] absolute right-3 top-3 pointer-events-none" />
                </div>
                {couponStatus === "applied" ? (
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="bg-[#121210] text-[#E5C77F] text-xs px-3 py-2 rounded-xl hover:bg-rose-900 transition-colors font-medium"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={couponStatus === "applying" || !inputCoupon}
                    className="bg-[#1B1915] text-[#E5C77F] text-xs px-4 py-2 rounded-xl hover:bg-[#C9A052] hover:text-[#121210] transition-colors font-semibold uppercase disabled:opacity-50"
                  >
                    Apply
                  </button>
                )}
              </form>

              {couponStatus === "applied" && (
                <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{couponMsg}</span>
                </div>
              )}
              {couponStatus === "error" && (
                <div className="mt-2 text-xs text-rose-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponMsg}</span>
                </div>
              )}

              <div className="mt-3 text-[11px] text-[#A69A86]">
                Available Codes: <code className="bg-[#F4EFE5] px-1.5 py-0.5 rounded text-[#1B1915]">LUXURY10</code> (10% off &gt; ₹2k),{" "}
                <code className="bg-[#F4EFE5] px-1.5 py-0.5 rounded text-[#1B1915]">FREESHIP</code>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs border-t border-[#F4EFE5] pt-4 mb-6">
              <div className="flex justify-between text-[#77736B]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#1B1915]">₹{cartSubtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promotional Discount:</span>
                  <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-[#77736B]">
                <span>Insured Courier Delivery:</span>
                <span className="font-semibold text-[#1B1915]">
                  {shippingFee === 0 ? <span className="text-emerald-700 uppercase font-bold">Complimentary</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-[#77736B]">
                <span>GST (Goods & Services Tax):</span>
                <span className="italic text-[#1B1915]">Included in Price</span>
              </div>

              <div className="pt-3 border-t border-[#F4EFE5] flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#1B1915]">Final Total</span>
                <span className="font-serif text-2xl font-bold text-[#1B1915]">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full bg-[#1B1915] hover:bg-[#C9A052] hover:text-[#121210] text-[#E5C77F] py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 mb-4 group"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#A69A86] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A052]" />
              <span>Razorpay / UPI / Credit & Debit Cards / Net Banking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
