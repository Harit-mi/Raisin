export interface CatalogCategory {
  number: string;
  name: string;
  slug: string;
  sub: string;
  subItems: string[];
  description: string;
  image: string;
  featuredHighlight: string;
}

export interface CatalogTier {
  number: string;
  name: "Signature Collections" | "Hand-Poured Masterpieces" | "Gift Articles";
  slug: "signature-collections" | "hand-poured-masterpieces" | "gift-articles";
  tagline: string;
  description: string;
  heroImage: string;
  categories: CatalogCategory[];
}

export const CATALOG_TIERS: CatalogTier[] = [
  {
    number: "01",
    name: "Signature Collections",
    slug: "signature-collections",
    tagline: "Architectural wall art, silent geode clocks & luxury tableware",
    description:
      "The pinnacle of resin atelier craftsmanship. Designed for luxury private residences, executive suites, and architectural feature spaces where art commands the room.",
    heroImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=85",
    categories: [
      {
        number: "01",
        name: "Statement Wall Art",
        slug: "statement-wall-art",
        sub: "Geode Art • Ocean Art • Abstract Resin Art",
        subItems: ["Geode Art", "Ocean Art", "Abstract Resin Art"],
        description:
          "Multi-layered fluid resin poured over sustainably sourced birchwood. Features real crystal quartz points, ocean sand gradients, and hand-applied 24K gold foil veins.",
        image:
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Multi-stage 10-day curing cycle",
      },
      {
        number: "02",
        name: "Timeless Creations",
        slug: "timeless-creations",
        sub: "Resin Clocks • Geode Clocks • Designer Timepieces",
        subItems: ["Resin Clocks", "Geode Clocks", "Designer Timepieces"],
        description:
          "Functional horological sculptures engineered with German silent-sweep quartz movements, natural raw amethyst clusters, and gilded Roman hour markers.",
        image: "/uploads/custom_clock.png",
        featuredHighlight: "Silent high-torque sweep movement",
      },
      {
        number: "03",
        name: "Luxe Living & Tableware",
        slug: "luxe-living-tableware",
        sub: "Serving Trays • Coasters • Table Décor • Tissue Holders",
        subItems: ["Serving Trays", "Coasters", "Table Décor", "Tissue Holders"],
        description:
          "Everyday objects elevated to fine art. Handcrafted vanity trays with cast champagne handles, heat-safe hexagonal coasters, and live-edge timber resin accents.",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Heat-resistant scratch-proof resin",
      },
    ],
  },
  {
    number: "02",
    name: "Hand-Poured Masterpieces",
    slug: "hand-poured-masterpieces",
    tagline: "Sacred wedding preservation, celebratory platters & personalized heirlooms",
    description:
      "Cherished emotion cast into optical-grade permanence. Preserving matrimonial garlands, sacred ritual memories, and bespoke family signatures that transcend generations.",
    heroImage:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=85",
    categories: [
      {
        number: "01",
        name: "Forever Memories",
        slug: "forever-memories",
        sub: "Wedding Preservation • Photo Frames • Memory Clocks",
        subItems: ["Wedding Preservation", "Photo Frames", "Memory Clocks"],
        description:
          "Freeze your auspicious wedding garland roses, anniversary bouquets, and sacred petals in non-yellowing UV-shielded resin blocks and memory clocks.",
        image:
          "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Optical UV-shielded freeze preservation",
      },
      {
        number: "02",
        name: "Wedding & Celebration",
        slug: "wedding-celebration",
        sub: "Ring Platters • Varmala Preservation • Haldi Bowls • Wedding Gifts",
        subItems: ["Ring Platters", "Varmala Preservation", "Haldi Bowls", "Wedding Gifts"],
        description:
          "Heirloom accessories designed for sacred milestone rituals. Hand-poured pearlescent engagement ring platters, varmala domes, and Kundan Haldi bowls.",
        image:
          "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Custom engraved brass bridal plate",
      },
      {
        number: "03",
        name: "Personalized Treasures",
        slug: "personalized-treasures",
        sub: "Nameplates • Keychains • Customized Gifts",
        subItems: ["Nameplates", "Keychains", "Customized Gifts"],
        description:
          "Bespoke exterior-grade waterproof entrance nameplates with raised laser-cut brass lettering, monogram keychains, and family crest wall plaques.",
        image:
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Solid 3D brass metal inlays",
      },
    ],
  },
  {
    number: "03",
    name: "Gift Articles",
    slug: "gift-articles",
    tagline: "Auspicious festive elegance & bespoke corporate signature hampers",
    description:
      "Prestigious tokens of celebration, cultural reverence, and executive hospitality crafted with authentic 24K gold foil, Kundan stone work, and custom identity branding.",
    heroImage:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1600&q=85",
    categories: [
      {
        number: "01",
        name: "Festive Elegance",
        slug: "festive-elegance",
        sub: "Shubh Labh • Torans • Diya Plates • Festive Hangings",
        subItems: ["Shubh Labh", "Torans", "Diya Plates", "Festive Hangings"],
        description:
          "Infuse auspicious grace into homes with handcrafted vermilion Shubh Labh wall emblems, heirloom pearl torans, and jeweled Kundan diya plates.",
        image:
          "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Hand-set Kundan stones & brass bells",
      },
      {
        number: "02",
        name: "Corporate & Signature Gifting",
        slug: "corporate-signature-gifting",
        sub: "Corporate Hampers • Custom Branding • Bulk Gifts",
        subItems: ["Corporate Hampers", "Custom Branding", "Bulk Gifts"],
        description:
          "Sophisticated corporate appreciation hampers, laser-engraved logo desk organizers, and luxury executive gift sets packed in embossed presentation boxes.",
        image:
          "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85",
        featuredHighlight: "Corporate identity laser branding",
      },
    ],
  },
];

export function findTierBySlug(slug: string): CatalogTier | undefined {
  return CATALOG_TIERS.find(
    (t) => t.slug.toLowerCase() === slug.toLowerCase() ||
           t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
  );
}

export function findTierForCategory(categoryNameOrSlug: string): CatalogTier | null {
  const norm = categoryNameOrSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  for (const tier of CATALOG_TIERS) {
    if (
      tier.categories.some(
        (c) =>
          c.name.toLowerCase() === categoryNameOrSlug.toLowerCase() ||
          c.slug.toLowerCase() === norm
      )
    ) {
      return tier;
    }
  }
  return null;
}

export function findCategoryInTier(tier: CatalogTier, categorySlug: string): CatalogCategory | undefined {
  const norm = categorySlug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return tier.categories.find(
    (c) => c.slug.toLowerCase() === norm ||
           c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === norm
  );
}
