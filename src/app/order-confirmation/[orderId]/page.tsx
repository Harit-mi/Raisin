"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Order } from "@/types";
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  MapPin,
} from "lucide-react";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFDF8]">
        <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFDF8] px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#1B1915] mb-2">Order Not Located</h1>
        <p className="text-xs text-[#77736B] mb-6">
          We could not locate reference &ldquo;{orderId}&rdquo; in our registry.
        </p>
        <Link
          href="/shop"
          className="bg-[#1B1915] text-[#E5C77F] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white border border-[#C9A052]/40 rounded-3xl p-8 sm:p-12 shadow-xl mb-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#C9A052]/15 text-[#C9A052] flex items-center justify-center mx-auto mb-4 border border-[#C9A052]/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A052]">
            Acquisition Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1 mb-2">
            Thank You For Your Patronage!
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] max-w-lg mx-auto mb-6 leading-relaxed">
            Your handcrafted order has been logged into our atelier production queue. A formal receipt and shipment notifications have been dispatched to <strong>{order.customer.email}</strong>.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#121210] text-[#E5C77F] py-3 px-6 rounded-2xl border border-[#C9A052]/40 font-mono text-sm font-bold shadow-inner">
            <span>Order Reference: {order.id}</span>
          </div>

          <div className="mt-8 pt-8 border-t border-[#F4EFE5] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-xs">
            <div>
              <span className="text-[#77736B] block uppercase text-[10px]">Payment Status</span>
              <span className="font-bold text-[#1B1915] flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {order.paymentStatus} via {order.paymentMethod}
              </span>
            </div>

            <div>
              <span className="text-[#77736B] block uppercase text-[10px]">Estimated Dispatch</span>
              <span className="font-bold text-[#1B1915] flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#C9A052]" />
                {order.estimatedDelivery}
              </span>
            </div>

            <div>
              <span className="text-[#77736B] block uppercase text-[10px]">Destination City</span>
              <span className="font-bold text-[#1B1915] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A052]" />
                {order.customer.city}, {order.customer.state}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Card */}
        <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#F4EFE5] mb-6">
            <h2 className="font-serif text-xl font-bold text-[#1B1915]">Purchased Creations</h2>
            <button
              onClick={() => window.print()}
              className="text-xs uppercase tracking-wider font-semibold text-[#1B1915] hover:text-[#C9A052] flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-[#C9A052]" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Items */}
          <div className="divide-y divide-[#F4EFE5] mb-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 flex gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#C9A052]/20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-[#1B1915]">
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#77736B]">
                      Qty: {item.quantity} · Unit: ₹{item.unitPrice.toLocaleString("en-IN")}
                    </div>
                    {item.customization && (
                      <div className="mt-1 flex flex-wrap gap-1 text-[10px] text-[#77736B]">
                        {item.customization.size && (
                          <span className="bg-[#F4EFE5] px-1.5 py-0.2 rounded">Size: {item.customization.size}</span>
                        )}
                        {item.customization.color && (
                          <span className="bg-[#F4EFE5] px-1.5 py-0.2 rounded">Color: {item.customization.color}</span>
                        )}
                        {item.customization.personalizationText && (
                          <span className="bg-[#F4EFE5] px-1.5 py-0.2 rounded italic">&ldquo;{item.customization.personalizationText}&rdquo;</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="font-serif font-bold text-sm text-[#1B1915]">
                  ₹{item.totalPrice.toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="border-t border-[#F4EFE5] pt-4 space-y-2 text-xs text-[#77736B] max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#1B1915]">₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount ({order.couponCode}):</span>
                <span>- ₹{order.discount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Insured Transit:</span>
              <span className="font-semibold text-[#1B1915]">
                {order.shippingFee === 0 ? "Complimentary" : `₹${order.shippingFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-[#F4EFE5] flex justify-between items-baseline font-serif text-base font-bold text-[#1B1915]">
              <span>Amount Paid:</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/track-order?id=${order.id}`}
            className="w-full sm:w-auto bg-[#1B1915] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#121210] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Live Order Status</span>
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto border border-[#C9A052] text-[#1B1915] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#F4EFE5] transition-colors text-center"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
