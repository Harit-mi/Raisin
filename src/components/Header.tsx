"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-context";
import { MAIN_COLLECTIONS } from "@/lib/catalog";
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
  ChevronDown,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { itemCount, wishlistCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collectionsMegaOpen, setCollectionsMegaOpen] = useState(false);
  const [mobileCollectionsExpanded, setMobileCollectionsExpanded] = useState(true);
  const [mobileActiveTier, setMobileActiveTier] = useState<string | null>("Signature Collections");

  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCollectionsMegaOpen(false);
  }, [pathname]);

  const handleMouseEnterCollections = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setCollectionsMegaOpen(true);
  };

  const handleMouseLeaveCollections = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setCollectionsMegaOpen(false);
    }, 200);
  };

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

          {/* Desktop Navigation Links with Collections Dropdown */}
          <nav className="hidden lg:flex items-center gap-9">
            <Link
              href="/"
              className={`font-serif italic text-base sm:text-lg tracking-wide transition-all relative py-1 ${
                pathname === "/"
                  ? "text-[#E5C77F] font-medium"
                  : "text-[#E2E8F0]/80 hover:text-[#E5C77F]"
              }`}
            >
              Home
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A052]" />
              )}
            </Link>

            {/* Interactive Collections Dropdown Trigger */}
            <div
              className="relative py-1"
              onMouseEnter={handleMouseEnterCollections}
              onMouseLeave={handleMouseLeaveCollections}
            >
              <button
                onClick={() => setCollectionsMegaOpen(!collectionsMegaOpen)}
                className={`font-serif italic text-base sm:text-lg tracking-wide transition-all flex items-center gap-1.5 ${
                  pathname.startsWith("/collections") || collectionsMegaOpen
                    ? "text-[#E5C77F] font-medium"
                    : "text-[#E2E8F0]/80 hover:text-[#E5C77F]"
                }`}
                aria-expanded={collectionsMegaOpen}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C9A052] transition-transform duration-300 ${
                    collectionsMegaOpen ? "rotate-180" : ""
                  }`}
                />
                {pathname.startsWith("/collections") && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A052]" />
                )}
              </button>

              {/* Luxury Mega Menu Panel */}
              {collectionsMegaOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[920px] max-w-[94vw] z-50 animate-in fade-in slide-in-from-top-2 duration-300"
                  onMouseEnter={handleMouseEnterCollections}
                  onMouseLeave={handleMouseLeaveCollections}
                >
                  <div className="bg-[#0E0E0C] border border-[#C9A052]/35 rounded-3xl p-8 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden">
                    {/* Subtle Gold Foil Accent Gradient */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A052] to-transparent" />

                    <div className="flex items-center justify-between pb-5 border-b border-[#C9A052]/20 mb-6">
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-[#C9A052] font-semibold">
                          Atelier Catalog
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#FFFDF8] mt-0.5">
                          Explore Handcrafted Collections
                        </h3>
                      </div>
                      <Link
                        href="/collections"
                        onClick={() => setCollectionsMegaOpen(false)}
                        className="text-xs uppercase tracking-wider text-[#E5C77F] hover:text-[#FFFDF8] font-semibold inline-flex items-center gap-1.5 transition-colors group/view"
                      >
                        <span>View All Collections Hub</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/view:translate-x-1" />
                      </Link>
                    </div>

                    {/* 3 Main Collection Columns */}
                    <div className="grid grid-cols-3 gap-8">
                      {MAIN_COLLECTIONS.map((tier) => (
                        <div
                          key={tier.slug}
                          className="flex flex-col justify-between p-5 rounded-2xl bg-[#141411] border border-[#C9A052]/20 hover:border-[#E5C77F]/60 transition-all duration-300 group/col"
                        >
                          <div>
                            {/* Column Header */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[11px] font-mono font-bold text-[#C9A052]">
                                {tier.number}
                              </span>
                              <span className="w-4 h-[1px] bg-[#C9A052]/40" />
                              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8]">
                                {tier.subcategories.length} Subcategories
                              </span>
                            </div>

                            <Link
                              href={`/collections/${tier.slug}`}
                              onClick={() => setCollectionsMegaOpen(false)}
                              className="font-serif text-lg font-bold text-[#FFFDF8] group-hover/col:text-[#E5C77F] transition-colors block"
                            >
                              {tier.name}
                            </Link>

                            <p className="text-[11px] text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed font-light">
                              {tier.tagline}
                            </p>

                            {/* Subcategories List */}
                            <div className="mt-5 space-y-4 pt-4 border-t border-[#C9A052]/15">
                              {tier.subcategories.map((subcat) => (
                                <div key={subcat.slug} className="group/item">
                                  <Link
                                    href={`/collections/${tier.slug}/${subcat.slug}`}
                                    onClick={() => setCollectionsMegaOpen(false)}
                                    className="flex items-center justify-between text-xs font-serif font-bold text-[#E2E8F0] hover:text-[#E5C77F] transition-colors"
                                  >
                                    <span>
                                      {subcat.letter}. {subcat.name}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-[#C9A052] opacity-70 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                  </Link>

                                  {/* Direct links to Level 4 Product Categories */}
                                  <div className="flex flex-wrap gap-1 mt-1.5 pl-1">
                                    {subcat.productCategories.map((prodCat) => (
                                      <Link
                                        key={prodCat.slug}
                                        href={`/collections/${tier.slug}/${subcat.slug}/${prodCat.slug}`}
                                        onClick={() => setCollectionsMegaOpen(false)}
                                        className="text-[10px] text-[#94A3B8] hover:text-[#E5C77F] hover:underline transition-colors"
                                      >
                                        • {prodCat.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Dedicated Tier Link */}
                          <div className="mt-6 pt-4 border-t border-[#C9A052]/15">
                            <Link
                              href={`/collections/${tier.slug}`}
                              onClick={() => setCollectionsMegaOpen(false)}
                              className="text-[11px] uppercase tracking-wider font-semibold text-[#E5C77F] hover:text-[#FFFDF8] inline-flex items-center gap-1 group/btn transition-colors"
                            >
                              <span>Explore Main Collection {tier.number}</span>
                              <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Status Strip */}
                    <div className="mt-6 pt-4 border-t border-[#C9A052]/20 flex items-center justify-between text-[11px] text-[#CBD5E1]">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-[#E5C77F] font-semibold">
                          <Clock className="w-3 h-3 text-[#C9A052]" />
                          <span>15–20 Days Preparation Time</span>
                        </span>
                        <span>•</span>
                        <span>Pan-India Insured White-Glove Transport</span>
                      </div>
                      <span className="text-[#A69A86] italic">
                        100% Made-to-Order · NO COD · NO Return
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`font-serif italic text-base sm:text-lg tracking-wide transition-all relative py-1 ${
                pathname === "/contact"
                  ? "text-[#E5C77F] font-medium"
                  : "text-[#E2E8F0]/80 hover:text-[#E5C77F]"
              }`}
            >
              Contact
              {pathname === "/contact" && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A052]" />
              )}
            </Link>
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
              <span className="text-xs uppercase tracking-wider text-[#CBD5E1] font-medium">
                Popular Curations:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Statement Wall Art",
                  "Timeless Creations",
                  "Forever Memories",
                  "Wedding Preservation",
                  "Geode Clock",
                  "Festive Elegance",
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
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#121210] border-r border-[#C9A052]/20 p-6 flex flex-col justify-between overflow-y-auto">
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

              {/* Mobile Navigation List */}
              <nav className="mt-6 flex flex-col gap-3">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif italic text-lg py-2 transition-colors ${
                    pathname === "/" ? "text-[#E5C77F] font-semibold" : "text-[#E2E8F0]/80"
                  }`}
                >
                  Home
                </Link>

                {/* Expandable Collections in Mobile */}
                <div className="border-y border-[#C9A052]/20 py-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/collections"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif italic text-lg text-[#E5C77F] font-semibold"
                    >
                      Collections
                    </Link>
                    <button
                      onClick={() => setMobileCollectionsExpanded(!mobileCollectionsExpanded)}
                      className="p-1 text-[#C9A052]"
                      aria-label="Toggle collections list"
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          mobileCollectionsExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {mobileCollectionsExpanded && (
                    <div className="mt-4 space-y-4 pl-3 border-l-2 border-[#C9A052]/30">
                      {MAIN_COLLECTIONS.map((tier) => (
                        <div key={tier.slug} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/collections/${tier.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="font-serif text-base font-semibold text-[#FFFDF8] hover:text-[#E5C77F]"
                            >
                              {tier.number}. {tier.name}
                            </Link>
                            <button
                              onClick={() =>
                                setMobileActiveTier(
                                  mobileActiveTier === tier.name ? null : tier.name
                                )
                              }
                              className="text-[#C9A052] p-1"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  mobileActiveTier === tier.name ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </div>

                          {mobileActiveTier === tier.name && (
                            <div className="pl-3 space-y-3 pt-1 border-l border-[#C9A052]/20">
                              {tier.subcategories.map((subcat) => (
                                <div key={subcat.slug} className="space-y-1">
                                  <Link
                                    key={subcat.slug}
                                    href={`/collections/${tier.slug}/${subcat.slug}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1 text-xs font-semibold text-[#CBD5E1] hover:text-[#E5C77F]"
                                  >
                                    <span>
                                      {subcat.letter}. {subcat.name}
                                    </span>
                                  </Link>
                                  <div className="pl-2 space-y-1">
                                    {subcat.productCategories.map((prodCat) => (
                                      <Link
                                        key={prodCat.slug}
                                        href={`/collections/${tier.slug}/${subcat.slug}/${prodCat.slug}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-[11px] text-[#94A3B8] hover:text-[#E5C77F]"
                                      >
                                        • {prodCat.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif italic text-lg py-2 transition-colors ${
                    pathname === "/contact" ? "text-[#E5C77F] font-semibold" : "text-[#E2E8F0]/80"
                  }`}
                >
                  Contact
                </Link>
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
