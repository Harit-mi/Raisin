export interface ProductCategory {
  number: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  mainCollectionSlug: string;
  subcategorySlug: string;
}

export interface Subcategory {
  letter: string; // "A", "B", "C"
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  mainCollectionSlug: string;
  productCategories: ProductCategory[];
}

export interface MainCollection {
  number: string; // "01", "02", "03"
  name: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  subcategories: Subcategory[];
}

export const MAIN_COLLECTIONS: MainCollection[] = [
  // 1. SIGNATURE COLLECTIONS
  {
    number: "01",
    name: "Signature Collections",
    slug: "signature-collections",
    tagline: "Architectural wall art, silent geode clocks & luxury tableware",
    description:
      "The pinnacle of resin atelier craftsmanship. Designed for luxury private residences, executive suites, and architectural feature spaces where art commands the room.",
    heroImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=85",
    subcategories: [
      {
        letter: "A",
        name: "Statement Wall Art",
        slug: "statement-wall-art",
        tagline: "Geode Art • Ocean Art • Abstract Resin Art",
        description:
          "Monumental resin wall features created across 10-day multi-stage curing cycles with raw crystals, genuine sands, and 24K champagne leaf.",
        image:
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "signature-collections",
        productCategories: [
          {
            number: "01",
            name: "Geode Art",
            slug: "geode-art",
            tagline: "Natural raw crystal geode formations with shimmering metallic veins",
            description:
              "Handcrafted with crushed quartz, high-refraction resin, and liquid gold lining, reproducing authentic geological crystalline depth.",
            image:
              "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "statement-wall-art",
          },
          {
            number: "02",
            name: "Ocean Art",
            slug: "ocean-art",
            tagline: "Multi-depth tidal surf with genuine white quartz sands and sea foam cells",
            description:
              "Layer upon layer of turquoise to abyssal navy resin with blown lacing that replicates the calming surge of ocean waves.",
            image:
              "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "statement-wall-art",
          },
          {
            number: "03",
            name: "Abstract Resin Art",
            slug: "abstract-resin-art",
            tagline: "Fluid celestial motion blending obsidian, champagne gold, and liquid silver",
            description:
              "Expressive abstract flow compositions manipulating viscous pigments with blowtorches for dynamic movement and mirror gloss.",
            image:
              "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "statement-wall-art",
          },
        ],
      },
      {
        letter: "B",
        name: "Timeless Creations",
        slug: "timeless-creations",
        tagline: "Resin Clocks • Geode Clocks • Designer Timepieces",
        description:
          "Functional horological sculptures blending gemstone geodes with German silent quartz movements and hand-gilded numerals.",
        image: "/uploads/custom_clock.png",
        mainCollectionSlug: "signature-collections",
        productCategories: [
          {
            number: "01",
            name: "Resin Clocks",
            slug: "resin-clocks",
            tagline: "Midnight and marble fluid resin faces with silent high-torque sweep hands",
            description:
              "Sleek architectural wall clocks cast with optical UV-stabilized resin and satin brass hour indicators for quiet elegance.",
            image: "/uploads/custom_clock.png",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "timeless-creations",
          },
          {
            number: "02",
            name: "Geode Clocks",
            slug: "geode-clocks",
            tagline: "Genuine raw amethyst and quartz crystals embedded in concentric fracture lines",
            description:
              "Combines crystal energy and precision timekeeping with shimmering gilded fracture veins that catch ambient chandelier light.",
            image:
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "timeless-creations",
          },
          {
            number: "03",
            name: "Designer Timepieces",
            slug: "designer-timepieces",
            tagline: "Minimalist dual-finish textural statements in volcanic charcoal and 24K gold",
            description:
              "Sculptural, avant-garde timepieces created for contemporary interior styling and refined corporate reception spaces.",
            image:
              "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "timeless-creations",
          },
        ],
      },
      {
        letter: "C",
        name: "Luxe Living & Tableware",
        slug: "luxe-living-tableware",
        tagline: "Serving Trays • Coasters • Table Décor • Tissue Holders",
        description:
          "Transforming functional hospitality items into high-gloss collector pieces with cast handles, heat-safe finishes, and live-edge wood.",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "signature-collections",
        productCategories: [
          {
            number: "01",
            name: "Serving Trays",
            slug: "serving-trays",
            tagline: "Hand-cast champagne handles with molten swirl translucent resin bases",
            description:
              "Sophisticated vanity and cocktail hosting trays framed with brushed metal handles and non-scratch protective silicone pads.",
            image:
              "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "luxe-living-tableware",
          },
          {
            number: "02",
            name: "Coasters",
            slug: "coasters",
            tagline: "Hexagonal and agate-slice coasters with hand-gilded edges and cork backing",
            description:
              "Sets of 4 or 6 heat-resistant (up to 80°C) luxury coasters embedded with black diamond pigment and metallic champagne leaf.",
            image:
              "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "luxe-living-tableware",
          },
          {
            number: "03",
            name: "Table Décor",
            slug: "table-decor",
            tagline: "Live-edge teak slices with deep-pour turquoise resin river lagoons",
            description:
              "Centerpiece accent bowls and table accents pairing natural organic timber grains with crystalline clear resin infusions.",
            image:
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "luxe-living-tableware",
          },
          {
            number: "04",
            name: "Tissue Holders",
            slug: "tissue-holders",
            tagline: "Solid heavy-cast resin tissue covers with liquid marble swirls and gold flake",
            description:
              "Weighted luxury tissue box covers with seamless magnetic slide bottoms designed to elevate bedside tables and vanity counters.",
            image:
              "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "signature-collections",
            subcategorySlug: "luxe-living-tableware",
          },
        ],
      },
    ],
  },

  // 2. HAND-POURED MASTERPIECES
  {
    number: "02",
    name: "Hand-Poured Masterpieces",
    slug: "hand-poured-masterpieces",
    tagline: "Sacred wedding preservation, celebratory platters & personalized heirlooms",
    description:
      "Cherished emotion cast into optical-grade permanence. Preserving matrimonial garlands, sacred ritual memories, and bespoke family signatures that transcend generations.",
    heroImage:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=85",
    subcategories: [
      {
        letter: "A",
        name: "Forever Memories",
        slug: "forever-memories",
        tagline: "Wedding Preservation • Photo Frames • Memory Clocks",
        description:
          "Preserve sacred wedding blossoms, anniversary flowers, and personal milestones in crystal-clear non-yellowing epoxy blocks.",
        image:
          "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "hand-poured-masterpieces",
        productCategories: [
          {
            number: "01",
            name: "Wedding Preservation",
            slug: "wedding-preservation",
            tagline: "Freeze your auspicious varmala roses forever in optical UV-shielded cubes",
            description:
              "Flowers undergo gentle dehydration and freeze-preservation before multi-stage casting in diamond-polished clear blocks.",
            image:
              "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "forever-memories",
          },
          {
            number: "02",
            name: "Photo Frames",
            slug: "photo-frames",
            tagline: "Recessed picture windows encased in floating baby's breath and gold leaf",
            description:
              "Handcrafted resin portrait frames with beveled edges and rear brass easels to display your most treasured memories.",
            image:
              "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "forever-memories",
          },
          {
            number: "03",
            name: "Memory Clocks",
            slug: "memory-clocks",
            tagline: "Circular wall clocks embedding preserved bridal petals with silent brass hands",
            description:
              "A functional daily reminder of love and milestone ceremonies, preserving real florals in a crystal resin clock face.",
            image: "/uploads/custom_clock.png",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "forever-memories",
          },
        ],
      },
      {
        letter: "B",
        name: "Wedding & Celebration",
        slug: "wedding-celebration",
        tagline: "Ring Platters • Varmala Preservation • Haldi Bowls • Wedding Gifts",
        description:
          "Bespoke ceremonial accessories designed for sacred engagement ceremonies, Haldi rituals, and memorable return favors.",
        image:
          "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "hand-poured-masterpieces",
        productCategories: [
          {
            number: "01",
            name: "Ring Platters",
            slug: "ring-platters",
            tagline: "Pearlescent resin platters with plush velvet ring cushions and engraved brass initials",
            description:
              "The centerpiece of engagement ceremonies, embellished with gilded rim details, luxury crystal handles, and custom monogramming.",
            image:
              "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "wedding-celebration",
          },
          {
            number: "02",
            name: "Varmala Preservation",
            slug: "varmala-preservation",
            tagline: "3D free-standing domes encapsulating complete ceremonial rose garlands",
            description:
              "High-clarity optical resin arched domes capturing whole varmala blossoms with date plaque engravings.",
            image:
              "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "wedding-celebration",
          },
          {
            number: "03",
            name: "Haldi Bowls",
            slug: "haldi-bowls",
            tagline: "Turmeric gold ceremonial thalis with 2 or 4 embedded katori cups for Kumkum & Haldi",
            description:
              "Washable, heat-safe ceremonial platters with Kundan stone borders crafted specifically for vibrant Mehendi rituals.",
            image:
              "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "wedding-celebration",
          },
          {
            number: "04",
            name: "Wedding Gifts",
            slug: "wedding-gifts",
            tagline: "Curated bespoke bridal and anniversary keepsakes packed in luxury presentation boxes",
            description:
              "Personalized congratulations hampers, couple name plaques, and gold-foiled celebration decor gifts.",
            image:
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "wedding-celebration",
          },
        ],
      },
      {
        letter: "C",
        name: "Personalized Treasures",
        slug: "personalized-treasures",
        tagline: "Nameplates • Keychains • Customized Gifts",
        description:
          "Customized resin treasures with laser-cut brass metal typography, monogram letters, and personalized house titles.",
        image:
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "hand-poured-masterpieces",
        productCategories: [
          {
            number: "01",
            name: "Nameplates",
            slug: "nameplates",
            tagline: "Weatherproof exterior entrance plaques with 3D raised brass metal lettering",
            description:
              "Cast in waterproof outdoor resin with gold flakes, family surname, and villa numbers with concealed mounting studs.",
            image:
              "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "personalized-treasures",
          },
          {
            number: "02",
            name: "Keychains",
            slug: "keychains",
            tagline: "Crystal resin monogram initials with 24K gold foil and heavy brass lobster clasps",
            description:
              "Tactile everyday pocket art available in dual pairs with personalized charms and silk tassels.",
            image:
              "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "personalized-treasures",
          },
          {
            number: "03",
            name: "Customized Gifts",
            slug: "customized-gifts",
            tagline: "Circular decorative family plaques with geode borders and raised acrylic lettering",
            description:
              "Tailored wall plaques and anniversary mementos personalized with family names, dates, or custom mantras.",
            image:
              "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "hand-poured-masterpieces",
            subcategorySlug: "personalized-treasures",
          },
        ],
      },
    ],
  },

  // 3. GIFT ARTICLES
  {
    number: "03",
    name: "Gift Articles",
    slug: "gift-articles",
    tagline: "Auspicious festive elegance & bespoke corporate signature hampers",
    description:
      "Prestigious tokens of celebration, cultural reverence, and executive hospitality crafted with authentic 24K gold foil, Kundan stone work, and custom identity branding.",
    heroImage:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1600&q=85",
    subcategories: [
      {
        letter: "A",
        name: "Festive Elegance",
        slug: "festive-elegance",
        tagline: "Shubh Labh • Torans • Diya Plates • Festive Hangings",
        description:
          "Traditional auspicious symbols reimagined in permanent high-gloss resin for Diwali, housewarmings, and festive rituals.",
        image:
          "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "gift-articles",
        productCategories: [
          {
            number: "01",
            name: "Shubh Labh",
            slug: "shubh-labh",
            tagline: "Sacred devanagari icons hand-cast in auspicious vermilion & gold resin",
            description:
              "Pairs of 6-inch entrance discs with gold leaf lettering, swastika motifs, and dangling brass bells.",
            image:
              "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "festive-elegance",
          },
          {
            number: "02",
            name: "Torans",
            slug: "torans",
            tagline: "Handcrafted entrance door hangings with resin lotus medallions and pearl drops",
            description:
              "Reusable heirloom entrance torans that retain their lustrous shine season after season.",
            image:
              "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "festive-elegance",
          },
          {
            number: "03",
            name: "Diya Plates",
            slug: "diya-plates",
            tagline: "Heat-resistant jewel-toned resin tealight plates studded with Kundan gemstones",
            description:
              "Intricately embellished diya holders designed for illuminated festival poojas and dinner tables.",
            image:
              "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "festive-elegance",
          },
          {
            number: "04",
            name: "Festive Hangings",
            slug: "festive-hangings",
            tagline: "Decorative festive wall medallions and auspicious pooja room hangings",
            description:
              "Hand-poured golden hangings embellished with auspicious motifs and decorative golden cords.",
            image:
              "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "festive-elegance",
          },
        ],
      },
      {
        letter: "B",
        name: "Corporate & Signature Gifting",
        slug: "corporate-signature-gifting",
        tagline: "Corporate Hampers • Custom Branding • Bulk Gifts",
        description:
          "Luxury bespoke executive appreciation suites, laser-engraved desk accessories, and curated milestone gifting.",
        image:
          "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85",
        mainCollectionSlug: "gift-articles",
        productCategories: [
          {
            number: "01",
            name: "Corporate Hampers",
            slug: "corporate-hampers",
            tagline: "Executive matching desk organizer trays, coaster pairs, and branded pen stands",
            description:
              "The pinnacle of corporate recognition, packed in matte black magnetic presentation boxes with satin ribbons.",
            image:
              "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "corporate-signature-gifting",
          },
          {
            number: "02",
            name: "Custom Branding",
            slug: "custom-branding",
            tagline: "Trophies and keepsakes with embedded 3D corporate identity logos in crystal resin",
            description:
              "Replace generic acrylic trophies with handcrafted resin awards featuring citation brass plates and gold flake.",
            image:
              "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "corporate-signature-gifting",
          },
          {
            number: "03",
            name: "Bulk Gifts",
            slug: "bulk-gifts",
            tagline: "Artisan hand-poured festive gift boxes for VIP clients and employee celebrations",
            description:
              "Customized bulk sets featuring coasters, scented soy candle jars with resin lids, and personalized cards.",
            image:
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85",
            mainCollectionSlug: "gift-articles",
            subcategorySlug: "corporate-signature-gifting",
          },
        ],
      },
    ],
  },
];

