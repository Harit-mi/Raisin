import { db } from "./db";
import { CartItem, OrderItem } from "@/types";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "./constants";

export { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE };

export interface CalculationResult {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  freeShippingQualified: boolean;
  amountNeededForFreeShipping: number;
  errors: string[];
}

export function calculateOrderTotals(
  incomingItems: {
    productId: string;
    quantity: number;
    customization?: CartItem["customization"];
  }[],
  couponCode?: string
): CalculationResult {
  const errors: string[] = [];
  let subtotal = 0;
  const verifiedItems: OrderItem[] = [];

  for (const item of incomingItems) {
    const product = db.getProductById(item.productId);
    if (!product) {
      errors.push(`Product with ID "${item.productId}" was not found.`);
      continue;
    }

    let unitPrice = product.price;

    // Add extra price if size variant is selected and valid
    if (item.customization?.size && product.availableSizes) {
      const sizeVariant = product.availableSizes.find(
        (s) => s.name.toLowerCase() === item.customization?.size?.toLowerCase()
      );
      if (sizeVariant) {
        unitPrice += sizeVariant.extraPrice;
      }
    }

    // Add gift wrapping if requested
    if (item.customization?.giftWrapping) {
      unitPrice += 150; // ₹150 for luxury gift wrapping
    }

    const quantity = Math.max(1, Math.min(item.quantity, 20));
    const itemTotal = unitPrice * quantity;
    subtotal += itemTotal;

    verifiedItems.push({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      quantity,
      unitPrice,
      totalPrice: itemTotal,
      customization: item.customization,
    });
  }

  // Calculate Discount
  let discount = 0;
  let verifiedCouponCode: string | undefined = undefined;

  if (couponCode && couponCode.trim()) {
    const validation = db.validateCoupon(couponCode, subtotal);
    if (validation.valid && validation.coupon) {
      verifiedCouponCode = validation.coupon.code;
      if (validation.coupon.discountPercentage > 0) {
        discount = Math.round((subtotal * validation.coupon.discountPercentage) / 100);
        if (validation.coupon.maxDiscount && discount > validation.coupon.maxDiscount) {
          discount = validation.coupon.maxDiscount;
        }
      }
    } else if (validation.error) {
      errors.push(validation.error);
    }
  }

  // Calculate Shipping
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const freeShippingQualified = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || verifiedCouponCode === "FREESHIP";
  const shippingFee = freeShippingQualified || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);

  // Tax is inclusive for luxury items under Indian GST representation, display 0 extra tax
  const tax = 0;
  const total = Math.max(0, discountedSubtotal + shippingFee + tax);

  return {
    items: verifiedItems,
    subtotal,
    discount,
    couponCode: verifiedCouponCode,
    shippingFee,
    tax,
    total,
    freeShippingQualified,
    amountNeededForFreeShipping,
    errors,
  };
}
