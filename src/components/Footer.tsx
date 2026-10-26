"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for joining our private circle.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription could not be processed.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection issue. Please try again later.");
    }
  };

  return (
    <footer className="bg-[#121210] text-[#FFFDF8] border-t border-[#C9A052]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C9A052]/15">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Logo theme="dark" size="lg" />
            <p className="mt-4 text-sm text-[#A69A86] max-w-sm leading-relaxed">
              DRL Resin & Décor transforms raw timber, crystal minerals, and optical resin into timeless artistic statements. Each piece is hand-poured in our artisan atelier with boundless passion and precision.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#E5C77F] border border-[#C9A052]/30 bg-[#C9A052]/10 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A052]" />
                100% Handcrafted in India
              </span>
            </div>
            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3 text-[#A69A86]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1B1915] border border-[#C9A052]/20 flex items-center justify-center hover:text-[#E5C77F] hover:border-[#C9A052] transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1B1915] border border-[#C9A052]/20 flex items-center justify-center hover:text-[#E5C77F] hover:border-[#C9A052] transition-colors"
                aria-label="Facebook"
              >
                <svg width="16" height="16" className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1B1915] border border-[#C9A052]/20 flex items-center justify-center hover:text-[#E5C77F] hover:border-[#C9A052] transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#E5C77F] font-semibold mb-4">
              Artisan Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A69A86]">
              <li>
                <Link href="/shop?category=Resin+Wall+Art" className="hover:text-white transition-colors">
                  Ocean Wall Art
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Resin+Clocks" className="hover:text-white transition-colors">
                  Geode Luxury Clocks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Resin+Tables+%26+Furniture" className="hover:text-white transition-colors">
                  Live Edge River Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Resin+Coasters" className="hover:text-white transition-colors">
                  Coaster Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Resin+Trays" className="hover:text-white transition-colors">
                  Vanity & Serving Trays
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Personalized+Keepsakes" className="hover:text-white transition-colors">
                  Wedding Keepsakes
                </Link>
              </li>
            </ul>
          </div>

          {/* Bespoke & Client Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#E5C77F] font-semibold mb-4">
              Bespoke Services
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A69A86]">
              <li>
                <Link href="/custom-studio" className="hover:text-[#E5C77F] font-medium transition-colors">
                  Custom Studio 3D
                </Link>
              </li>
              <li>
                <Link href="/book-consultation" className="hover:text-white transition-colors">
                  Book Art Consultation
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Resin Care & FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  Insured Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition-colors">
                  Returns & Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Atelier Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#E5C77F] font-semibold mb-4">
              Private Atelier Circle
            </h4>
            <p className="text-xs text-[#A69A86] mb-3 leading-relaxed">
              Receive previews of one-of-a-kind gallery pieces and invitations to seasonal commissions.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#1B1915] border border-[#C9A052]/30 rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1 top-1 bg-[#C9A052] text-[#121210] p-1.5 rounded-md hover:bg-[#E5C77F] transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-1.5 text-xs text-[#E5C77F]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{message}</span>
                </div>
              )}
              {status === "error" && <p className="text-xs text-rose-400">{message}</p>}
            </form>

            <div className="mt-5 pt-4 border-t border-[#C9A052]/10 space-y-2 text-xs text-[#A69A86]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A052] mt-0.5 flex-shrink-0" />
                <span>Atelier Studio: MG Road, Bengaluru & Jubilee Hills, Hyderabad (By Appointment)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C9A052] flex-shrink-0" />
                <span>concierge@drlresindecor.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#77736B]">
          <p>© 2026 DRL Resin & Décor. All rights reserved. Registered craft trademark.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/policies/privacy" className="hover:text-[#A69A86] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/policies/terms" className="hover:text-[#A69A86] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/policies/shipping" className="hover:text-[#A69A86] transition-colors">
              Shipping
            </Link>
            <Link href="/admin" className="text-[#C9A052] hover:underline">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
