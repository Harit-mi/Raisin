import fs from "fs";
import path from "path";
import {
  Product,
  Category,
  Order,
  CustomStudioRequest,
  ConsultationBooking,
  ContactMessage,
  Coupon,
} from "@/types";

const DATA_FILE = path.join(process.cwd(), "src", "data", "store.json");

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customRequests: CustomStudioRequest[];
  bookings: ConsultationBooking[];
  messages: ContactMessage[];
  coupons: Coupon[];
  announcement: {
    text: string;
    isActive: boolean;
    link?: string;
  };
}

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-wall-art",
    name: "Resin Wall Art",
    slug: "resin-wall-art",
    description: "Multilayered statement canvases with 3D ocean swells, geodes, and liquid glass gloss.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    itemCount: 4,
  },
  {
    id: "cat-clocks",
    name: "Resin Clocks",
    slug: "resin-clocks",
    description: "Quiet sweep luxury timepieces handcrafted with crystal geodes and gilded hour markers.",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
    itemCount: 3,
  },
  {
    id: "cat-coasters",
    name: "Resin Coasters",
    slug: "resin-coasters",
    description: "Hand-poured artisan drinkware sets featuring natural raw edges and champagne leaf.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    itemCount: 5,
  },
  {
    id: "cat-trays",
    name: "Resin Trays",
    slug: "resin-trays",
    description: "Luxurious vanity and vanity coffee table trays with brushed brass and cast handles.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    itemCount: 3,
  },
  {
    id: "cat-tables",
    name: "Resin Tables & Furniture",
    slug: "resin-tables",
    description: "Live-edge teak and walnut river tables infused with deep oceanic translucent epoxy.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    itemCount: 2,
  },
  {
    id: "cat-serving-boards",
    name: "Serving Boards",
    slug: "serving-boards",
    description: "Acacia and seasoned mango timber charcuterie boards layered with sea-wave resin.",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    itemCount: 3,
  },
  {
    id: "cat-keepsakes",
    name: "Personalized Keepsakes",
    slug: "personalized-keepsakes",
    description: "Preserved bridal florals, ceremonial memories, and custom monogrammed resin heirlooms.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    itemCount: 2,
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "DRL-PRD-001",
    name: "Ocean Reverie Wall Art",
    slug: "ocean-reverie-wall-art",
    category: "Resin Wall Art",
    tagline: "3-tier dimensional ocean surf with genuine quartz sands and 24K gold foil accents.",
    description:
      "Hand-poured across 5 meticulous curing stages over 10 days, 'Ocean Reverie' replicates the soothing energy of turquoise Indian Ocean shorelines. Created on sustainably sourced birchwood panels with anti-yellowing optical UV-stabilized resin, authentic sea sands, and real gold leaf highlights.",
    price: 14500,
    compareAtPrice: 17500,
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-ART-001",
    inventoryCount: 4,
    inStock: true,
    isReadyToShip: true,
    isMadeToOrder: false,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "24 x 36 inches (60 x 90 cm)",
    weight: "4.8 kg",
    materials: ["Optically pure epoxy resin", "Cured birch substrate", "White quartz sand", "24K champagne leaf"],
    finish: "Ultra-high gloss mirror resin",
    productionLeadTime: "Ready to dispatch in 48 hours",
    shippingInfo: "Shipped in custom wooden crate with shock-resistant cushioning. Insured transit.",
    careInstructions: [
      "Wipe gently with a microfiber cloth and mild warm water.",
      "Avoid abrasive scrubbers, harsh solvents, or alcohol sprays.",
      "Do not hang in direct relentless summer sunlight for prolonged decades.",
    ],
    availableSizes: [
      { name: "Standard (24x36 in)", extraPrice: 0 },
      { name: "Grand Luxe (30x48 in)", extraPrice: 7000 },
    ],
    availableColors: ["Ocean Teal & Gold", "Deep Azure & Silver", "Emerald Coast & Bronze"],
    rating: 4.9,
    reviewCount: 28,
    createdAt: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "DRL-PRD-002",
    name: "Golden Hour Trinket Tray",
    slug: "golden-hour-trinket-tray",
    category: "Resin Trays",
    tagline: "Translucent amber swirl tray finished with hand-cast champagne gold handles.",
    description:
      "A graceful addition to vanities, entry consoles, or coffee tables. The Golden Hour tray captures the warmth of sunset through molten-effect resin ribbons, framed with brushed champagne metal handles for easy hosting and display.",
    price: 3499,
    compareAtPrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-TRY-002",
    inventoryCount: 12,
    inStock: true,
    isReadyToShip: true,
    isMadeToOrder: false,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "14 x 10 x 1.5 inches",
    weight: "1.2 kg",
    materials: ["Food-safe clear epoxy", "Warm amber pigments", "Brushed metal handles"],
    finish: "Silky gloss topcoat with scratch-resistant polymer",
    productionLeadTime: "Ready to ship in 1-2 business days",
    shippingInfo: "Standard express delivery across India in 3-5 days.",
    careInstructions: [
      "Hand wash with mild dish soap.",
      "Not dishwasher or microwave safe.",
      "Heat safe up to 60°C (140°F).",
    ],
    availableSizes: [
      { name: "Medium (14x10 in)", extraPrice: 0 },
      { name: "Large (18x12 in)", extraPrice: 1200 },
    ],
    availableColors: ["Sunset Amber", "Pearl White & Gold", "Midnight Onyx"],
    rating: 4.8,
    reviewCount: 19,
    createdAt: "2026-01-14T12:00:00.000Z",
  },
  {
    id: "DRL-PRD-003",
    name: "Coastal Edge Side Table",
    slug: "coastal-edge-side-table",
    category: "Resin Tables & Furniture",
    tagline: "Single-slab seasoned Indian Rosewood with translucent deep ocean lagoon river.",
    description:
      "A signature statement furniture piece. We hand-select 40-year naturally seasoned Rosewood (Sheesham) slabs with wild natural live edges, then cast an ethereal ocean river with graded depths from turquoise shoals to abyssal navy, complete with matte black powder-coated steel hairpin legs.",
    price: 38500,
    compareAtPrice: 45000,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-TBL-003",
    inventoryCount: 2,
    inStock: true,
    isReadyToShip: false,
    isMadeToOrder: true,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "22 in diameter x 20 in height (56 x 50 cm)",
    weight: "14.5 kg",
    materials: ["Solid Indian Rosewood", "Deep-pour structural epoxy", "Powder-coated steel legs"],
    finish: "Hardwax natural oil wood finish with ultra-gloss resin river",
    productionLeadTime: "Crafted to order: 12-16 business days",
    shippingInfo: "Shipped via White Glove Furniture Transport with tracking.",
    careInstructions: [
      "Use coasters for hot mugs over 65°C.",
      "Clean with wood polish or damp microfiber.",
      "Avoid standing pools of liquid for long durations.",
    ],
    availableSizes: [
      { name: "Coffee Side Table (22 in dia)", extraPrice: 0 },
      { name: "Center Accent Table (28 in dia)", extraPrice: 12000 },
    ],
    availableColors: ["Deep Caribbean Ocean", "Emerald Moss Lagoon", "Smoky Topaz & Gold"],
    rating: 5.0,
    reviewCount: 14,
    createdAt: "2026-01-20T09:00:00.000Z",
  },
  {
    id: "DRL-PRD-004",
    name: "Midnight Bloom Coasters (Set of 4)",
    slug: "midnight-bloom-coasters",
    category: "Resin Coasters",
    tagline: "Deep black mica with liquid gold leaf filigree and crystal gilded rims.",
    description:
      "A set of 4 hexagonal luxury coasters that evoke the mystery of blossoming orchids under midnight moonlight. Layered with black diamond pigment, metallic champagne foil, and hand-gilded edges, each coaster features cork backing to protect fine furniture.",
    price: 1899,
    compareAtPrice: 2400,
    images: [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-CST-004",
    inventoryCount: 25,
    inStock: true,
    isReadyToShip: true,
    isMadeToOrder: false,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "4.5 inches across each (Set of 4)",
    weight: "480 g",
    materials: ["Heat-resistant epoxy resin (up to 80°C)", "Metallic foil", "Protective cork back"],
    finish: "Glossy topcoat with gilded metallic edge",
    productionLeadTime: "In stock, ready to dispatch within 24 hours",
    shippingInfo: "Comes packed in an embossed gift box tied with champagne satin ribbon.",
    careInstructions: [
      "Wipe clean with a damp cloth.",
      "Do not submerge in water or place in dishwasher.",
    ],
    availableSizes: [
      { name: "Set of 4 Coasters", extraPrice: 0 },
      { name: "Set of 6 Coasters", extraPrice: 850 },
    ],
    availableColors: ["Midnight Black & Gold", "Rose Quartz & Rose Gold", "Ocean Turquoise & Gold"],
    rating: 4.9,
    reviewCount: 42,
    createdAt: "2026-02-01T15:00:00.000Z",
  },
  {
    id: "DRL-PRD-005",
    name: "Celestial Resin Clock",
    slug: "celestial-resin-clock",
    category: "Resin Clocks",
    tagline: "Silent sweep quartz movement embedded in raw geode crystals and swirling gold veins.",
    description:
      "A functional work of art. The Celestial Clock features natural amethyst crystal clusters embedded directly into an ivory and champagne marble resin canvas. Equipped with high-torque silent German quartz movement so your living room or study stays serenely quiet.",
    price: 8900,
    compareAtPrice: 10500,
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-CLK-005",
    inventoryCount: 6,
    inStock: true,
    isReadyToShip: true,
    isMadeToOrder: false,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "16 inches diameter (40 cm)",
    weight: "2.4 kg",
    materials: ["MDF backing board", "Crushed natural crystal geode", "Epoxy resin", "Brass hour hands"],
    finish: "Glass-smooth resin with textured 3D geode center",
    productionLeadTime: "Dispatches in 2-3 business days",
    shippingInfo: "Packed in reinforced box with hands protected.",
    careInstructions: [
      "Requires 1 AA battery (included).",
      "Dust gently with a soft feather duster.",
    ],
    availableSizes: [
      { name: "Standard 16-inch", extraPrice: 0 },
      { name: "Grand 20-inch", extraPrice: 3200 },
    ],
    availableColors: ["Ivory & Champagne Geode", "Emerald Gold", "Sapphire Silver"],
    rating: 4.9,
    reviewCount: 31,
    createdAt: "2026-02-10T11:00:00.000Z",
  },
  {
    id: "DRL-PRD-006",
    name: "Sculpted Keepsake Bowl",
    slug: "sculpted-keepsake-bowl",
    category: "Home Accessories",
    tagline: "Freeform organic wave rim cast in pearlized alabaster and gold leaf specks.",
    description:
      "Cast freehand with organic draping techniques, no two keepsake bowls are ever identical. Ideal for storing heirloom jewelry, rings, crystals, or as a sculptural centerpiece on a vanity or coffee table.",
    price: 2799,
    compareAtPrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-BWL-006",
    inventoryCount: 8,
    inStock: true,
    isReadyToShip: true,
    isMadeToOrder: false,
    isCustomizable: false,
    isFeatured: false,
    dimensions: "8 x 8 x 3 inches",
    weight: "650 g",
    materials: ["Cast epoxy resin", "Pearl shimmer mica", "24K gold foil flakes"],
    finish: "Smooth tactile satin interior with glossy exterior",
    productionLeadTime: "Ready to ship in 1-2 days",
    shippingInfo: "Shipped in bubble-shielded gift packaging.",
    careInstructions: ["Rinse with cool water.", "Do not use for hot liquids or soups."],
    availableColors: ["Pearlescent White", "Smoky Quartz", "Ocean Azure"],
    rating: 4.7,
    reviewCount: 16,
    createdAt: "2026-02-15T14:30:00.000Z",
  },
  {
    id: "DRL-PRD-007",
    name: "Riverstone Serving Board",
    slug: "riverstone-serving-board",
    category: "Serving Boards",
    tagline: "Sustainable seasoned mango wood paired with a rippling oceanic tide resin inlay.",
    description:
      "Elevate weekend entertaining and intimate dinner parties. Crafted from kiln-dried Indian mango wood, this charcuterie board features a hand-blown white resin seafoam wave crashing across rich wood grain. Treated with organic food-safe beeswax.",
    price: 4200,
    compareAtPrice: 4999,
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-SRV-007",
    inventoryCount: 15,
    inStock: true,
    isReadyToShip: true,
    isMadeToOrder: false,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "18 x 9 x 0.8 inches",
    weight: "1.6 kg",
    materials: ["Indian Mango Wood", "Food-safe resin inlay", "Organic beeswax conditioning"],
    finish: "Natural satin wood finish with glass-like resin wave",
    productionLeadTime: "Ships in 24-48 hours",
    shippingInfo: "Packaged with complimentary wood conditioning butter and care card.",
    careInstructions: [
      "Cut only on the wooden section, not directly on the resin wave.",
      "Hand wash and dry immediately.",
      "Re-oil with food-grade mineral oil or coconut oil every 2 months.",
    ],
    availableSizes: [
      { name: "Classic Board (18x9 in)", extraPrice: 0 },
      { name: "Grand Feast Board (24x11 in)", extraPrice: 1800 },
    ],
    availableColors: ["Caribbean Blue Wave", "Black Pearl & Gold", "Emerald Reef"],
    rating: 4.9,
    reviewCount: 37,
    createdAt: "2026-02-18T16:00:00.000Z",
  },
  {
    id: "DRL-PRD-008",
    name: "Personalized Memory Keepsake",
    slug: "personalized-memory-keepsake",
    category: "Personalized Keepsakes",
    tagline: "Preserve wedding florals, anniversary memories, and custom engravings in archival glass resin.",
    description:
      "Our most sentimental offering. Send us your bridal bouquet petals, varmala flowers, baby tokens, or ceremonial keepsakes. We carefully dehydrate botanical specimens in silica crystals and cast them inside crystal-clear archival resin blocks with custom laser-engraved brass plaques or text.",
    price: 6800,
    compareAtPrice: 7900,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    ],
    sku: "DRL-KPS-008",
    inventoryCount: 10,
    inStock: true,
    isReadyToShip: false,
    isMadeToOrder: true,
    isCustomizable: true,
    isFeatured: true,
    dimensions: "6 x 6 x 2.5 inches (Arch or Cube)",
    weight: "1.1 kg",
    materials: ["Archival UV-inhibiting epoxy", "Real dehydrated botanicals", "Engraved brass or vinyl"],
    finish: "Ultra-clear crystal polish with optical clarity",
    productionLeadTime: "Custom creation: 10-14 days upon receiving client botanicals",
    shippingInfo: "Shipped in padded presentation vault with velvet pouch.",
    careInstructions: [
      "Keep away from direct heat sources.",
      "Clean only with ultra-soft lens cloth.",
    ],
    availableSizes: [
      { name: "Arch Block (6x6 in)", extraPrice: 0 },
      { name: "Hexagon Plaque (8x8 in)", extraPrice: 1500 },
      { name: "Bookend Pair (2 pieces)", extraPrice: 4200 },
    ],
    availableColors: ["Crystal Clear & Gold Leaf", "Soft Pink Blush", "Emerald Accents"],
    rating: 5.0,
    reviewCount: 22,
    createdAt: "2026-02-22T08:00:00.000Z",
  },
];