// Helper Lookups
export function getMainCollections(): MainCollection[] {
  return MAIN_COLLECTIONS;
}

export function getMainCollectionBySlug(slug: string): MainCollection | undefined {
  const norm = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return MAIN_COLLECTIONS.find((m) => m.slug === norm || m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === norm);
}

export function getSubcategoryBySlug(
  collectionSlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  const collection = getMainCollectionBySlug(collectionSlug);
  if (!collection) return undefined;
  const normSub = subcategorySlug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return collection.subcategories.find(
    (s) => s.slug === normSub || s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normSub
  );
}

export function getProductCategoryBySlug(
  collectionSlug: string,
  subcategorySlug: string,
  productCategorySlug: string
): ProductCategory | undefined {
  const subcategory = getSubcategoryBySlug(collectionSlug, subcategorySlug);
  if (!subcategory) return undefined;
  const normCat = productCategorySlug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return subcategory.productCategories.find(
    (c) => c.slug === normCat || c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normCat
  );
}

export function findHierarchyForCategory(categoryNameOrSlug: string): {
  mainCollection?: MainCollection;
  subcategory?: Subcategory;
  productCategory?: ProductCategory;
} {
  const norm = categoryNameOrSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  for (const main of MAIN_COLLECTIONS) {
    for (const sub of main.subcategories) {
      for (const prodCat of sub.productCategories) {
        if (
          prodCat.slug === norm ||
          prodCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === norm ||
          prodCat.name.toLowerCase() === categoryNameOrSlug.toLowerCase()
        ) {
          return {
            mainCollection: main,
            subcategory: sub,
            productCategory: prodCat,
          };
        }
      }
      if (
        sub.slug === norm ||
        sub.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === norm ||
        sub.name.toLowerCase() === categoryNameOrSlug.toLowerCase()
      ) {
        return {
          mainCollection: main,
          subcategory: sub,
        };
      }
    }
    if (
      main.slug === norm ||
      main.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === norm ||
      main.name.toLowerCase() === categoryNameOrSlug.toLowerCase()
    ) {
      return { mainCollection: main };
    }
  }

  return {};
}

// Backward compatibility helper for CATALOG_TIERS
export const CATALOG_TIERS = MAIN_COLLECTIONS.map((m) => ({
  number: m.number,
  name: m.name,
  slug: m.slug,
  tagline: m.tagline,
  description: m.description,
  heroImage: m.heroImage,
  categories: m.subcategories.map((s, idx) => ({
    number: `0${idx + 1}`,
    name: s.name,
    slug: s.slug,
    sub: s.tagline,
    subItems: s.productCategories.map((p) => p.name),
    description: s.description,
    image: s.image,
    featuredHighlight: `${s.productCategories.length} Product Categories`,
  })),
}));

export function findTierBySlug(slug: string) {
  return CATALOG_TIERS.find((t) => t.slug === slug) || null;
}

export function findTierForCategory(categoryNameOrSlug: string) {
  const res = findHierarchyForCategory(categoryNameOrSlug);
  if (!res.mainCollection) return null;
  return CATALOG_TIERS.find((t) => t.slug === res.mainCollection?.slug) || null;
}

export function findCategoryInTier(tier: (typeof CATALOG_TIERS)[number], categorySlug: string) {
  return tier.categories.find((c) => c.slug === categorySlug) || null;
}
