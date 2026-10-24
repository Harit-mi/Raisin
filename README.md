# DRL Resin & Decor — Luxury E-Commerce Platform

A complete, premium, production-oriented e-commerce website for **DRL Resin & Decor**, a handcrafted luxury resin art, bespoke furniture, and home décor atelier.

---

## 💎 Brand Identity & Visual Design

- **Deep Charcoal Black (`#121210`)** & **Rich Black (`#1B1915`)**: Editorial contrast, hero overlays, and luxury footer.
- **Champagne Gold (`#C9A052`)** & **Light Gold (`#E5C77F`)**: Emblems, active highlights, buttons, and gilded foil accents.
- **Warm Ivory (`#FFFDF8`)** & **Cream (`#F4EFE5`)**: Tactile paper-like background and product presentation surfaces.
- **Taupe (`#A69A86`)** & **Soft Gray (`#77736B`)**: Secondary typography and technical specifications.
- **Typography**: Editorial serif headings (*Playfair Display*, *Cormorant Garamond*) paired with clean sans-serif UI typography (*Plus Jakarta Sans*, *Inter*).
- **Emblem**: Custom SVG monogram uniting an organic resin teardrop and floral starburst.

---

## 🏛️ Website Architecture & Implemented Routes (All 20 Pages)

| Page / Section | Route | Description |
|---|---|---|
| **1. Home / Intro** | `/` | Hero with ocean resin table lifestyle visual, 4 trust pillars, signature collections, bestselling products grid, brand story, custom studio teaser, verified patron reviews, and consultation CTA. |
| **2. Shop All Products** | `/shop` | Filterable catalog by category, price slider (up to ₹50,000), ready-to-ship vs made-to-order, search input, and sorting (Featured, Price Low-High, Price High-Low, Newest). |
| **3. Product Details** | `/product/[slug]` | Multi-image gallery, dynamic size & color variant selector, custom laser-engraving input, gift wrapping toggle (+₹150), live price estimation, care guide, transit packaging, and verified patron reviews. |
| **4. Product Categories** | `/category/[slug]` | Dynamic collection view for Wall Art, Tables, Clocks, Coasters, Trays, Bowls, and Keepsakes. |
| **5. Custom Studio** | `/custom-studio` | 3-step interactive custom commission studio: shape, dimensions, primary resin hues, metallic leaf inlays, personalization, budget range, and real-time cost estimation. |
| **6. Custom Order Booking** | `/book-consultation` | 1-on-1 design consultation scheduler with live slot picker, timezone notice (IST), and double-booking prevention. |
| **7. Shopping Cart** | `/cart` + Slide-in Drawer | Cart item list with thumbnail, custom options summary, quantity stepper, promo code discounts (`LUXURY10`, `FREESHIP`), and free shipping progress meter. |
| **8. Checkout** | `/checkout` | 256-bit encrypted checkout collecting full shipping address, gift note, delivery instructions, Razorpay gateway integration, and Cash on Delivery. |
| **9. Payment Confirmation** | `/order-confirmation/[orderId]` | Order dossier with generated ID, items manifest, payment breakdown, estimated dispatch, and printable invoice. |
| **10. About the Brand** | `/about` | Atelier origins, the alchemy of timber and liquid glass, non-toxic food-safe epoxies, and 4 craftsmanship commitments. |
| **11. Contact Us** | `/contact` | Form connected to backend, studio coordinates (Bengaluru & Hyderabad), direct phone, WhatsApp concierge, and atelier hours. |
| **12. Customer Account** | `/account` | Patron profile with tabs for order history, custom studio requests, consultation bookings, and saved shipping addresses. |
| **13. Wishlist** | `/wishlist` | Saved pieces with instant add-to-bag and remove actions. |
| **14. FAQ** | `/faq` | Categorized accordions covering resin care, heat resistance, cleaning instructions, custom commissions, and white-glove courier crating. |
| **15. Shipping Policy** | `/policies/shipping` | White-glove transit details, Blue Dart/Delhivery courier partners, 5-tier packaging protocol, and 100% transit insurance. |
| **16. Returns Policy** | `/policies/returns` | Made-to-order vs ready-to-ship return rules and transit damage replacement protocol. |
| **17. Privacy Policy** | `/policies/privacy` | Patron confidentiality, PCI-DSS payment protection, and data rights. |
| **18. Terms & Conditions** | `/policies/terms` | Sales conditions, handcrafted disclaimer, and intellectual property. |
| **19. Order Tracking** | `/track-order` | Live status stepper: Order Placed → Payment Confirmed → In Production → Ready to Ship → Shipped → Delivered. |
| **20. Admin Dashboard** | `/admin` | Protected by Master PIN (`1234`). Metrics overview (gross revenue, pending orders, custom requests, consultations, low stock warnings), product management (add, edit, stock, delete), order status updater, and custom quotation dispatcher. |

---

## 🔒 Security & Server-Side Price Integrity

1. **Zero Client-Side Price Tampering**: Cart prices are never trusted from the browser. `/api/cart/validate` and `/api/orders` re-verify every item ID, base price, size addon, gift wrapping fee, and promotional code against the server database.
2. **Promotional Discounts**: Verified server-side.
   - `LUXURY10`: 10% off orders above ₹2,000 (capped at ₹2,500).
   - `DRLFIRST`: 15% off first purchase above ₹3,500.
   - `FREESHIP`: Complimentary insured courier across India.
3. **Double-Booking Prevention**: The consultation engine strictly rejects conflicting appointments for the same date and time slot.
4. **Razorpay Server HMAC Verification**: Server-side HMAC SHA256 signature verification protects against forged callbacks. If Razorpay keys are not yet provided in `.env.local`, the site operates in safe **Sandbox Test Mode** without throwing gateway exceptions.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.0 or newer (tested on v22.19.0)
- **npm**: v9.0 or newer

### 2. Installation
```bash
cd /Users/haritmishra/.gemini/antigravity/scratch/drl-resin-decor
npm install
```

### 3. Run Automated Tests
Execute the automated test suite verifying server-side price protection, coupons, free shipping, and double-booking checks:
```bash
npm test
```

### 4. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔑 Administrative Access

- URL: **[http://localhost:3000/admin](http://localhost:3000/admin)**
- Master Demo PIN: `1234` (configurable via `ADMIN_MASTER_PIN` in `.env.local`)

---

## 💳 Payment Gateway Setup (Razorpay)

1. Sign up or log into your [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Generate API Keys under **Settings → API Keys**.
3. Create `.env.local` in the project root:
   ```env
   RAZORPAY_KEY_ID="rzp_test_YourKeyIdHere"
   RAZORPAY_KEY_SECRET="YourSecretKeyHere"
   ```
4. Restart the server. The application will immediately switch from Sandbox Simulation to live Razorpay checkout.

---

## 📋 Checklist Before Real Production Launch

- [ ] Add production Razorpay Live Key ID and Secret in hosting environment variables (e.g. Vercel / AWS).
- [ ] Update legal business registration name and GSTIN on tax invoices in `src/app/order-confirmation/[orderId]/page.tsx`.
- [ ] Connect transactional email provider (SendGrid, Resend, or AWS SES) in `/api/orders` and `/api/contact` if email automation is desired.
- [ ] Change the Master Admin PIN in `.env.local`.