const INITIAL_COUPONS: Coupon[] = [
  {
    code: "LUXURY10",
    discountPercentage: 10,
    minimumOrder: 2000,
    maxDiscount: 2500,
    description: "10% off on handcrafted orders above ₹2,000",
    isActive: true,
  },
  {
    code: "DRLFIRST",
    discountPercentage: 15,
    minimumOrder: 3500,
    maxDiscount: 3000,
    description: "15% off for your first luxury purchase",
    isActive: true,
  },
  {
    code: "FREESHIP",
    discountPercentage: 0,
    minimumOrder: 0,
    description: "Complimentary express shipping across India",
    isActive: true,
  },
];

const INITIAL_SAMPLE_ORDER: Order = {
  id: "DRL-2026-8841",
  customer: {
    fullName: "Pooja Sharma",
    email: "pooja.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Flat 402, Signature Towers, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    country: "India",
    giftNote: "Happy 10th Anniversary! Wishing you endless bliss.",
    deliveryInstructions: "Please call on gate security arrival.",
  },
  items: [
    {
      productId: "DRL-PRD-001",
      name: "Ocean Reverie Wall Art",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
      quantity: 1,
      unitPrice: 14500,
      totalPrice: 14500,
      customization: {
        size: "Standard (24x36 in)",
        color: "Ocean Teal & Gold",
        personalizationText: "P & R • 2016-2026",
        giftWrapping: true,
      },
    },
  ],
  subtotal: 14500,
  discount: 1450,
  couponCode: "LUXURY10",
  shippingFee: 0,
  tax: 0,
  total: 13050,
  paymentMethod: "UPI",
  paymentStatus: "Paid",
  razorpayOrderId: "order_demo_99214",
  razorpayPaymentId: "pay_demo_77812",
  orderStatus: "In Production",
  estimatedDelivery: "2026-11-04",
  trackingNumber: "BLUEDART-8829104",
  trackingCarrier: "Blue Dart Express",
  createdAt: "2026-10-22T14:30:00.000Z",
};

