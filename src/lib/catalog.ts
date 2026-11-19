export interface CatalogCategory {
  name: string;
  slug: string;
  sub: string;
}

export interface CatalogTier {
  name: "Signature Collections" | "Hand-Poured Masterpieces" | "Gift Articles";
  tagline: string;
  categories: CatalogCategory[];
}

export const CATALOG_TIERS: CatalogTier[] = [
  {
    name: "Signature Collections",
    tagline: "Architectural wall art, silent geode clocks & luxury tableware",
    categories: [
      {
        name: "Statement Wall Art",
        slug: "statement-wall-art",
        sub: "Geode Art • Ocean Art • Abstract Resin Art",
      },
      {
        name: "Timeless Creations",
        slug: "timeless-creations",
        sub: "Resin Clocks • Geode Clocks • Designer Timepieces",
      },
      {
        name: "Luxe Living & Tableware",
        slug: "luxe-living-tableware",
        sub: "Serving Trays • Coasters • Table Décor • Tissue Holders",
      },
    ],
  },
  {
    name: "Hand-Poured Masterpieces",
    tagline: "Sacred wedding preservation, celebratory platters & personalized heirlooms",
    categories: [
      {
        name: "Forever Memories",
        slug: "forever-memories",
        sub: "Wedding Preservation • Photo Frames • Memory Clocks",
      },
      {
        name: "Wedding & Celebration",
        slug: "wedding-celebration",
        sub: "Ring Platters • Varmala Preservation • Haldi Bowls • Wedding Gifts",
      },
      {
        name: "Personalized Treasures",
        slug: "personalized-treasures",
        sub: "Nameplates • Keychains • Customized Gifts",
      },
    ],
  },
  {
    name: "Gift Articles",
    tagline: "Auspicious festive elegance & bespoke corporate signature hampers",
    categories: [
      {
        name: "Festive Elegance",
        slug: "festive-elegance",
        sub: "Shubh Labh • Torans • Diya Plates • Festive Hangings",
      },
      {
        name: "Corporate & Signature Gifting",
        slug: "corporate-signature-gifting",
        sub: "Corporate Hampers • Custom Branding • Bulk Gifts",
      },
    ],
  },
];

export function findTierForCategory(categoryName: string) {
  for (const tier of CATALOG_TIERS) {
    if (tier.categories.some((c) => c.name.toLowerCase() === categoryName.toLowerCase())) {
      return tier;
    }
  }
  return null;
}
