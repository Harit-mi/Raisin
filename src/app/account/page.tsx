"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Order, CustomStudioRequest, ConsultationBooking } from "@/types";
import {
  User,
  Package,
  Sliders,
  CalendarCheck,
  MapPin,
  Truck,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "custom" | "consultations" | "addresses">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomStudioRequest[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersRes, customRes, bookingsRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/custom-requests"),
          fetch("/api/bookings"),
        ]);

        if (ordersRes.ok) setOrders(await ordersRes.json());
        if (customRes.ok) setCustomRequests(await customRes.json());
        if (bookingsRes.ok) setBookings(await bookingsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getStatusColor = (status: Order["orderStatus"]) => {
    switch (status) {
      case "Payment Confirmed":
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "In Production":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "Shipped":
      case "Ready to Ship":
        return "bg-blue-100 text-blue-900 border-blue-300";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-[#161614] text-[#E2E8F0] border-[#C9A052]/30";
    }
  };

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#121210] text-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#C9A052]/30 shadow-xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-[#C9A052]/20 border border-[#C9A052] flex items-center justify-center text-[#E5C77F] flex-shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#C9A052] font-semibold">
                Verified Atelier Patron
              </span>
              <h1 className="font-serif text-2xl font-bold text-white">
                Pooja Sharma
              </h1>
              <p className="text-xs text-[#CBD5E1]">pooja.sharma@example.com · +91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/track-order"
              className="bg-[#C9A052] text-[#0B0B0A] font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-[#E5C77F] transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" />
              <span>Track By Reference</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#C9A052]/20 pb-2 mb-8 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-[#121210] text-[#E5C77F] shadow-sm"
                : "bg-[#161614] text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("custom")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "custom"
                ? "bg-[#121210] text-[#E5C77F] shadow-sm"
                : "bg-[#161614] text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Custom Requests ({customRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "consultations"
                ? "bg-[#121210] text-[#E5C77F] shadow-sm"
                : "bg-[#161614] text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Design Consultations ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "addresses"
                ? "bg-[#121210] text-[#E5C77F] shadow-sm"
                : "bg-[#161614] text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-12 text-center">
                <Package className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#E2E8F0]">No Orders Placed Yet</h3>
                <p className="text-xs text-[#94A3B8] mb-6">
                  You have not placed any orders yet. Discover our signature ocean resin creations.
                </p>
                <Link
                  href="/shop"
                  className="bg-[#121210] text-[#E5C77F] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 shadow-sm hover:border-[#C9A052]/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#C9A052]/20 gap-3 mb-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#E2E8F0]">
                        {order.id}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] ml-3">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                      <Link
                        href={`/track-order?id=${order.id}`}
                        className="text-xs text-[#C9A052] hover:text-[#E2E8F0] font-semibold flex items-center gap-1 ml-2"
                      >
                        <span>Live Tracking</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="divide-y divide-[#C9A052]/15">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#161614] flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.jpg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-semibold text-[#E2E8F0]">{item.name}</h4>
                            <div className="text-[11px] text-[#94A3B8]">
                              Qty: {item.quantity} · ₹{item.unitPrice.toLocaleString("en-IN")}
                              {item.customization?.size && ` · Size: ${item.customization.size}`}
                            </div>
                          </div>
                        </div>

                        <span className="font-serif font-bold text-xs text-[#E2E8F0]">
                          ₹{item.totalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#C9A052]/20 flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Total Paid:</span>
                    <span className="font-serif font-bold text-base text-[#E2E8F0]">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: CUSTOM REQUESTS */}
        {activeTab === "custom" && (
          <div className="space-y-6">
            {customRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#C9A052]/20">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#E2E8F0]">{req.id}</span>
                    <h3 className="font-serif text-base font-bold text-[#E2E8F0] mt-0.5">{req.productType}</h3>
                  </div>
                  <span className="text-xs bg-[#C9A052]/15 text-[#C9A052] font-semibold px-3 py-1 rounded-full border border-[#C9A052]/30">
                    Status: {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-[#0B0B0A] rounded-xl border border-[#C9A052]/20">
                    <span className="text-[10px] text-[#94A3B8] block">Dimensions</span>
                    <span className="font-semibold text-[#E2E8F0]">{req.preferredSize}</span>
                  </div>
                  <div className="p-2.5 bg-[#0B0B0A] rounded-xl border border-[#C9A052]/20">
                    <span className="text-[10px] text-[#94A3B8] block">Color Theme</span>
                    <span className="font-semibold text-[#E2E8F0]">{req.primaryColor}</span>
                  </div>
                  <div className="p-2.5 bg-[#0B0B0A] rounded-xl border border-[#C9A052]/20">
                    <span className="text-[10px] text-[#94A3B8] block">Estimated Range</span>
                    <span className="font-semibold text-[#E2E8F0]">~ ₹{req.estimatedPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-2.5 bg-[#0B0B0A] rounded-xl border border-[#C9A052]/20">
                    <span className="text-[10px] text-[#94A3B8] block">Artisan Quotation</span>
                    <span className="font-semibold text-[#C9A052]">
                      {req.adminQuotePrice ? `₹${req.adminQuotePrice.toLocaleString("en-IN")}` : "Under Review"}
                    </span>
                  </div>
                </div>

                {req.adminNotes && (
                  <div className="p-3 bg-[#161614]/50 rounded-xl text-xs text-[#E2E8F0] border border-[#C9A052]/20">
                    <strong>Atelier Note:</strong> {req.adminNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CONSULTATIONS */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#C9A052]/20">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#E2E8F0]">{b.id}</span>
                    <h3 className="font-serif text-base font-bold text-[#E2E8F0] mt-0.5">{b.projectType}</h3>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full">
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-[#94A3B8] space-y-1">
                  <div>
                    <strong>Date & Time:</strong> {b.preferredDate} · {b.preferredTimeSlot}
                  </div>
                  <div>
                    <strong>Mode:</strong> {b.preferredContactMethod}
                  </div>
                  <div>
                    <strong>Agenda:</strong> {b.projectDescription}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SAVED ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#161614] border border-[#C9A052]/30 rounded-3xl p-6 shadow-sm relative">
              <span className="text-[10px] bg-[#C9A052] text-[#0B0B0A] font-bold px-2 py-0.5 rounded-full uppercase absolute top-6 right-6">
                Default
              </span>
              <h4 className="font-serif text-base font-bold text-[#E2E8F0] mb-2">Primary Residence</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                Pooja Sharma <br />
                Flat 402, Signature Towers, Road 36, Jubilee Hills <br />
                Hyderabad, Telangana - 500033 <br />
                Phone: +91 98765 43210
              </p>
              <button className="text-xs text-[#C9A052] font-semibold hover:underline">
                Edit Address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