const INITIAL_CUSTOM_REQUEST: CustomStudioRequest = {
  id: "CUST-REQ-101",
  customerName: "Aarav Mehra",
  email: "aarav.m@example.com",
  phone: "+91 98200 12345",
  productType: "Resin Dining / Conference Table",
  preferredSize: "6 feet x 3 feet (6-Seater)",
  shape: "Live Edge Rectangular Slab",
  primaryColor: "Deep Oceanic Turquoise & Midnight Indigo",
  secondaryColor: "Smoky Translucent Charcoal",
  metallicAccents: "Subtle 24K Champagne Gold Leaf in eddies",
  designStyle: "Double River with Center Walnut Island",
  personalizationText: "Mehra Estate • Est. 2026",
  occasion: "New Villa Dining Room Centerpiece",
  quantity: 1,
  budgetRange: "₹80,000 - ₹1,20,000",
  requiredDeliveryDate: "2026-12-15",
  additionalInstructions: "Prefer heavy matte black spider steel base legs. Room has warm ambient lighting.",
  estimatedPrice: 95000,
  status: "Quotation Sent",
  adminQuotePrice: 92000,
  adminNotes: "Walnut slab inspected. Ready to start upon 40% initial deposit.",
  createdAt: "2026-10-23T11:20:00.000Z",
};

