"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Star,
  Layers,
  Clock,
  Ruler,
  Weight,
  Gift,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { addItem, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customization state
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [personalizationText, setPersonalizationText] = useState("");
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping" | "reviews">("details");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const list: Product[] = await res.json();
          const found = list.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            if (found.availableSizes && found.availableSizes.length > 0) {
              setSelectedSize(found.availableSizes[0].name);
            }
            if (found.availableColors && found.availableColors.length > 0) {
              setSelectedColor(found.availableColors[0]);
            }
            // Related products
            const related = list
              .filter((p) => p.id !== found.id && p.category === found.category)
              .slice(0, 4);
            setRelatedProducts(related.length ? related : list.filter((p) => p.id !== found.id).slice(0, 4));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#0B0B0A]">
        <Sparkles className="w-8 h-8 text-[#C9A052] animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#0B0B0A] px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#E2E8F0] mb-2">Creation Not Found</h2>
        <p className="text-sm text-[#94A3B8] mb-6">
          The artisanal piece you are looking for may have been archived or commissioned privately.
        </p>
        <Link
          href="/shop"
          className="bg-[#121210] text-[#E5C77F] px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold"
        >
          Return to Atelier Catalog
        </Link>
      </div>
    );
  }

  // Calculate live dynamic price
  let currentUnitPrice = product.price;
  if (selectedSize && product.availableSizes) {
    const sizeVariant = product.availableSizes.find((s) => s.name === selectedSize);
    if (sizeVariant) currentUnitPrice += sizeVariant.extraPrice;
  }
  if (giftWrapping) currentUnitPrice += 150;
  const currentTotalPrice = currentUnitPrice * quantity;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity, {
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      personalizationText: personalizationText.trim() || undefined,
      giftWrapping,
      specialInstructions: specialInstructions.trim() || undefined,
    });
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, {
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      personalizationText: personalizationText.trim() || undefined,
      giftWrapping,
      specialInstructions: specialInstructions.trim() || undefined,
    });
    router.push("/checkout");
  };

  return (
    <div className="bg-[#0B0B0A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#94A3B8] mb-8">
          <Link href="/" className="hover:text-[#E2E8F0]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#E2E8F0]">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#E2E8F0]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#E2E8F0] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Gallery & Zoom Preview */}
          <div className="flex flex-col gap-4 sticky top-24">
            {/* Big Active Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#161614] border border-[#C9A052]/20 shadow-md group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#121210]/95 backdrop-blur-md text-[#E5C77F] text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full border border-[#C9A052]/40 flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A052]" />
                  Made to Order
                </span>
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-[#161614]/90 text-[#E2E8F0] hover:bg-[#161614] hover:text-rose-500 shadow-md transition-all"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#C9A052] ring-2 ring-[#C9A052]/30"
                        : "border-[#C9A052]/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} - ${idx}`} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Assurance Tags */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#C9A052]/20 text-center text-xs text-[#94A3B8]">
              <div className="p-3 bg-[#161614] rounded-xl border border-[#C9A052]/20">
                <ShieldCheck className="w-4 h-4 text-[#C9A052] mx-auto mb-1" />
                <span className="block font-medium text-[#E2E8F0]">Anti-Yellowing</span>
                <span className="text-[10px]">Optical Grade UV Resin</span>
              </div>
              <div className="p-3 bg-[#161614] rounded-xl border border-[#C9A052]/20">
                <Truck className="w-4 h-4 text-[#C9A052] mx-auto mb-1" />
                <span className="block font-medium text-[#E2E8F0]">White Glove</span>
                <span className="text-[10px]">Reinforced Crated Transit</span>
              </div>
              <div className="p-3 bg-[#161614] rounded-xl border border-[#C9A052]/20">
                <Sparkles className="w-4 h-4 text-[#C9A052] mx-auto mb-1" />
                <span className="block font-medium text-[#E2E8F0]">100% Unique</span>
                <span className="text-[10px]">No Two Pours Identical</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Interactive Customizer */}
          <div className="flex flex-col">
            <div className="border-b border-[#C9A052]/20 pb-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
                  {product.category} · SKU: {product.sku}
                </span>
                {product.rating > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-[#C9A052]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C9A052]" />
                      ))}
                    </div>
                    <span className="font-bold text-[#E2E8F0]">{product.rating}</span>
                    <span className="text-[#94A3B8]">({product.reviewCount} patron reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#E2E8F0] mb-2">
                {product.name}
              </h1>

              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                {product.tagline}
              </p>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl font-bold text-[#E2E8F0]">
                  ₹{currentTotalPrice.toLocaleString("en-IN")}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-base text-[#94A3B8] line-through">
                    ₹{((product.compareAtPrice + (currentUnitPrice - product.price)) * quantity).toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs text-[#E5C77F] bg-[#C9A052]/15 border border-[#C9A052]/30 font-semibold px-2.5 py-0.5 rounded-full">
                  All Taxes Included
                </span>
              </div>

              {/* Bold Preparation Notice & No Return / No COD Policy */}
              <div className="space-y-2 mt-2">
                <div className="p-3.5 rounded-xl bg-[#161614] border-2 border-[#C9A052] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C9A052] flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-bold text-[#E5C77F] tracking-wide">
                    Note: Preparation time 15 to 20 days depending on article.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-[#E2E8F0] bg-[#161614] border border-rose-500/40 text-rose-400 px-3 py-1 rounded-lg">
                    ✕ NO Cash on Delivery (COD)
                  </span>
                  <span className="font-bold text-[#E2E8F0] bg-[#161614] border border-amber-500/40 text-amber-400 px-3 py-1 rounded-lg">
                    ✕ NO Exchange · NO Return
                  </span>
                </div>
              </div>
            </div>

            {/* Customization Options Studio */}
            <div className="space-y-6 pb-6 border-b border-[#C9A052]/20">
              {/* Size Selector */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="uppercase tracking-wider font-semibold text-[#E2E8F0]">
                      Select Dimension Variant:
                    </span>
                    <span className="text-[#94A3B8]">{product.dimensions}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {product.availableSizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                          selectedSize === size.name
                            ? "border-[#C9A052] bg-[#C9A052]/10 text-[#E2E8F0] ring-1 ring-[#C9A052]"
                            : "border-[#C9A052]/20 bg-[#161614] text-[#94A3B8] hover:border-[#A69A86]"
                        }`}
                      >
                        <div className="font-semibold text-[#E2E8F0]">{size.name}</div>
                        <div className="text-[11px] text-[#CBD5E1] mt-0.5">
                          {size.extraPrice > 0 ? `+ ₹${size.extraPrice.toLocaleString("en-IN")}` : "Standard Base"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Palette Selector */}
              {product.availableColors && product.availableColors.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-2">
                    Resin & Pigment Harmony: <span className="text-[#C9A052] font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          selectedColor === color
                            ? "bg-[#121210] text-[#E5C77F] shadow-sm font-semibold"
                            : "bg-[#161614] border border-[#C9A052]/20 text-[#E2E8F0] hover:bg-[#161614]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personalization Text Input */}
              {product.isCustomizable && (
                <div className="p-4 rounded-2xl bg-[#161614] border border-[#C9A052]/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A052]" />
                      Custom Hand-Engraving or Text
                    </label>
                    <span className="text-[10px] text-[#94A3B8]">Optional (Max 50 chars)</span>
                  </div>
                  <input
                    type="text"
                    maxLength={50}
                    value={personalizationText}
                    onChange={(e) => setPersonalizationText(e.target.value)}
                    placeholder="e.g. 'A & S • 2026' or 'Villa Nirvana'"
                    className="w-full bg-[#0B0B0A] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                  />
                  <p className="text-[10px] text-[#94A3B8] mt-1.5 italic">
                    Engraved on a recessed brushed brass plaque or handwritten in liquid gold calligraphy.
                  </p>
                </div>
              )}

              {/* Gift Wrapping Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-[#161614] rounded-2xl border border-[#C9A052]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#161614] text-[#C9A052] flex items-center justify-center flex-shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#E2E8F0]">Signature Luxury Gift Wrapping</div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Handcrafted wax-sealed box with gold foil note card (+₹150)
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="w-5 h-5 accent-[#C9A052] rounded cursor-pointer"
                />
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] mb-1.5">
                  Artisan Notes / Instructions (Optional):
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Specify preferences (e.g. heavier gold foil, specific orientation, date needed)..."
                  className="w-full bg-[#0B0B0A] border border-[#C9A052]/30 rounded-xl p-3 text-xs text-[#E2E8F0] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                />
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#A69A86]/30 rounded-xl bg-[#161614] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-[#161614] text-[#E2E8F0] font-bold text-sm transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-semibold text-sm text-[#E2E8F0]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-lg hover:bg-[#161614] text-[#E2E8F0] font-bold text-sm transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full bg-[#121210] hover:bg-[#C9A052] hover:text-[#0B0B0A] text-[#E5C77F] py-3.5 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Your Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>Add to Bag · ₹{currentTotalPrice.toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#C9A052] hover:bg-[#E5C77F] text-[#0B0B0A] py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] pt-2">
                <Truck className="w-3.5 h-3.5 text-[#C9A052]" />
                <span>{product.shippingInfo}</span>
              </div>
            </div>

            {/* Tabbed Specifications & Care */}
            <div className="mt-10 border-t border-[#C9A052]/20 pt-6">
              <div className="flex border-b border-[#C9A052]/20 text-xs uppercase tracking-wider font-semibold gap-6 pb-2">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "details" ? "text-[#C9A052]" : "text-[#94A3B8] hover:text-[#E2E8F0]"
                  }`}
                >
                  Description & Specs
                  {activeTab === "details" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A052]" />}
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "care" ? "text-[#C9A052]" : "text-[#94A3B8] hover:text-[#E2E8F0]"
                  }`}
                >
                  Resin Care Guide
                  {activeTab === "care" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A052]" />}
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "shipping" ? "text-[#C9A052]" : "text-[#94A3B8] hover:text-[#E2E8F0]"
                  }`}
                >
                  Packaging & Transit
                  {activeTab === "shipping" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A052]" />}
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-2 transition-colors relative ${
                    activeTab === "reviews" ? "text-[#C9A052]" : "text-[#94A3B8] hover:text-[#E2E8F0]"
                  }`}
                >
                  Patron Reviews ({product.reviewCount})
                  {activeTab === "reviews" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A052]" />}
                </button>
              </div>

              <div className="py-5 text-xs text-[#E2E8F0] leading-relaxed">
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <p className="text-sm text-[#94A3B8]">{product.description}</p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-[#161614] p-3 rounded-xl border border-[#C9A052]/20">
                        <span className="text-[#94A3B8] block text-[10px] uppercase">Dimensions</span>
                        <span className="font-semibold">{product.dimensions}</span>
                      </div>
                      <div className="bg-[#161614] p-3 rounded-xl border border-[#C9A052]/20">
                        <span className="text-[#94A3B8] block text-[10px] uppercase">Weight</span>
                        <span className="font-semibold">{product.weight}</span>
                      </div>
                      <div className="bg-[#161614] p-3 rounded-xl border border-[#C9A052]/20">
                        <span className="text-[#94A3B8] block text-[10px] uppercase">Finish</span>
                        <span className="font-semibold">{product.finish}</span>
                      </div>
                      <div className="bg-[#161614] p-3 rounded-xl border border-[#C9A052]/20">
                        <span className="text-[#94A3B8] block text-[10px] uppercase">Materials</span>
                        <span className="font-semibold">{product.materials.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "care" && (
                  <ul className="space-y-2 list-disc pl-4 text-xs text-[#94A3B8]">
                    {product.careInstructions.map((rule, idx) => (
                      <li key={idx} className="leading-normal">
                        {rule}
                      </li>
                    ))}
                    <li className="leading-normal">
                      Avoid contact with acetone, bleach, or acidic household cleaners.
                    </li>
                  </ul>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-3 text-xs text-[#94A3B8]">
                    <p>
                      <strong>Fragile Art White-Glove Guarantee:</strong> Each item is swathed in acid-free tissue, double-wrapped in high-density bubble air armor, and encased in an impact-tested wooden or reinforced corrugated crate.
                    </p>
                    <p>
                      <strong>Transit Insurance:</strong> All shipments across India are 100% insured against loss or transit impact. In the rare event of transit damage, we provide immediate priority replacement.
                    </p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-[#161614] rounded-2xl border border-[#C9A052]/20">
                      <div className="font-serif text-3xl font-bold text-[#E2E8F0]">{product.rating}</div>
                      <div>
                        <div className="flex text-[#C9A052]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#C9A052]" />
                          ))}
                        </div>
                        <div className="text-[11px] text-[#94A3B8]">
                          Based on {product.reviewCount} verified collector acquisitions
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#94A3B8] italic">
                      &ldquo;The resin wave depth and gold leaf glow have completely transformed our hallway. Outstanding craftsmanship.&rdquo; — Verified Patron
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#C9A052]/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
                  Complementary Art
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#E2E8F0]">
                  You May Also Admire
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] hover:text-[#C9A052] flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
