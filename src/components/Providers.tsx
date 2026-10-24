"use client";

import React, { Suspense } from "react";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FFFDF8]">
        <Suspense fallback={<div className="h-20 bg-[#1B1915]" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      </div>
    </CartProvider>
  );
}