const INITIAL_BOOKING: ConsultationBooking = {
  id: "BOOK-701",
  fullName: "Nisha Patel",
  email: "nisha.patel@example.com",
  phone: "+91 99090 55443",
  projectType: "Complete Penthouse Art Consultation (Wall Art & Bar Counter)",
  preferredDate: "2026-10-29",
  preferredTimeSlot: "03:00 PM - 04:00 PM (IST)",
  budgetRange: "₹50,000 - ₹1,50,000",
  projectDescription: "Looking to commission 2 large ocean resin triptych wall pieces and an illuminated backlit resin bar top.",
  preferredContactMethod: "Video Call (Google Meet)",
  status: "Confirmed",
  adminNotes: "Sent Google Meet link to client email.",
  createdAt: "2026-10-24T09:15:00.000Z",
};

function ensureDbFile(): DatabaseSchema {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialDb: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      orders: [INITIAL_SAMPLE_ORDER],
      customRequests: [INITIAL_CUSTOM_REQUEST],
      bookings: [INITIAL_BOOKING],
      messages: [],
      coupons: INITIAL_COUPONS,
      announcement: {
        text: "Handcrafted with intention · Free insured shipping on orders above ₹3,000",
        isActive: true,
        link: "/shop",
      },
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialDb, null, 2), "utf-8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading database, restoring defaults:", err);
    const initialDb: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      orders: [INITIAL_SAMPLE_ORDER],
      customRequests: [INITIAL_CUSTOM_REQUEST],
      bookings: [INITIAL_BOOKING],
      messages: [],
      coupons: INITIAL_COUPONS,
      announcement: {
        text: "Handcrafted with intention · Free insured shipping on orders above ₹3,000",
        isActive: true,
        link: "/shop",
      },
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialDb, null, 2), "utf-8");
    return initialDb;
  }
}

