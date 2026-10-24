import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Layers, ArrowRight, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#121210] text-[#FFFDF8] overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=80"
            alt="Resin atelier workshop"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#FFFDF8] mt-2 mb-6">
            The Alchemy of Wood, Pigment & Light
          </h1>
          <p className="text-sm sm:text-base text-[#F4EFE5]/85 max-w-2xl mx-auto leading-relaxed font-light">
            DRL Resin & Décor was founded to bridge the boundary between functional luxury furnishings and emotive, museum-grade fine art.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              The Artisan Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1915] mt-1 mb-6 leading-tight">
              Where Ancient Timber Meets Liquid Glass
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#77736B] leading-relaxed">
              <p>
                In a world saturated with factory-stamped resin goods and generic acrylic prints, DRL was established with an unapologetic standard of craftsmanship. Each commission begins with kiln-dried, seasoned Indian Rosewood, teak, or acacia timbers whose wild live edges remain uncompromised.
              </p>
              <p>
                Pouring high-grade epoxy is not merely a technical skill; it is a thermal science and a dance with time. Because resin cures over 72 to 120 hours per layer, every tidal swell, shimmering geode cluster, and gold foil eddy is manipulated by hand at exact viscosity thresholds.
              </p>
              <p>
                We formulate each piece using optically stable, UV-inhibited epoxy to ensure your artwork retains its crystal lucidity without yellowing across decades of indoor display.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/custom-studio"
                className="bg-[#1B1915] text-[#E5C77F] hover:bg-[#C9A052] hover:text-[#121210] px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Commission Bespoke Art
              </Link>
              <Link
                href="/shop"
                className="border border-[#C9A052] text-[#1B1915] hover:bg-[#F4EFE5] px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Browse Catalog
              </Link>
            </div>
          </div>

          <div className="relative aspect-square rounded-3xl overflow-hidden border border-[#C9A052]/30 shadow-xl bg-[#F4EFE5]">
            <Image
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85"
              alt="Crafting Resin Art"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mt-24 pt-16 border-t border-[#F4EFE5]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              Our Principles
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#1B1915] mt-1">
              Craftsmanship Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-[#C9A052]/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE5] text-[#C9A052] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1B1915] mb-2">
                Certified Food-Safe & Non-Toxic
              </h4>
              <p className="text-xs text-[#77736B] leading-relaxed">
                Our serving boards and coasters are conditioned with organic beeswax and use fully cured, zero-VOC food-contact grade resins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#C9A052]/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE5] text-[#C9A052] flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1B1915] mb-2">
                Multi-Stage Thermal Curing
              </h4>
              <p className="text-xs text-[#77736B] leading-relaxed">
                Rather than rushing pours in single thick batches, we build 3D depth with micro-layers over weeks to eliminate trapped air and stress cracks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#C9A052]/20 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#F4EFE5] text-[#C9A052] flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-base text-[#1B1915] mb-2">
                100% Individualized Artistry
              </h4>
              <p className="text-xs text-[#77736B] leading-relaxed">
                No two pours ever flow identically. Every client receives a certified one-of-a-kind creation signed by the artisan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
