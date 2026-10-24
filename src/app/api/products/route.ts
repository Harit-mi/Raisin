import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const products = db.getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, category, price, description, images, dimensions, finish } = body;

    if (!name || !category || !price) {
      return NextResponse.json({ error: "Product name, category, and price are required." }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newProd = db.addProduct({
      name,
      slug: `${slug}-${Date.now().toString(36).slice(-4)}`,
      category,
      tagline: body.tagline || "Handcrafted bespoke resin decor",
      description: description || "Artisan handcrafted creation.",
      price: Number(price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      images: Array.isArray(images) && images.length ? images : [
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
      ],
      sku: body.sku || `DRL-NEW-${Math.floor(100 + Math.random() * 900)}`,
      inventoryCount: body.inventoryCount !== undefined ? Number(body.inventoryCount) : 5,
      inStock: true,
      isReadyToShip: body.isReadyToShip ?? true,
      isMadeToOrder: body.isMadeToOrder ?? false,
      isCustomizable: body.isCustomizable ?? true,
      isFeatured: body.isFeatured ?? false,
      dimensions: dimensions || "Custom Dimensions",
      weight: body.weight || "1.5 kg",
      materials: body.materials || ["High-grade epoxy resin"],
      finish: finish || "High-gloss glass resin",
      productionLeadTime: body.productionLeadTime || "Ready to ship in 2-3 business days",
      shippingInfo: body.shippingInfo || "Shipped in protective transit boxing with insurance.",
      careInstructions: body.careInstructions || ["Clean gently with damp cloth."],
      rating: 5.0,
      reviewCount: 1,
    });

    return NextResponse.json({ success: true, product: newProd });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to add product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