function saveDb(data: DatabaseSchema): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const db = {
  // PRODUCTS
  getProducts(): Product[] {
    return ensureDbFile().products;
  },
  getProductBySlug(slug: string): Product | undefined {
    return ensureDbFile().products.find((p) => p.slug === slug);
  },
  getProductById(id: string): Product | undefined {
    return ensureDbFile().products.find((p) => p.id === id);
  },
  addProduct(product: Omit<Product, "id" | "createdAt">): Product {
    const state = ensureDbFile();
    const newProduct: Product = {
      ...product,
      id: `DRL-PRD-${String(state.products.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    state.products.unshift(newProduct);
    saveDb(state);
    return newProduct;
  },
  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const state = ensureDbFile();
    const index = state.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    state.products[index] = { ...state.products[index], ...updates };
    saveDb(state);
    return state.products[index];
  },
  deleteProduct(id: string): boolean {
    const state = ensureDbFile();
    const prevLen = state.products.length;
    state.products = state.products.filter((p) => p.id !== id);
    if (state.products.length !== prevLen) {
      saveDb(state);
      return true;
    }
    return false;
  },

  // CATEGORIES
  getCategories(): Category[] {
    return ensureDbFile().categories;
  },

  // COUPONS
  getCoupons(): Coupon[] {
    return ensureDbFile().coupons;
  },
  validateCoupon(code: string, subtotal: number): { valid: boolean; coupon?: Coupon; error?: string } {
    const coupons = ensureDbFile().coupons;
    const match = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!match || !match.isActive) {
      return { valid: false, error: "Invalid or expired promotional code." };
    }
    if (subtotal < match.minimumOrder) {
      return {
        valid: false,
        error: `Promo code ${match.code} requires a minimum order of ₹${match.minimumOrder.toLocaleString("en-IN")}.`,
      };
    }
    return { valid: true, coupon: match };
  },

  // ORDERS
  getOrders(): Order[] {
    return ensureDbFile().orders;
  },
  getOrderById(id: string): Order | undefined {
    return ensureDbFile().orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
  },
  createOrder(orderData: Omit<Order, "id" | "createdAt">): Order {
    const state = ensureDbFile();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `DRL-2026-${randomHex}`,
      createdAt: new Date().toISOString(),
    };
    state.orders.unshift(newOrder);

    // Update inventory
    for (const item of newOrder.items) {
      const prod = state.products.find((p) => p.id === item.productId);
      if (prod && prod.inventoryCount > 0) {
        prod.inventoryCount = Math.max(0, prod.inventoryCount - item.quantity);
        if (prod.inventoryCount === 0) prod.inStock = false;
      }
    }

    saveDb(state);
    return newOrder;
  },
  updateOrderStatus(id: string, status: Order["orderStatus"], notes?: string, trackingNumber?: string): Order | null {
    const state = ensureDbFile();
    const order = state.orders.find((o) => o.id === id);
    if (!order) return null;
    order.orderStatus = status;
    if (notes) order.notes = notes;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    saveDb(state);
    return order;
  },

  // CUSTOM STUDIO REQUESTS
  getCustomRequests(): CustomStudioRequest[] {
    return ensureDbFile().customRequests;
  },
  createCustomRequest(req: Omit<CustomStudioRequest, "id" | "createdAt" | "status">): CustomStudioRequest {
    const state = ensureDbFile();
    const newReq: CustomStudioRequest = {
      ...req,
      id: `CUST-REQ-${Math.floor(100 + Math.random() * 900)}`,
      status: "Under Review",
      createdAt: new Date().toISOString(),
    };
    state.customRequests.unshift(newReq);
    saveDb(state);
    return newReq;
  },
  updateCustomRequest(id: string, updates: Partial<CustomStudioRequest>): CustomStudioRequest | null {
    const state = ensureDbFile();
    const index = state.customRequests.findIndex((r) => r.id === id);
    if (index === -1) return null;
    state.customRequests[index] = { ...state.customRequests[index], ...updates };
    saveDb(state);
    return state.customRequests[index];
  },

  // CONSULTATION BOOKINGS
  getBookings(): ConsultationBooking[] {
    return ensureDbFile().bookings;
  },
  createBooking(booking: Omit<ConsultationBooking, "id" | "createdAt" | "status">): {
    success: boolean;
    booking?: ConsultationBooking;
    error?: string;
  } {
    const state = ensureDbFile();
    // Prevent double booking for the exact same date and slot
    const exists = state.bookings.find(
      (b) =>
        b.preferredDate === booking.preferredDate &&
        b.preferredTimeSlot === booking.preferredTimeSlot &&
        b.status !== "Cancelled"
    );
    if (exists) {
      return {
        success: false,
        error: `Slot ${booking.preferredTimeSlot} on ${booking.preferredDate} is already booked. Please choose another time.`,
      };
    }

    const newBooking: ConsultationBooking = {
      ...booking,
      id: `BOOK-${Math.floor(100 + Math.random() * 900)}`,
      status: "Pending Confirmation",
      createdAt: new Date().toISOString(),
    };
    state.bookings.unshift(newBooking);
    saveDb(state);
    return { success: true, booking: newBooking };
  },
  updateBookingStatus(id: string, status: ConsultationBooking["status"], notes?: string): ConsultationBooking | null {
    const state = ensureDbFile();
    const b = state.bookings.find((item) => item.id === id);
    if (!b) return null;
    b.status = status;
    if (notes) b.adminNotes = notes;
    saveDb(state);
    return b;
  },

  // CONTACT MESSAGES
  getMessages(): ContactMessage[] {
    return ensureDbFile().messages;
  },
  createMessage(msg: Omit<ContactMessage, "id" | "createdAt" | "status">): ContactMessage {
    const state = ensureDbFile();
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      status: "Unread",
      createdAt: new Date().toISOString(),
    };
    state.messages.unshift(newMsg);
    saveDb(state);
    return newMsg;
  },

  // ANNOUNCEMENTS
  getAnnouncement() {
    return ensureDbFile().announcement;
  },
  updateAnnouncement(text: string, isActive: boolean, link?: string) {
    const state = ensureDbFile();
    state.announcement = { text, isActive, link };
    saveDb(state);
    return state.announcement;
  },
};
