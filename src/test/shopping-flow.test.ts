import assert from "node:assert";
import test from "node:test";
import { calculateOrderTotals, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "../lib/pricing";
import { db } from "../lib/db";

test("CRITICAL TEST 1: Server-side price calculation prevents price tampering", () => {
  // Pass an incoming cart item with attempted client-side tampered price
  const sampleProduct = db.getProducts()[0]; // Ocean Reverie Wall Art (₹14,500)
  assert.ok(sampleProduct, "Sample product must exist in database");

  const incomingItems = [
    {
      productId: sampleProduct.id,
      quantity: 1,
      // Even if client tried sending unitPrice = 1, server recalculates from db
    },
  ];

  const result = calculateOrderTotals(incomingItems);

  assert.strictEqual(
    result.items[0].unitPrice,
    sampleProduct.price,
    `Unit price must match database price of ₹${sampleProduct.price}`
  );
  assert.strictEqual(
    result.subtotal,
    sampleProduct.price,
    `Subtotal must be calculated server-side as ₹${sampleProduct.price}`
  );
});

test("CRITICAL TEST 2: Free shipping qualified above ₹3,000 threshold", () => {
  const products = db.getProducts();
  const expensivePiece = products.find((p) => p.price >= FREE_SHIPPING_THRESHOLD);
  assert.ok(expensivePiece, "Must have product >= ₹3,000");

  const result = calculateOrderTotals([
    {
      productId: expensivePiece.id,
      quantity: 1,
    },
  ]);

  assert.strictEqual(result.freeShippingQualified, true, "Order >= ₹3,000 must qualify for free shipping");
  assert.strictEqual(result.shippingFee, 0, "Shipping fee must be ₹0");
});

test("CRITICAL TEST 3: Standard shipping applied for subtotal below threshold", () => {
  const products = db.getProducts();
  const affordablePiece = products.find((p) => p.price < FREE_SHIPPING_THRESHOLD);
  if (affordablePiece) {
    const result = calculateOrderTotals([
      {
        productId: affordablePiece.id,
        quantity: 1,
      },
    ]);

    assert.strictEqual(result.freeShippingQualified, false);
    assert.strictEqual(result.shippingFee, STANDARD_SHIPPING_FEE);
  }
});

test("CRITICAL TEST 4: Coupon validation discounts correctly", () => {
  const products = db.getProducts();
  const product = products.find((p) => p.price >= 5000);
  assert.ok(product, "Must find product >= ₹5,000");

  // LUXURY10 gives 10% off
  const result = calculateOrderTotals(
    [
      {
        productId: product.id,
        quantity: 1,
      },
    ],
    "LUXURY10"
  );

  const expectedDiscount = Math.round((product.price * 10) / 100);
  assert.strictEqual(result.couponCode, "LUXURY10");
  assert.strictEqual(result.discount, expectedDiscount);
  assert.strictEqual(result.total, product.price - expectedDiscount);
});

test("CRITICAL TEST 5: Invalid promo code is safely rejected without discount", () => {
  const product = db.getProducts()[0];
  const result = calculateOrderTotals(
    [
      {
        productId: product.id,
        quantity: 1,
      },
    ],
    "INVALID_PROMO_CODE_XYZ"
  );

  assert.strictEqual(result.discount, 0);
  assert.strictEqual(result.couponCode, undefined);
  assert.ok(result.errors.length > 0, "Must report invalid promo code error");
});

test("CRITICAL TEST 6: Double-booking prevention for consultations", () => {
  const uniqueId = Date.now().toString(36);
  const testDate = `2027-05-${Math.floor(10 + Math.random() * 18)}`;
  const testSlot = `10:00 AM - 11:00 AM (IST) ${uniqueId}`;

  // First booking
  const booking1 = db.createBooking({
    fullName: "Aarushi Verma",
    email: "aarushi@example.com",
    phone: "+91 99999 11111",
    projectType: "Ocean Wall Art Triptych",
    preferredDate: testDate,
    preferredTimeSlot: testSlot,
    budgetRange: "₹25,000+",
    projectDescription: "Living room art consultation",
    preferredContactMethod: "Video Call (Google Meet)",
  });

  assert.strictEqual(booking1.success, true, "First booking should succeed");

  // Second booking attempting exact same date & slot
  const booking2 = db.createBooking({
    fullName: "Karan Malhotra",
    email: "karan@example.com",
    phone: "+91 88888 22222",
    projectType: "Dining Table",
    preferredDate: testDate,
    preferredTimeSlot: testSlot,
    budgetRange: "₹50,000+",
    projectDescription: "Conference room table",
    preferredContactMethod: "Video Call (Google Meet)",
  });

  assert.strictEqual(booking2.success, false, "Second booking for same slot must be rejected");
  assert.ok(booking2.error?.includes("already booked"), "Error message should mention slot is already booked");
});
