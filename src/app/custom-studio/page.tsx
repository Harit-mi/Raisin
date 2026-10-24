"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  Upload,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Palette,
  DollarSign,
  HelpCircle,
} from "lucide-react";

export default function CustomStudioPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [productType, setProductType] = useState("Resin Dining / Coffee River Table");
  const [preferredSize, setPreferredSize] = useState("Medium (4 ft x 2 ft / 120 x 60 cm)");
  const [shape, setShape] = useState("Live Edge Natural Slab");
  const [primaryColor, setPrimaryColor] = useState("Deep Ocean Turquoise & Indigo");
  const [secondaryColor, setSecondaryColor] = useState("Smoky Translucent Sand");
  const [metallicAccents, setMetallicAccents] = useState("24K Champagne Gold Leaf");
  const [designStyle, setDesignStyle] = useState("Double River Ocean Shoreline");
  const [personalizationText, setPersonalizationText] = useState("");
  const [occasion, setOccasion] = useState("New Home / Interior Project");
  const [quantity, setQuantity] = useState(1);
  const [budgetRange, setBudgetRange] = useState("₹25,000 - ₹50,000");
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState("");
  const [inspirationImageUrl, setInspirationImageUrl] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  // Customer Contact Info
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Approximate Price Estimation Matrix
  const calculateEstimate = () => {
    let base = 8000;
    if (productType.includes("River Table")) base = 35000;
    else if (productType.includes("Wall Art")) base = 12000;
    else if (productType.includes("Geode Clock")) base = 7500;
    else if (productType.includes("Coaster")) base = 2200;
    else if (productType.includes("Keepsake")) base = 5500;

    if (preferredSize.includes("Large") || preferredSize.includes("6 ft")) base *= 1.8;
    else if (preferredSize.includes("Grand Luxe") || preferredSize.includes("8 ft")) base *= 2.8;

    if (metallicAccents.includes("24K Champagne Gold")) base += 1200;
    if (personalizationText) base += 800;

    return Math.round(base * quantity);
  };

  const estimatedPrice = calculateEstimate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !phone) {
      setErrorMessage("Please provide your name, email, and contact phone number.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/custom-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          productType,
          preferredSize,
          shape,
          primaryColor,
          secondaryColor,
          metallicAccents,
          designStyle,
          personalizationText: personalizationText.trim() || undefined,
          occasion,
          quantity,
          budgetRange,
          requiredDeliveryDate: requiredDeliveryDate || "Flexible",
          inspirationImageUrl: inspirationImageUrl.trim() || undefined,
          additionalInstructions: additionalInstructions.trim() || undefined,
          estimatedPrice,
        }),
      });

      const data = await res.json();
      if (res.ok && data.request) {
        setSubmittedRequestId(data.request.id);
      } else {
        setErrorMessage(data.error || "Failed to submit request.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A052]/15 text-[#C9A052] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Bespoke Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B1915]">
            Configure Your Custom Piece
          </h1>
          <p className="text-sm text-[#77736B] mt-2">
            Share your interior color schemes, timber preferences, and dimension requirements. Our master artisan will evaluate your vision and issue a formal quotation.
          </p>
        </div>

        {submittedRequestId ? (
          /* SUCCESS SCREEN */
          <div className="bg-white border border-[#C9A052]/40 rounded-3xl p-8 sm:p-14 shadow-xl max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#C9A052]/15 text-[#C9A052] flex items-center justify-center mx-auto mb-5 border border-[#C9A052]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A052]">
              Commission Request Logged
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1915] mt-1 mb-2">
              Thank You, {customerName}!
            </h2>
            <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed mb-6">
              Your custom studio dossier has been assigned reference ID:
            </p>

            <div className="bg-[#121210] text-[#E5C77F] font-mono text-base font-bold py-3 px-6 rounded-xl inline-block mb-8 border border-[#C9A052]/40 shadow-inner">
              {submittedRequestId}
            </div>

            {/* Workflow steps */}
            <div className="text-left bg-[#FFFDF8] border border-[#F4EFE5] rounded-2xl p-6 mb-8 space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#1B1915]">What happens next?</h4>
              <div className="space-y-3 text-xs text-[#77736B]">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1B1915] text-[#E5C77F] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span><strong>Artisan Review:</strong> We examine your dimensions, color palette, and wood grain feasibility within 24 hours.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1B1915] text-[#E5C77F] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span><strong>Formal Quotation:</strong> You will receive a wood selection photo and quotation via WhatsApp & Email ({email}).</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1B1915] text-[#E5C77F] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span><strong>Creation & Dispatch:</strong> Upon 40% deposit approval, we pour, cure, hand-polish, and crate your piece with transit insurance.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/account"
                className="w-full sm:w-auto bg-[#1B1915] text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#C9A052] hover:text-[#121210] transition-colors"
              >
                Track in Account
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto border border-[#C9A052] text-[#1B1915] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#F4EFE5] transition-colors"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        ) : (
          /* MULTI-SECTION STUDIO FORM */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form Fields: 2 Columns */}
            <div className="lg:col-span-2 space-y-8 bg-white border border-[#C9A052]/20 rounded-3xl p-6 sm:p-8 shadow-sm">
              {/* Step indicator */}
              <div className="flex items-center justify-between border-b border-[#F4EFE5] pb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1B1915]">
                  Step {step} of 3: {step === 1 ? "Product & Dimensions" : step === 2 ? "Aesthetics & Accents" : "Details & Contact"}
                </span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setStep(s)}
                      className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                        step === s
                          ? "bg-[#1B1915] text-[#E5C77F]"
                          : step > s
                          ? "bg-[#C9A052] text-[#121210]"
                          : "bg-[#F4EFE5] text-[#77736B]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 1: Product & Dimensions */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-2">
                      1. What type of creation would you like commissioned?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Resin Dining / Coffee River Table",
                        "Ocean Reverie Statement Wall Art",
                        "Crystal Geode Luxury Clock",
                        "Bespoke Hexagonal Coaster Set",
                        "Artisan Vanity / Serving Tray",
                        "Wedding & Floral Preservation Keepsake",
                      ].map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setProductType(item)}
                          className={`p-3.5 rounded-xl border text-xs text-left font-medium transition-all ${
                            productType === item
                              ? "border-[#C9A052] bg-[#C9A052]/10 text-[#1B1915] ring-1 ring-[#C9A052] font-semibold"
                              : "border-[#F4EFE5] bg-[#FFFDF8] text-[#77736B] hover:border-[#A69A86]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-2">
                      2. Preferred Dimensions / Size:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        "Intimate (Under 24 in / Accent)",
                        "Medium (4 ft x 2 ft / 120 x 60 cm)",
                        "Large (6 ft x 3 ft / 180 x 90 cm)",
                        "Grand Luxe (8 ft+ / Statement)",
                      ].map((sz) => (
                        <button
                          type="button"
                          key={sz}
                          onClick={() => setPreferredSize(sz)}
                          className={`p-3 rounded-xl border text-xs text-center font-medium transition-all ${
                            preferredSize === sz
                              ? "border-[#C9A052] bg-[#1B1915] text-[#E5C77F] font-semibold"
                              : "border-[#F4EFE5] bg-[#FFFDF8] text-[#77736B] hover:border-[#A69A86]"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-2">
                      3. Slab Geometry & Rim Shape:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        "Live Edge Natural Slab",
                        "Circular / Round",
                        "Hexagonal Geometric",
                        "Freeform Sculpted Wave",
                      ].map((shp) => (
                        <button
                          type="button"
                          key={shp}
                          onClick={() => setShape(shp)}
                          className={`p-2.5 rounded-xl border text-xs text-center font-medium transition-all ${
                            shape === shp
                              ? "border-[#C9A052] bg-[#1B1915] text-[#E5C77F] font-semibold"
                              : "border-[#F4EFE5] bg-[#FFFDF8] text-[#77736B] hover:border-[#A69A86]"
                          }`}
                        >
                          {shp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-[#1B1915] text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#C9A052] hover:text-[#121210] transition-colors"
                    >
                      <span>Next: Aesthetics & Accents</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Aesthetics & Accents */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-2">
                      4. Primary Color Theme:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        "Deep Ocean Turquoise & Indigo",
                        "Emerald Reef & Moss Gold",
                        "Black Pearl Obsidian & Charcoal",
                        "Rose Quartz & Alabaster Cream",
                        "Smoky Amber & Sunset Bronze",
                        "Crystal Clear Floral Embedding",
                      ].map((col) => (
                        <button
                          type="button"
                          key={col}
                          onClick={() => setPrimaryColor(col)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                            primaryColor === col
                              ? "border-[#C9A052] bg-[#1B1915] text-[#E5C77F] font-semibold"
                              : "border-[#F4EFE5] bg-[#FFFDF8] text-[#77736B] hover:border-[#A69A86]"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-2">
                      5. Metallic Leaf & Mineral Inlays:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        "24K Champagne Gold Leaf",
                        "Rose Gold Leaf Specks",
                        "Pure Silver Leaf Vein",
                        "Raw Amethyst / Quartz Geode",
                      ].map((met) => (
                        <button
                          type="button"
                          key={met}
                          onClick={() => setMetallicAccents(met)}
                          className={`p-2.5 rounded-xl border text-xs text-center font-medium transition-all ${
                            metallicAccents === met
                              ? "border-[#C9A052] bg-[#1B1915] text-[#E5C77F] font-semibold"
                              : "border-[#F4EFE5] bg-[#FFFDF8] text-[#77736B] hover:border-[#A69A86]"
                          }`}
                        >
                          {met}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-1.5">
                      6. Hand-Engraved Text or Dedication:
                    </label>
                    <input
                      type="text"
                      maxLength={60}
                      value={personalizationText}
                      onChange={(e) => setPersonalizationText(e.target.value)}
                      placeholder="e.g. 'Singhania Villa • 2026' or personal monogram"
                      className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#1B1915] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                    />
                    <p className="text-[10px] text-[#77736B] mt-1">
                      Engraved on an inset solid brass plate or handwritten in liquid gold leaf calligraphy.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs uppercase tracking-widest text-[#77736B] hover:text-[#1B1915] font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-[#1B1915] text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#C9A052] hover:text-[#121210] transition-colors"
                    >
                      <span>Next: Details & Submission</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Details & Contact */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-1.5">
                        Budget Range Expectation:
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#1B1915] focus:outline-none focus:border-[#C9A052]"
                      >
                        <option value="Under ₹15,000">Under ₹15,000</option>
                        <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                        <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                        <option value="₹75,000 - ₹1,50,000+">₹75,000 - ₹1,50,000+ (Grand Architectural)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-1.5">
                        Target Delivery Date:
                      </label>
                      <input
                        type="date"
                        value={requiredDeliveryDate}
                        onChange={(e) => setRequiredDeliveryDate(e.target.value)}
                        className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#1B1915] focus:outline-none focus:border-[#C9A052]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-1.5">
                      Reference Image or Moodboard URL (Optional):
                    </label>
                    <input
                      type="url"
                      value={inspirationImageUrl}
                      onChange={(e) => setInspirationImageUrl(e.target.value)}
                      placeholder="https://pinterest.com/... or cloud link"
                      className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2.5 text-xs text-[#1B1915] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1B1915] mb-1.5">
                      Additional Vision / Space Details:
                    </label>
                    <textarea
                      rows={3}
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                      placeholder="Tell us about the room lighting, wall dimensions, wood tone preferences, or floral preservation notes..."
                      className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl p-3 text-xs text-[#1B1915] placeholder-[#77736B] focus:outline-none focus:border-[#C9A052]"
                    />
                  </div>

                  {/* Contact Fields */}
                  <div className="pt-4 border-t border-[#F4EFE5] space-y-4">
                    <h4 className="font-serif font-bold text-sm text-[#1B1915]">
                      Where should our artisan send your custom proposal?
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#77736B] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Devendra Sharma"
                          className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#1B1915] focus:outline-none focus:border-[#C9A052]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#77736B] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="devendra@example.com"
                          className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#1B1915] focus:outline-none focus:border-[#C9A052]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#77736B] mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#FFFDF8] border border-[#A69A86]/30 rounded-xl px-3 py-2 text-xs text-[#1B1915] focus:outline-none focus:border-[#C9A052]"
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && <p className="text-xs text-rose-500">{errorMessage}</p>}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-widest text-[#77736B] hover:text-[#1B1915] font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#C9A052] text-[#121210] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl flex items-center gap-2 hover:bg-[#E5C77F] transition-colors disabled:opacity-50 shadow-md"
                    >
                      {submitting ? "Submitting Request..." : "Submit Custom Studio Commission"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Interactive Summary Card */}
            <div className="bg-[#1B1915] text-[#FFFDF8] rounded-3xl p-6 sm:p-7 border border-[#C9A052]/30 shadow-xl sticky top-24">
              <div className="flex items-center justify-between border-b border-[#C9A052]/20 pb-4 mb-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#E5C77F]">
                  Live Configuration
                </span>
                <span className="text-[10px] text-[#A69A86]">Instant Estimate</span>
              </div>

              <div className="space-y-3 text-xs mb-6">
                <div>
                  <span className="text-[#A69A86] block text-[10px] uppercase">Piece</span>
                  <span className="font-semibold text-white">{productType}</span>
                </div>
                <div>
                  <span className="text-[#A69A86] block text-[10px] uppercase">Dimensions & Shape</span>
                  <span className="font-medium text-[#F4EFE5]">{preferredSize} · {shape}</span>
                </div>
                <div>
                  <span className="text-[#A69A86] block text-[10px] uppercase">Color Theme</span>
                  <span className="font-medium text-[#F4EFE5]">{primaryColor}</span>
                </div>
                <div>
                  <span className="text-[#A69A86] block text-[10px] uppercase">Metallic Inlays</span>
                  <span className="font-medium text-[#F4EFE5]">{metallicAccents}</span>
                </div>
                {personalizationText && (
                  <div>
                    <span className="text-[#A69A86] block text-[10px] uppercase">Engraving</span>
                    <span className="font-medium text-[#E5C77F] italic">&ldquo;{personalizationText}&rdquo;</span>
                  </div>
                )}
              </div>

              {/* Estimate Calculation */}
              <div className="bg-[#121210] p-4 rounded-2xl border border-[#C9A052]/30 mb-6">
                <div className="text-[10px] uppercase tracking-wider text-[#A69A86]">
                  Estimated Price Range (INR)
                </div>
                <div className="font-serif text-2xl font-bold text-[#E5C77F] mt-1">
                  ~ ₹{estimatedPrice.toLocaleString("en-IN")}
                </div>
                <p className="text-[10px] text-[#77736B] mt-1 leading-normal">
                  *Preliminary artisan calculation. Final binding quotation issued after timber slab and pigment review.
                </p>
              </div>

              <div className="space-y-2 text-[11px] text-[#A69A86] border-t border-[#C9A052]/15 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A052]" />
                  <span>Non-binding consultation quote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A052]" />
                  <span>Direct WhatsApp contact with master artisan</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
