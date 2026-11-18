"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Video,
  Phone,
  Building,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function BookConsultationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Custom River Table / Dining Room Commission");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState("11:00 AM - 12:00 PM (IST)");
  const [budgetRange, setBudgetRange] = useState("₹30,000 - ₹75,000");
  const [projectDescription, setProjectDescription] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    "Video Call (Google Meet)" | "WhatsApp Call" | "Phone Call" | "Studio Visit"
  >("Video Call (Google Meet)");

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const timeSlots = [
    "10:00 AM - 11:00 AM (IST)",
    "11:30 AM - 12:30 PM (IST)",
    "02:30 PM - 03:30 PM (IST)",
    "04:00 PM - 05:00 PM (IST)",
    "06:00 PM - 07:00 PM (IST)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !preferredDate || !projectDescription) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          projectType,
          preferredDate,
          preferredTimeSlot,
          budgetRange,
          projectDescription,
          preferredContactMethod,
        }),
      });

      const data = await res.json();
      if (res.ok && data.booking) {
        setConfirmedBookingId(data.booking.id);
      } else {
        setErrorMsg(data.error || "Failed to schedule appointment slot.");
      }
    } catch {
      setErrorMsg("Connection failure. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A052]/15 text-[#C9A052] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Design Atelier Session</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0]">
            Book a 1-on-1 Design Consultation
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
            Discuss timber selection, room lighting harmony, custom pigments, and architectural dimensions with our founder and master resin craftsman.
          </p>
        </div>

        {confirmedBookingId ? (
          /* Confirmation card */
          <div className="bg-[#161614] border border-[#C9A052]/40 rounded-3xl p-8 sm:p-12 shadow-xl text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#C9A052]/15 text-[#C9A052] flex items-center justify-center mx-auto mb-4 border border-[#C9A052]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A052]">
              Consultation Slot Reserved
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#E2E8F0] mt-1 mb-2">
              Appointment Scheduled!
            </h2>
            <p className="text-xs text-[#94A3B8] mb-6">
              Reference Code: <strong className="font-mono text-[#E2E8F0]">{confirmedBookingId}</strong>
            </p>

            <div className="bg-[#0B0B0A] border border-[#C9A052]/20 rounded-2xl p-5 text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Patron:</span>
                <span className="font-semibold text-[#E2E8F0]">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Date & Slot:</span>
                <span className="font-semibold text-[#E2E8F0]">{preferredDate} · {preferredTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Channel:</span>
                <span className="font-semibold text-[#E2E8F0]">{preferredContactMethod}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#CBD5E1] mb-8 leading-relaxed">
              *A Google Calendar invite and meeting link will be dispatched to <strong>{email}</strong> once our studio team approves the agenda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="bg-[#121210] text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#C9A052] hover:text-[#0B0B0A] transition-colors"
              >
                Explore Collection
              </Link>
              <Link
                href="/"
                className="border border-[#C9A052] text-[#E2E8F0] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#161614] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Consultation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Radhika Kapoor"
                  className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-4 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="radhika@example.com"
                  className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-4 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-4 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Project / Commission Nature:
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                >
                  <option value="Custom River Table / Dining Room Commission">Custom River Table / Dining Room</option>
                  <option value="Architectural Large Wall Art Triptych">Architectural Wall Art Installation</option>
                  <option value="Bridal / Varmala Floral Preservation">Bridal Floral Preservation Heirloom</option>
                  <option value="Corporate / Luxury Gifting Bulk">Corporate & Bespoke Gifting</option>
                  <option value="Interior Architect Collaboration">Interior Architect / Designer Collaboration</option>
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-[#C9A052]/20">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Preferred Consultation Date *
                </label>
                <input
                  type="date"
                  required
                  min="2026-01-01"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-4 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Preferred IST Time Slot *
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Method */}
            <div className="pt-3 border-t border-[#C9A052]/20">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-2">
                Preferred Mode of Consultation:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: "Video Call (Google Meet)", icon: Video },
                  { label: "WhatsApp Call", icon: Phone },
                  { label: "Phone Call", icon: Phone },
                  { label: "Studio Visit", icon: Building },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => setPreferredContactMethod(item.label as typeof preferredContactMethod)}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all ${
                        preferredContactMethod === item.label
                          ? "border-[#C9A052] bg-[#121210] text-[#E5C77F] font-semibold"
                          : "border-[#C9A052]/20 bg-[#0B0B0A] text-[#94A3B8] hover:border-[#A69A86]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#C9A052]" />
                      <span className="text-[11px] text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Details */}
            <div className="pt-3 border-t border-[#C9A052]/20">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                Project Vision & Scope Details *
              </label>
              <textarea
                rows={4}
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe your room dimensions, color palette, reference thoughts, or questions for our artisan..."
                className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl p-3.5 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-[#94A3B8] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C9A052]" />
                <span>Complimentary 30-minute private consultation</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#C9A052] hover:bg-[#E5C77F] text-[#0B0B0A] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {submitting ? "Reserving Slot..." : "Confirm & Schedule Appointment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
