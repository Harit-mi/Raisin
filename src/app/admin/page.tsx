"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Product,
  Order,
  CustomStudioRequest,
  ConsultationBooking,
  ContactMessage,
  OrderStatus,
} from "@/types";
import {
  Lock,
  Package,
  TrendingUp,
  ShoppingBag,
  Sliders,
  CalendarCheck,
  Mail,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  Truck,
  Sparkles,
  ShieldCheck,
  Eye,
  Megaphone,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  // Store data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomStudioRequest[]>([]);
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "custom" | "bookings">("overview");

  // New Product Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Resin Wall Art");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdDimensions, setNewProdDimensions] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Atelier PIN is 1234
    if (pin === "1234" || pin === "admin") {
      setIsAuthenticated(true);
      setPinError("");
      loadAllAdminData();
    } else {
      setPinError("Incorrect Atelier Access PIN. (Default demo PIN is 1234)");
    }
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [pRes, oRes, cRes, bRes, mRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
        fetch("/api/custom-requests"),
        fetch("/api/bookings"),
        fetch("/api/contact"),
      ]);

      if (pRes.ok) setProducts(await pRes.json());
      if (oRes.ok) setOrders(await oRes.json());
      if (cRes.ok) setCustomRequests(await cRes.json());
      if (bRes.ok) setBookings(await bRes.json());
      if (mRes.ok) setMessages(await mRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Status updates
  const handleOrderStatusChange = async (orderId: string, newStatus: OrderStatus, trackingNo?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, trackingNumber: trackingNo }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus, trackingNumber: trackingNo || o.trackingNumber } : o))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCustomQuoteUpdate = async (id: string, quote: number, status: CustomStudioRequest["status"]) => {
    try {
      const res = await fetch("/api/custom-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminQuotePrice: quote, status }),
      });
      if (res.ok) {
        setCustomRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, adminQuotePrice: quote, status } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookingStatusChange = async (id: string, status: ConsultationBooking["status"]) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProdName,
          category: newProdCategory,
          price: Number(newProdPrice),
          description: newProdDesc,
          dimensions: newProdDimensions || "Standard Dimensions",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts((prev) => [data.product, ...prev]);
        setShowAddProduct(false);
        setNewProdName("");
        setNewProdPrice("");
        setNewProdDesc("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to retire this piece from the catalog?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // PIN Login Gate
  if (!isAuthenticated) {
    return (
      <div className="bg-[#0B0B0A] min-h-[75vh] flex items-center justify-center px-4">
        <div className="bg-[#161614] border border-[#C9A052]/40 rounded-3xl p-8 sm:p-10 shadow-2xl max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-[#121210] text-[#E5C77F] flex items-center justify-center mx-auto mb-4 border border-[#C9A052]/40">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#C9A052] font-semibold">
            Restricted Access
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#E2E8F0] mt-1 mb-2">
            DRL Atelier Portal
          </h1>
          <p className="text-xs text-[#94A3B8] mb-6">
            Enter your administrative master PIN to manage catalog products, live orders, custom requests, and consultations.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (Demo: 1234)"
              autoFocus
              className="w-full text-center tracking-widest font-mono text-base bg-[#0B0B0A] border border-[#A69A86]/40 rounded-xl px-4 py-3 text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
            />

            {pinError && <p className="text-xs text-rose-600 font-medium">{pinError}</p>}

            <button
              type="submit"
              className="w-full bg-[#121210] hover:bg-[#C9A052] hover:text-[#0B0B0A] text-[#E5C77F] font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all shadow-md"
            >
              Access Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#C9A052]/20 text-[10px] text-[#CBD5E1]">
            Tip: Use PIN <strong>1234</strong> to enter the demo administration console.
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === "Paid" ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled").length;
  const pendingCustom = customRequests.filter((r) => r.status === "Under Review").length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending Confirmation").length;
  const lowStockProducts = products.filter((p) => p.inventoryCount <= 2);

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-[#121210] text-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#C9A052]/30 shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#E5C77F] font-semibold">
                Live Atelier Management
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Store Master Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setPin("");
              }}
              className="bg-[#121210] hover:bg-[#C9A052] hover:text-[#0B0B0A] text-[#E5C77F] border border-[#C9A052]/30 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Lock Console
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#C9A052]/20 pb-2 mb-8 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "products", label: `Catalog (${products.length})`, icon: ShoppingBag },
            { id: "orders", label: `Orders (${orders.length})`, icon: Package },
            { id: "custom", label: `Custom Studio (${customRequests.length})`, icon: Sliders },
            { id: "bookings", label: `Consultations (${bookings.length})`, icon: CalendarCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#121210] text-[#E5C77F] shadow-sm"
                    : "bg-[#161614] text-[#94A3B8] hover:text-[#E2E8F0]"
                }`}
              >
                <Icon className="w-4 h-4 text-[#C9A052]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#161614] p-6 rounded-3xl border border-[#C9A052]/20 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] block">Gross Revenue</span>
                <span className="font-serif text-3xl font-bold text-[#E2E8F0] block mt-1">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-2 block">
                  From {orders.length} verified purchases
                </span>
              </div>

              <div className="bg-[#161614] p-6 rounded-3xl border border-[#C9A052]/20 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] block">Active Production</span>
                <span className="font-serif text-3xl font-bold text-[#E2E8F0] block mt-1">
                  {pendingOrders}
                </span>
                <span className="text-[11px] text-amber-700 font-semibold mt-2 block">
                  Orders in pouring / curing
                </span>
              </div>

              <div className="bg-[#161614] p-6 rounded-3xl border border-[#C9A052]/20 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] block">Custom Requests</span>
                <span className="font-serif text-3xl font-bold text-[#E2E8F0] block mt-1">
                  {pendingCustom}
                </span>
                <span className="text-[11px] text-[#C9A052] font-semibold mt-2 block">
                  Awaiting formal quotation
                </span>
              </div>

              <div className="bg-[#161614] p-6 rounded-3xl border border-[#C9A052]/20 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] block">Upcoming Consultations</span>
                <span className="font-serif text-3xl font-bold text-[#E2E8F0] block mt-1">
                  {pendingBookings}
                </span>
                <span className="text-[11px] text-blue-700 font-semibold mt-2 block">
                  Pending client confirmation
                </span>
              </div>
            </div>

            {/* Low stock alerts */}
            {lowStockProducts.length > 0 && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong className="block font-semibold">Low Stock Inventory Warning:</strong>
                  <span>
                    {lowStockProducts.map((p) => `${p.name} (${p.inventoryCount} left)`).join(", ")}. Consider pouring a new batch.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">Catalog Management</h2>
              <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="bg-[#121210] hover:bg-[#C9A052] hover:text-[#0B0B0A] text-[#E5C77F] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Add Product Modal Form */}
            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="bg-[#161614] p-6 rounded-3xl border border-[#C9A052]/40 shadow-lg space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#E2E8F0]">List a New Creation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Creation Name *</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="e.g. Emerald Shoreline Clock"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Category *</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    >
                      <option value="Resin Wall Art">Resin Wall Art</option>
                      <option value="Resin Clocks">Resin Clocks</option>
                      <option value="Resin Tables & Furniture">Resin Tables & Furniture</option>
                      <option value="Resin Coasters">Resin Coasters</option>
                      <option value="Resin Trays">Resin Trays</option>
                      <option value="Personalized Keepsakes">Personalized Keepsakes</option>
                      <option value="Serving Boards">Serving Boards</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Price (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      placeholder="7500"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Story / Description</label>
                  <textarea
                    rows={2}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Describe resin layers, pigments, wood substrate..."
                    className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl p-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="px-4 py-2 text-xs text-[#94A3B8] hover:text-[#E2E8F0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C9A052] text-[#0B0B0A] font-bold text-xs uppercase tracking-wider px-6 py-2 rounded-xl hover:bg-[#E5C77F]"
                  >
                    Publish to Store
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121210] text-[#E5C77F] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Piece</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Mode</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C9A052]/15 text-[#E2E8F0]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#0B0B0A]">
                        <td className="p-4 flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#161614] flex-shrink-0">
                            <Image src={p.images[0] || "/placeholder.jpg"} alt={p.name} fill className="object-cover" unoptimized />
                          </div>
                          <div>
                            <span className="font-semibold block">{p.name}</span>
                            <span className="text-[10px] text-[#94A3B8]">{p.sku}</span>
                          </div>
                        </td>
                        <td className="p-4 text-[#94A3B8]">{p.category}</td>
                        <td className="p-4 font-bold">₹{p.price.toLocaleString("en-IN")}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            p.inventoryCount <= 2 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {p.inventoryCount} units
                          </span>
                        </td>
                        <td className="p-4 text-[#94A3B8]">
                          {p.isReadyToShip ? "Ready to Ship" : "Made to Order"}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <Link
                            href={`/product/${p.slug}`}
                            className="p-1.5 text-[#C9A052] hover:text-[#E2E8F0] inline-block"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-[#CBD5E1] hover:text-rose-600 inline-block"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">Customer Orders ({orders.length})</h2>
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#C9A052]/20 gap-2">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#E2E8F0]">{o.id}</span>
                      <span className="text-xs text-[#94A3B8] ml-2">
                        {o.customer.fullName} ({o.customer.email})
                      </span>
                    </div>

                    {/* Status updater */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-[#94A3B8]">Status:</span>
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleOrderStatusChange(o.id, e.target.value as OrderStatus)}
                        className="bg-[#0B0B0A] border border-[#C9A052]/40 rounded-xl px-3 py-1.5 text-xs text-[#E2E8F0] font-semibold"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Payment Confirmed">Payment Confirmed</option>
                        <option value="In Production">In Production</option>
                        <option value="Ready to Ship">Ready to Ship</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs text-[#94A3B8] grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <strong>Destination:</strong> {o.customer.address}, {o.customer.city}, {o.customer.pincode}
                    </div>
                    <div>
                      <strong>Payment:</strong> {o.paymentMethod} ({o.paymentStatus})
                    </div>
                    <div>
                      <strong>Total:</strong> ₹{o.total.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOM STUDIO REQUESTS */}
        {activeTab === "custom" && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">Custom Commissions ({customRequests.length})</h2>
            <div className="space-y-4">
              {customRequests.map((req) => (
                <div key={req.id} className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#C9A052]/20">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#E2E8F0]">{req.id}</span>
                      <h4 className="font-serif text-base font-bold text-[#E2E8F0] mt-0.5">{req.productType}</h4>
                    </div>
                    <span className="text-xs bg-[#C9A052]/15 text-[#C9A052] font-semibold px-2.5 py-1 rounded-full">
                      {req.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#94A3B8] space-y-1">
                    <div><strong>Patron:</strong> {req.customerName} ({req.email} · {req.phone})</div>
                    <div><strong>Specs:</strong> {req.preferredSize} · {req.shape} · {req.primaryColor}</div>
                    {req.personalizationText && <div><strong>Engraving:</strong> &ldquo;{req.personalizationText}&rdquo;</div>}
                    {req.additionalInstructions && <div><strong>Notes:</strong> {req.additionalInstructions}</div>}
                  </div>

                  <div className="pt-3 border-t border-[#C9A052]/20 flex items-center justify-between text-xs">
                    <span>Client Estimate: ₹{req.estimatedPrice.toLocaleString("en-IN")}</span>
                    <button
                      onClick={() => {
                        const quote = prompt("Enter formal quoted amount in ₹ INR:", String(req.adminQuotePrice || req.estimatedPrice));
                        if (quote) handleCustomQuoteUpdate(req.id, Number(quote), "Quotation Sent");
                      }}
                      className="bg-[#121210] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#0B0B0A] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                    >
                      {req.adminQuotePrice ? `Update Quote (₹${req.adminQuotePrice})` : "Issue Formal Quote"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#E2E8F0]">Design Appointments ({bookings.length})</h2>
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#C9A052]/20">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#E2E8F0]">{b.id}</span>
                      <h4 className="font-serif text-base font-bold text-[#E2E8F0] mt-0.5">{b.projectType}</h4>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
                      {b.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#94A3B8] space-y-1">
                    <div><strong>Patron:</strong> {b.fullName} ({b.email} · {b.phone})</div>
                    <div><strong>Slot:</strong> {b.preferredDate} at {b.preferredTimeSlot}</div>
                    <div><strong>Method:</strong> {b.preferredContactMethod}</div>
                    <div><strong>Description:</strong> {b.projectDescription}</div>
                  </div>

                  <div className="pt-3 border-t border-[#C9A052]/20 flex items-center justify-end gap-2 text-xs">
                    <button
                      onClick={() => handleBookingStatusChange(b.id, "Confirmed")}
                      className="bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-semibold"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleBookingStatusChange(b.id, "Rescheduled")}
                      className="border border-[#A69A86] px-3 py-1.5 rounded-xl text-[#94A3B8]"
                    >
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
