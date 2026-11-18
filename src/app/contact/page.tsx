"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Bespoke Commission Inquiry");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to deliver message.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or WhatsApp us directly.");
    }
  };

  return (
    <div className="bg-[#0B0B0A] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Connect with DRL Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#E2E8F0] mt-1">
            Get in Touch
          </h1>
          <p className="text-sm text-[#94A3B8] mt-2">
            Have a custom interior question, wedding preservation inquiry, or want to visit our studio? We would love to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Direct Atelier Coordinates */}
          <div className="bg-[#121210] text-[#FFFDF8] rounded-3xl p-8 border border-[#C9A052]/30 shadow-xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#E5C77F] mb-4">
              Atelier Coordinates
            </h3>

            <div className="space-y-5 text-xs text-[#F4EFE5]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A052] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-white font-serif text-sm">Design Studios:</strong>
                  <span>Atelier 1: MG Road, Bengaluru, Karnataka</span>
                  <br />
                  <span>Gallery 2: Jubilee Hills, Hyderabad, Telangana</span>
                  <p className="text-[10px] text-[#CBD5E1] mt-0.5">*Private visits by prior appointment only.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A052] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-white font-serif text-sm">Direct Phone & WhatsApp:</strong>
                  <span>+91 98765 43210</span>
                  <p className="text-[10px] text-[#CBD5E1] mt-0.5">Quick responses on WhatsApp daily 9 AM - 8 PM IST.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A052] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-white font-serif text-sm">Email Concierge:</strong>
                  <span>concierge@drlresindecor.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A052] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-white font-serif text-sm">Atelier Hours:</strong>
                  <span>Monday – Saturday: 10:00 AM – 7:00 PM IST</span>
                  <br />
                  <span>Sunday: Dedicated to curing & pouring sessions</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C9A052]/20">
              <Link
                href="/book-consultation"
                className="w-full block text-center bg-[#C9A052] text-[#0B0B0A] font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-[#E5C77F] transition-colors"
              >
                Schedule Virtual Consultation
              </Link>
            </div>
          </div>

          {/* Right 2 Columns: Contact Form */}
          <div className="lg:col-span-2 bg-[#161614] border border-[#C9A052]/20 rounded-3xl p-6 sm:p-10 shadow-sm">
            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#C9A052]/15 text-[#C9A052] flex items-center justify-center mx-auto mb-4 border border-[#C9A052]/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#E2E8F0] mb-2">Message Dispatched!</h3>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
                  Thank you for contacting DRL Resin & Décor. Our concierge team will review your message and reply within 24 business hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-[#121210] text-[#E5C77F] px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#E2E8F0] pb-2 border-b border-[#C9A052]/20">
                  Send a Direct Inquiry
                </h3>

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
                      placeholder="e.g. Shalini Roy"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="shalini@example.com"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                      Enquiry Nature
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#C9A052]"
                    >
                      <option value="Bespoke Commission Inquiry">Bespoke Commission Inquiry</option>
                      <option value="Existing Order Tracking Support">Existing Order Tracking Support</option>
                      <option value="Wedding Floral Preservation">Wedding Floral Preservation</option>
                      <option value="Architectural / Bulk Corporate Orders">Architectural & Bulk Orders</option>
                      <option value="Studio Appointment Booking">Studio Appointment Booking</option>
                      <option value="Other Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the piece you have in mind or any questions about our curing process..."
                    className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl p-3.5 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-[#121210] hover:bg-[#C9A052] hover:text-[#0B0B0A] text-[#E5C77F] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === "submitting" ? "Sending..." : "Submit Inquiry to Atelier"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
