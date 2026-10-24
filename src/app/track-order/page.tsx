"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Order, OrderStatus } from "@/types";
import {
  Search,
  Truck,
  Package,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const ORDER_STEPS: OrderStatus[] = [
  "Order Placed",
  "Payment Confirmed",
  "In Production",
  "Ready to Ship",
  "Shipped",
  "Delivered",
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const searchOrder = async (idToSearch: string) => {
    if (!idToSearch.trim()) return;
    setLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${idToSearch.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        setErrorMsg(`We could not find an order matching "${idToSearch}". Please verify your reference ID.`);
      }
    } catch {
      setErrorMsg("Network error checking order status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      searchOrder(initialId);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchOrder(orderId);
  };

  const getStepStatus = (step: OrderStatus, currentStatus: OrderStatus) => {
    const currentIndex = ORDER_STEPS.indexOf(currentStatus);
    const stepIndex = ORDER_STEPS.indexOf(step);

    if (currentStatus === "Cancelled" || currentStatus === "Refunded") {
      return "inactive";
    }

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Live Consignment Status
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] mt-2">
            Enter your order reference ID (sent to your confirmation email) to view live atelier production and courier progress.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                placeholder="e.g. DRL-2026-8841"
                className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-4 py-3 pl-11 text-xs uppercase font-mono font-semibold text-[#1B1915] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
              />
              <Search className="w-4 h-4 text-[#C9A052] absolute left-4 top-3.5" />
            </div>
            <button
              type="submit"
              disabled={loading || !orderId.trim()}
              className="bg-[#1B1915] hover:bg-[#C9A052] hover:text-[#121210] text-[#E5C77F] font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-[#C9A052]" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Lookup Order</span>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Order Details & Progress Display */}
        {order && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header Card */}
            <div className="bg-[#1B1915] text-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#C9A052]/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C9A052] font-semibold">
                  Consignment Dossier
                </span>
                <h2 className="font-mono text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {order.id}
                </h2>
                <p className="text-xs text-[#A69A86] mt-1">
                  Recipient: {order.customer.fullName} · {order.customer.city}, {order.customer.state}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase text-[#A69A86] block">Current Status</span>
                <span className="text-xs bg-[#C9A052] text-[#121210] font-bold px-3 py-1 rounded-full uppercase inline-block mt-1">
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#1B1915] mb-6 pb-3 border-b border-[#F4EFE5]">
                Production & Fulfillment Progress
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {ORDER_STEPS.map((step, idx) => {
                  const stepState = getStepStatus(step, order.orderStatus);
                  return (
                    <div
                      key={step}
                      className={`p-3 rounded-2xl border flex flex-col justify-between transition-all ${
                        stepState === "completed"
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : stepState === "current"
                          ? "bg-[#1B1915] border-[#C9A052] text-[#E5C77F] ring-2 ring-[#C9A052]/30"
                          : "bg-[#FFFDF8] border-[#F4EFE5] text-[#77736B] opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                        {stepState === "completed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : stepState === "current" ? (
                          <Clock className="w-3.5 h-3.5 text-[#C9A052] animate-pulse" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-current opacity-40" />
                        )}
                      </div>
                      <span className="text-xs font-semibold leading-tight">{step}</span>
                    </div>
                  );
                })}
              </div>

              {/* Courier Specifics */}
              {order.trackingNumber && (
                <div className="mt-8 pt-6 border-t border-[#F4EFE5] bg-[#F4EFE5]/50 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[#77736B] block">Courier Partner & Air Waybill (AWB):</span>
                    <strong className="text-[#1B1915] text-sm">
                      {order.trackingCarrier || "Blue Dart Express"} · AWB #{order.trackingNumber}
                    </strong>
                  </div>
                  <a
                    href={`https://www.bluedart.com/tracking?trackNumber=${order.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1B1915] text-[#E5C77F] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:bg-[#C9A052] hover:text-[#121210] transition-colors"
                  >
                    <span>External AWB Tracker</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Item Manifest */}
            <div className="bg-white border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#1B1915] mb-4 pb-3 border-b border-[#F4EFE5]">
                Consignment Manifest ({order.items.length} items)
              </h3>

              <div className="divide-y divide-[#F4EFE5]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F4EFE5] flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-[#1B1915]">{item.name}</h4>
                        <span className="text-[11px] text-[#77736B]">
                          Qty: {item.quantity} · Price: ₹{item.unitPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-xs text-[#1B1915]">
                      ₹{item.totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center bg-[#FFFDF8]">
          <p className="font-serif text-lg text-[#1B1915]">Loading Consignment Tracker...</p>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
