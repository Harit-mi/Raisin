export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  mainCollectionSlug?: string;
  subcategorySlug?: string;
  productCategorySlug?: string;
  tagline: string;
  description: string;
  price: number; // in INR
  compareAtPrice?: number;
  images: string[];
  sku: string;
  inventoryCount: number;
  inStock: boolean;
  isReadyToShip: boolean;
  isMadeToOrder: boolean;
  isCustomizable: boolean;
  isFeatured: boolean;
  dimensions: string;
  weight: string;
  materials: string[];
  finish: string;
  productionLeadTime: string;
  shippingInfo: string;
  careInstructions: string[];
  availableSizes?: { name: string; extraPrice: number }[];
  availableColors?: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CustomOptionSelection {
  size?: string;
  color?: string;
  personalizationText?: string;
  giftWrapping?: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  customization?: CustomOptionSelection;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minimumOrder: number;
  maxDiscount?: number;
  description: string;
  isActive: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customization?: CustomOptionSelection;
}

export type OrderStatus =
  | "Order Placed"
  | "Payment Confirmed"
  | "In Production"
  | "Ready to Ship"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export interface Order {
  id: string; // e.g., DRL-2026-XXXX
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    giftNote?: string;
    deliveryInstructions?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: "Razorpay" | "UPI" | "Credit/Debit Card" | "Net Banking" | "Cash on Delivery";
  paymentStatus: "Pending" | "Paid" | "Failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: OrderStatus;
  estimatedDelivery: string;
  trackingNumber?: string;
  trackingCarrier?: string;
  notes?: string;
  createdAt: string;
}

export interface CustomStudioRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  productType: string;
  preferredSize: string;
  shape: string;
  primaryColor: string;
  secondaryColor: string;
  metallicAccents: string;
  designStyle: string;
  personalizationText?: string;
  occasion: string;
  quantity: number;
  budgetRange: string;
  requiredDeliveryDate: string;
  inspirationImageUrl?: string;
  additionalInstructions?: string;
  estimatedPrice: number;
  status: "Under Review" | "Quotation Sent" | "Approved" | "In Production" | "Completed" | "Declined";
  adminQuotePrice?: number;
  adminNotes?: string;
  createdAt: string;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  preferredTimeSlot: string;
  budgetRange: string;
  projectDescription: string;
  referenceImageUrl?: string;
  preferredContactMethod: "Video Call (Google Meet)" | "WhatsApp Call" | "Phone Call" | "Studio Visit";
  status: "Pending Confirmation" | "Confirmed" | "Rescheduled" | "Completed" | "Cancelled";
  adminNotes?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "Unread" | "Replied" | "Archived";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tier?: "Signature Collections" | "Hand-Poured Masterpieces" | "Gift Articles";
  description: string;
  image: string;
  itemCount: number;
}
