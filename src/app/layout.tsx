import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "DRL Resin & Decor | Handcrafted Luxury Resin Art & Home Accents",
  description:
    "Art That Makes Space Feel Special. Explore handcrafted resin tables, statement wall art, clocks, coasters, and bespoke luxury interior decor.",
  keywords: [
    "resin art",
    "resin furniture",
    "epoxy river table",
    "luxury home decor",
    "DRL Resin & Decor",
    "handcrafted resin clocks",
    "resin coasters",
    "customized gifts India",
  ],
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "DRL Resin & Decor | Handcrafted Luxury Resin Art",
    description:
      "Handcrafted resin art, elegant home décor, and custom creations designed to bring beauty and individuality into your space.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo.jpg", width: 800, height: 800, alt: "DRL Resin & Décor" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0B0A] text-[#E2E8F0]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
