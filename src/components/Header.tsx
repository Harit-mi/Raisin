"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-context";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { itemCount, wishlistCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementText] = useState(
    "Handcrafted with intention · Free insured white-glove shipping on orders above ₹3,000"
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Collections", href: "/shop#collections" },
    { label: "Custom Studio", href: "/custom-studio", highlight: true },
    { label: "Book Consultation", href: "/book-consultation" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#121210] text-[#E5C77F] border-b border-[#C9A052]/20 py-2 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A052] animate-pulse hidden sm:inline" />
            <span>{announcementText}</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#CBD5E1]">
            <Link href="/track-order" className="hover:text-[#E5C77F] transition-colors">
              Track Order
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-[#E5C77F] transition-colors">
              Atelier Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#121210]/95 backdrop-blur-md shadow-md py-3.5 border-b border-[#C9A052]/20"
            : "bg-[#121210] py-4 border-b border-[#121210]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo - Aligned left */}
          <div className="flex-shrink-0 flex items-center">
            <Logo theme="dark" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                    link.highlight
                      ? "text-[#E5C77F] font-semibold flex items-center gap-1.5 hover:text-white"
                      : isActive
                      ? "text-[#C9A052]"
                      : "text-[#F4EFE5]/80 hover:text-[#E5C77F]"
                  }`}
                >
                  {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A052] inline-block animate-ping" />}
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A052]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utility Icons & Action triggers */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#F4EFE5]/80 hover:text-[#E5C77F] transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2 text-[#F4EFE5]/80 hover:text-[#E5C77F] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C9A052] text-[#0B0B0A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Customer Account / Orders */}
            <Link
              href="/account"
              className="p-2 text-[#F4EFE5]/80 hover:text-[#E5C77F] transition-colors"
              aria-label="Account & Orders"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#C9A052]/15 hover:bg-[#C9A052]/25 text-[#E5C77F] border border-[#C9A052]/40 rounded-full py-1.5 px-3.5 transition-all text-xs font-medium group"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#C9A052] text-[#0B0B0A] font-bold text-[11px] px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Button on the right */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E5C77F] hover:text-white transition-colors lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#121210]/90 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="bg-[#121210] border border-[#C9A052]/30 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative text-[#FFFDF8]">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-5 right-5 text-[#CBD5E1] hover:text-white"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-xl text-[#E5C77F] mb-4">Search DRL Creations</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ocean wall art, clocks, coasters, live edge tables..."
                className="w-full bg-[#121210] border border-[#C9A052]/30 rounded-xl px-4 py-3.5 pl-11 text-sm text-[#FFFDF8] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                autoFocus
              />
              <Search className="w-5 h-5 text-[#C9A052] absolute left-3.5 top-4" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-[#C9A052] text-[#0B0B0A] font-medium text-xs px-4 py-2 rounded-lg hover:bg-[#E5C77F] transition-colors"
              >
                Search
              </button>
            </form>

            <div className="mt-6">
              <span className="text-xs uppercase tracking-wider text-[#CBD5E1] font-medium">Popular Curations:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Ocean Reverie",
                  "Side Table",
                  "Geode Clock",
                  "Coasters",
                  "Serving Board",
                  "Wedding Keepsake",
                ].map((term) => (
                  <Link
                    key={term}
                    href={`/shop?q=${encodeURIComponent(term)}`}
                    onClick={() => setSearchOpen(false)}
                    className="text-xs bg-[#121210] hover:bg-[#C9A052]/20 border border-[#C9A052]/20 text-[#F4EFE5] px-3 py-1.5 rounded-full transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#121210] border-r border-[#C9A052]/20 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C9A052]/20">
                <Logo theme="dark" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#CBD5E1] hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-wider font-medium flex items-center justify-between py-1 transition-colors ${
                      link.highlight
                        ? "text-[#E5C77F] font-semibold"
                        : pathname === link.href
                        ? "text-[#C9A052]"
                        : "text-[#F4EFE5]/80 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A052]/60" />
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-[#C9A052]/15 flex flex-col gap-3">
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-[#CBD5E1] hover:text-[#E5C77F] py-1"
                >
                  Track Existing Order
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-[#CBD5E1] hover:text-[#E5C77F] py-1"
                >
                  My Account & Inquiries
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-[#C9A052] hover:text-white py-1 flex items-center gap-1.5"
                >
                  <span>Atelier Admin Access</span>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#C9A052]/20">
              <Link
                href="/book-consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#C9A052] text-[#0B0B0A] font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#E5C77F] transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
