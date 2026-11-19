"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, couponCode, cartSubtotal } = useCart();

  // Customer Shipping Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Karnataka");
  const [pincode, setPincode] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Razorpay">("Razorpay");

  // Server Calculation
  const [serverCalculation, setServerCalculation] = useState<{
    items: unknown[];
    subtotal: number;
    discount: number;
    shippingFee: number;
    total: number;
    couponCode?: string;
  } | null>(null);

  const [loadingCalculation, setLoadingCalculation] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sandboxNotice, setSandboxNotice] = useState("");

  // Re-verify cart on server on mount
  useEffect(() => {
    async function loadServerVerification() {
      if (items.length === 0) {
        setLoadingCalculation(false);
        return;
      }
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
          setServerCalculation(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCalculation(false);
      }
    }
    loadServerVerification();
  }, [items, couponCode]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city || !pincode) {
      setErrorMessage("Please complete all required shipping fields.");
      return;
    }

    setProcessingOrder(true);
    setErrorMessage("");
    setSandboxNotice("");

    try {
      let paymentStatus: "Paid" | "Pending" = "Paid";
      let razorpayOrderId: string | undefined = undefined;
      let razorpayPaymentId: string | undefined = undefined;

      if (paymentMethod === "Razorpay") {
        // Step 1: Create Payment Order on backend
        const rzpCreateRes = await fetch("/api/payments/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
              customization: i.customization,
            })),
            couponCode,
          }),
        });

        const rzpData = await rzpCreateRes.json();
        if (!rzpCreateRes.ok) {
          throw new Error(rzpData.error || "Failed to initialize payment gateway");
        }

        razorpayOrderId = rzpData.orderId;

        // Step 2: Verification
        const verifyRes = await fetch("/api/payments/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            razorpay_signature: "sandbox_valid_sig",
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.verified) {
          throw new Error("Payment signature verification failed");
        }

        razorpayPaymentId = verifyData.paymentId;
        paymentStatus = "Paid";
      } else {
        // Cash on delivery
        paymentStatus = "Pending";
      }

      // Step 3: Create Verified Order in Database
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName,
            email,
            phone,
            address,
            city,
            state: stateName,
            pincode,
            country: "India",
            giftNote: giftNote.trim() || undefined,
            deliveryInstructions: deliveryInstructions.trim() || undefined,
          },
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            customization: i.customization,
          })),
          couponCode,
          paymentMethod,
          paymentStatus,
          razorpayOrderId,
          razorpayPaymentId,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order) {
        throw new Error(orderData.error || "Order generation failed");
      }

      // Clear local bag & navigate to confirmation
      clearCart();
      router.push(`/order-confirmation/${orderData.order.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment processing error";
      setErrorMessage(msg);
      setProcessingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#0B0B0A] min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#E2E8F0] mb-2">No Items to Checkout</h1>
        <p className="text-xs text-[#94A3B8] mb-6">
          Your shopping bag is currently empty. Please select a handcrafted piece first.
        </p>
        <Link
          href="/shop"
          className="bg-[#121210] text-[#E5C77F] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const finalSubtotal = serverCalculation ? serverCalculation.subtotal : cartSubtotal;
  const finalDiscount = serverCalculation ? serverCalculation.discount : 0;
  const finalShipping = serverCalculation ? serverCalculation.shippingFee : 0;
  const finalTotal = serverCalculation
    ? serverCalculation.total
    : Math.max(0, finalSubtotal - finalDiscount) + finalShipping;

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#C9A052]/20 pb-6 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              Secure Checkout
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#E2E8F0] mt-1">
              Delivery & Payment
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <Lock className="w-4 h-4 text-[#C9A052]" />
            <span>256-bit SSL Protected</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left 2 Cols: Shipping & Payment Options */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Contact & Shipping Details */}
            <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#E2E8F0] mb-4 pb-3 border-b border-[#C9A052]/20">
                1. Delivery Destination
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                    Email Address (for order tracking & receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priyanshu@example.com"
                    className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                    Street Address & Apartment / Landmark *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 502, Orchid Heights, Road No. 10..."
                    className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl p-3 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      State *
                    </label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    >
                      {[
                        "Andhra Pradesh",
                        "Delhi NCR",
                        "Goa",
                        "Gujarat",
                        "Haryana",
                        "Karnataka",
                        "Kerala",
                        "Maharashtra",
                        "Punjab",
                        "Rajasthan",
                        "Tamil Nadu",
                        "Telangana",
                        "Uttar Pradesh",
                        "West Bengal",
                      ].map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="560001"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Gift Note / Congratulatory Message (Optional):
                    </label>
                    <input
                      type="text"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Special note handwritten on gold embossed stationery..."
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Courier Delivery Instructions (Optional):
                    </label>
                    <input
                      type="text"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="e.g. Leave with security / Call prior to arrival"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C9A052]/20">
                <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">
                  2. Payment Method
                </h2>
                <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                  NO Cash on Delivery (COD)
                </span>
              </div>

              <div className="space-y-3">
                {/* Razorpay Gateway */}
                <label
                  className="flex items-start gap-3.5 p-4 rounded-2xl border border-[#C9A052] bg-[#C9A052]/10 ring-1 ring-[#C9A052] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={true}
                    readOnly
                    className="mt-1 accent-[#C9A052]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#E2E8F0]">
                        100% Pre-Paid Online Payment (Razorpay / UPI / Cards)
                      </span>
                      <span className="text-[10px] bg-[#121210] text-[#E5C77F] font-bold px-2 py-0.5 rounded">
                        UPI / Cards / NetBanking
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1 leading-relaxed">
                      All pieces are exclusively bespoke and made to order upon confirmed pre-payment. Instant verification via Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard, and NetBanking.
                    </p>
                  </div>
                </label>

                {/* Important Notice on Custom Craft */}
                <div className="p-3.5 rounded-xl bg-[#0B0B0A] border border-[#C9A052]/30 space-y-1 text-xs">
                  <p className="font-bold text-[#E5C77F]">
                    ✦ Notice: Preparation time is 15 to 20 days depending on article.
                  </p>
                  <p className="text-amber-400/90 font-medium">
                    ✦ Policy Notice: NO Exchange · NO Return for handcrafted customized art.
                  </p>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Right Column: Order Review & Placement Card */}
          <div className="bg-[#161614] border border-[#C9A052]/30 rounded-3xl p-6 shadow-xl sticky top-24">
            <h3 className="font-serif text-lg font-bold text-[#E2E8F0] mb-4 pb-3 border-b border-[#C9A052]/20">
              Order Summary ({items.length} items)
            </h3>

            {/* Compact Item List */}
            <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#C9A052]/15 pr-1 mb-6">
              {items.map((item, idx) => (
                <div key={idx} className="pt-2 first:pt-0 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#161614] flex-shrink-0 border border-[#C9A052]/20">
                    <Image
                      src={item.product.images[0] || "/placeholder.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#E2E8F0] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] text-[#94A3B8]">
                      Qty: {item.quantity} · ₹{item.unitPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#E2E8F0]">
                    ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-[#C9A052]/20 pt-4 mb-6">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Bag Subtotal:</span>
                <span className="font-semibold text-[#E2E8F0]">₹{finalSubtotal.toLocaleString("en-IN")}</span>
              </div>

              {finalDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promotional Savings:</span>
                  <span>- ₹{finalDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-[#94A3B8]">
                <span>White-Glove Insured Transit:</span>
                <span className="font-semibold text-[#E2E8F0]">
                  {finalShipping === 0 ? <span className="text-emerald-700 uppercase font-bold">Complimentary</span> : `₹${finalShipping}`}
                </span>
              </div>

              <div className="pt-3 border-t border-[#C9A052]/20 flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#E2E8F0]">Payable Total</span>
                <span className="font-serif text-2xl font-bold text-[#E2E8F0]">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processingOrder || loadingCalculation}
              className="w-full bg-[#121210] hover:bg-[#C9A052] hover:text-[#0B0B0A] text-[#E5C77F] py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processingOrder ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#C9A052]" />
                  <span>Verifying Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Confirm Order & Pay · ₹{finalTotal.toLocaleString("en-IN")}</span>
                </>
              )}
            </button>

            <div className="mt-4 pt-4 border-t border-[#C9A052]/20 text-center text-[10px] text-[#CBD5E1] space-y-1.5">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A052]" />
                <span>100% Anti-Fraud & Transit Insurance Guarantee</span>
              </div>
              <p>Delivery time: ~5-7 business days across India.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
