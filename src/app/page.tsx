import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import {
  Sparkles,
  ShieldCheck,
  Palette,
  Truck,
  ArrowRight,
  Sliders,
  CalendarCheck,
  Layers,
  HeartHandshake,
  Star,
  Quote,
} from "lucide-react";

export default function HomePage() {
  const products = db.getProducts();
  const categories = db.getCategories();
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  const trustPillars = [
    {
      icon: HeartHandshake,
      title: "Handcrafted with Care",
      desc: "Every piece is cast in multi-stage curing cycles over days by seasoned Indian artisans.",
    },
    {
      icon: Palette,
      title: "Personalized Designs",
      desc: "Tailor colors, gold accents, resin depths, dimensions, and custom name engravings.",
    },
    {
      icon: Layers,
      title: "Premium Materials",
      desc: "Non-yellowing optical UV-shielded resin, 24K gold foil, and seasoned teak & rosewood.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Insured Shopping",
      desc: "Shock-proof crate packaging, verified payment gateways, and transit guarantee.",
    },
  ];

  const testimonials = [
    {
      name: "Meera Singhania",
      city: "Mumbai",
      product: "Ocean Reverie Wall Art (30x48 in)",
      quote:
        "The depth of the ocean layers in person is breathtaking. Guests in our sea-facing living room cannot stop gazing at the wave textures and gold details. Truly museum-grade art.",
      rating: 5,
      date: "Purchased October 2026",
    },
    {
      name: "Devendra Rao",
      city: "Bengaluru",
      product: "Custom Rosewood River Table",
      quote:
        "DRL collaborated with our interior designer from wood slab selection to final polish. The turquoise translucent river is hypnotic. Arrived flawlessly crated.",
      rating: 5,
      date: "Purchased September 2026",
    },
    {
      name: "Ananya & Kabir",
      city: "Delhi NCR",
      product: "Personalized Memory Keepsake",
      quote:
        "They preserved our wedding garland roses inside crystal-clear resin with our wedding date engraved on brass. It is now our most cherished home heirloom.",
      rating: 5,
      date: "Purchased August 2026",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[88vh] flex items-center justify-center bg-[#121210] overflow-hidden">
        {/* Background visual with subtle dark luxury overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=2000&q=85"
            alt="Handcrafted Ocean Resin Art"
            fill
            priority
            className="object-cover opacity-35 scale-105 animate-pulse"
            style={{ animationDuration: "12s" }}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-[#121210]/60 to-[#121210]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A052]/15 border border-[#C9A052]/40 text-[#E5C77F] text-xs uppercase tracking-widest font-semibold mb-6 animate-in fade-in slide-in-from-bottom duration-700">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A052]" />
            <span>The Fine Art of Hand-Poured Resin</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#FFFDF8] tracking-tight leading-[1.1] mb-6">
            Art That Makes Space <br className="hidden sm:inline" />
            <span className="italic font-normal bg-gradient-to-r from-[#E5C77F] via-[#C9A052] to-[#FFFDF8] bg-clip-text text-transparent">
              Feel Special.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#F4EFE5]/85 leading-relaxed font-light mb-10">
            Handcrafted resin art, elegant home décor, and custom creations designed to bring beauty and individuality into your space.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C9A052] text-[#121210] font-semibold text-xs uppercase tracking-widest hover:bg-[#E5C77F] transition-all duration-300 shadow-xl shadow-[#C9A052]/20 flex items-center justify-center gap-2 group"
            >
              <span>Explore the Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/custom-studio"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1B1915]/80 hover:bg-[#1B1915] text-[#E5C77F] border border-[#C9A052]/50 font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4 text-[#C9A052]" />
              <span>Create Your Custom Piece</span>
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-16 pt-8 border-t border-[#C9A052]/20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            <div>
              <div className="font-serif text-2xl font-bold text-[#E5C77F]">1,200+</div>
              <div className="text-[11px] text-[#A69A86] tracking-wider uppercase mt-1">Spaces Transformed</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[#E5C77F]">100%</div>
              <div className="text-[11px] text-[#A69A86] tracking-wider uppercase mt-1">Hand-Poured Resin</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[#E5C77F]">4.9 / 5</div>
              <div className="text-[11px] text-[#A69A86] tracking-wider uppercase mt-1">Artisan Reviews</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[#E5C77F]">Pan-India</div>
              <div className="text-[11px] text-[#A69A86] tracking-wider uppercase mt-1">Crated White-Glove</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & VALUE SECTION */}
      <section className="bg-[#FFFDF8] py-14 border-b border-[#F4EFE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#C9A052]/15 hover:border-[#C9A052]/40 transition-colors shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F4EFE5] border border-[#C9A052]/30 flex items-center justify-center flex-shrink-0 text-[#C9A052]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#1B1915] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#77736B] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section id="collections" className="py-20 bg-[#F4EFE5]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
                Curated Categories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
                Explore Signature Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#1B1915] hover:text-[#C9A052] transition-colors"
            >
              <span>View All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-96 rounded-2xl overflow-hidden shadow-md flex flex-col justify-end p-6 border border-[#C9A052]/20"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121210] via-[#121210]/40 to-transparent" />

                <div className="relative z-10">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#E5C77F]">
                    {cat.itemCount} Creations
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1 group-hover:text-[#E5C77F] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#F4EFE5]/80 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs text-[#E5C77F] font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Discover</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS GRID */}
      <section className="py-20 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              Bestselling Creations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
              Hand-Poured Masterpieces
            </h2>
            <p className="text-sm text-[#77736B] mt-2">
              Each piece represents days of careful pigment mixing, crystal placement, and optical resin curing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#1B1915] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#121210] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY SECTION */}
      <section className="py-20 bg-[#1B1915] text-[#FFFDF8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Mosaic */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-3xl overflow-hidden border border-[#C9A052]/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85"
                alt="Artisan pouring translucent resin onto live edge wood"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121210]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#121210]/80 backdrop-blur-md border border-[#C9A052]/30">
                <p className="text-xs text-[#E5C77F] font-serif italic">
                  &ldquo;Resin is alive during the pour. Controlling the viscosity, thermal cure, and light dispersion requires both scientific precision and artistic surrender.&rdquo;
                </p>
                <span className="block text-[11px] uppercase tracking-wider text-[#A69A86] mt-2">
                  — Lead Artisan & Founder, DRL Atelier
                </span>
              </div>
            </div>

            {/* Storytelling Text */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden border-2 border-[#C9A052]/60 shadow-xl flex-shrink-0 bg-[#FFFDF8]">
                  <Image
                    src="/images/logo.jpg"
                    alt="DRL Resin & Décor Master Emblem"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The DRL Philosophy</span>
                  </div>
                  <p className="text-xs text-[#E5C77F] italic font-serif">Handcrafted with passion</p>
                </div>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDF8] leading-tight mb-6">
                Thoughtfully Crafted. <br />
                <span className="italic font-normal text-[#E5C77F]">
                  Beautifully Personal.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#F4EFE5]/80 leading-relaxed font-light mb-5">
                DRL Resin & Décor was born out of deep reverence for the raw, untamed beauty of natural shorelines and ancient timber grain. We reject mass-manufactured polymer molds in favor of slow, bespoke creation.
              </p>

              <p className="text-sm sm:text-base text-[#F4EFE5]/80 leading-relaxed font-light mb-8">
                We combine non-toxic, VOC-free food-safe epoxies with seasoned Indian Rosewood and teak slabs. Every river table, geode wall timepiece, and preserved memory keepsake tells a distinct personal story that endures through generations.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/about"
                  className="bg-[#C9A052] text-[#121210] font-semibold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl hover:bg-[#E5C77F] transition-colors"
                >
                  Discover Our Story
                </Link>
                <Link
                  href="/book-consultation"
                  className="border border-[#C9A052]/40 text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl hover:bg-[#C9A052]/10 transition-colors"
                >
                  Meet the Artisan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMIZATION STUDIO BANNER */}
      <section className="py-20 bg-[#FFFDF8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1B1915] via-[#121210] to-[#1B1915] text-[#FFFDF8] p-8 sm:p-14 lg:p-16 border border-[#C9A052]/30 shadow-2xl overflow-hidden">
            {/* Background Texture */}
            <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80"
                alt="Custom Resin Furniture"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="relative z-10 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
                Bespoke Atelier Commission
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF8] mt-2 mb-4">
                Your Vision. Our Craft.
              </h2>
              <p className="text-sm sm:text-base text-[#F4EFE5]/85 leading-relaxed font-light mb-8">
                From personal keepsakes with bridal botanicals to statement 10-seater dining river tables, configure your dream dimensions, mineral palette, metallic leaf accents, and engraved sentiments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/custom-studio"
                  className="bg-[#C9A052] text-[#121210] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#E5C77F] transition-all flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Launch Custom Studio</span>
                </Link>
                <Link
                  href="/book-consultation"
                  className="bg-transparent border border-[#C9A052]/40 text-[#E5C77F] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#C9A052]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 text-[#C9A052]" />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-20 bg-[#F4EFE5]/40 border-t border-[#F4EFE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              Verified Patron Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1">
              Treasured in Discerning Homes
            </h2>
            <p className="text-sm text-[#77736B] mt-2">
              Read authentic feedback from collectors and clients across India who welcomed DRL pieces into their residences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#C9A052]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-[#C9A052]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C9A052]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#C9A052]/30" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#1B1915] leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4EFE5]">
                  <div className="font-serif font-bold text-sm text-[#1B1915]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#C9A052] font-medium">
                    {t.product}
                  </div>
                  <div className="text-[10px] text-[#A69A86] mt-0.5">
                    {t.city} · {t.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONSULTATION CALL TO ACTION */}
      <section className="bg-[#121210] py-16 text-[#FFFDF8] border-t border-[#C9A052]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-8 h-8 text-[#C9A052] mx-auto mb-3" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#E5C77F] mb-3">
            Looking for a Bespoke Architectural Installation?
          </h2>
          <p className="text-sm text-[#A69A86] max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule a 1-on-1 design consultation with our master artisan to select wood grain slabs, resin pigments, and coordinate with your architect.
          </p>
          <Link
            href="/book-consultation"
            className="inline-flex items-center gap-2 bg-[#C9A052] text-[#121210] font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#E5C77F] transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Schedule 1-on-1 Consultation</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
