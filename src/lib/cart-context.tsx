"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem, CustomOptionSelection } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, customization?: CustomOptionSelection) => void;
  removeItem: (productId: string, customization?: CustomOptionSelection) => void;
  updateQuantity: (productId: string, quantity: number, customization?: CustomOptionSelection) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
  wishlistCount: number;
  cartSubtotal: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function matchCustomization(a?: CustomOptionSelection, b?: CustomOptionSelection): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    a.size === b.size &&
    a.color === b.color &&
    a.personalizationText === b.personalizationText &&
    a.giftWrapping === b.giftWrapping
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("drl_cart");
      if (savedCart) setItems(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("drl_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCoupon = localStorage.getItem("drl_coupon");
      if (savedCoupon) setCouponCode(savedCoupon);
    } catch (e) {
      console.error("Failed to load local state", e);
    }
    setIsHydrated(true);
  }, []);

  // Save changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("drl_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("drl_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [wishlist, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("drl_coupon", couponCode);
    } catch (e) {
      console.error("Failed to save coupon", e);
    }
  }, [couponCode, isHydrated]);

  const addItem = (product: Product, quantity = 1, customization?: CustomOptionSelection) => {
    let unitPrice = product.price;
    if (customization?.size && product.availableSizes) {
      const sizeVariant = product.availableSizes.find(
        (s) => s.name.toLowerCase() === customization.size?.toLowerCase()
      );
      if (sizeVariant) unitPrice += sizeVariant.extraPrice;
    }
    if (customization?.giftWrapping) {
      unitPrice += 150;
    }

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && matchCustomization(item.customization, customization)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
          customization,
          unitPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeItem = (productId: string, customization?: CustomOptionSelection) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && matchCustomization(item.customization, customization)))
    );
  };

  const updateQuantity = (productId: string, quantity: number, customization?: CustomOptionSelection) => {
    if (quantity <= 0) {
      removeItem(productId, customization);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && matchCustomization(item.customization, customization)) {
          return { ...item, quantity: Math.min(20, quantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartSubtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        itemCount,
        wishlistCount,
        cartSubtotal,
        couponCode,
        setCouponCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
