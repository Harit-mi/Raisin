import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  theme?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ theme = "dark", className = "", size = "md", showText = true }: LogoProps) {
  const isDark = theme === "dark"; // on dark background -> champagne gold

  const sizeStyles = {
    sm: { symbol: 38, text: "text-xl", sub: "text-[10px] tracking-[0.25em]" },
    md: { symbol: 54, text: "text-2xl sm:text-3xl", sub: "text-[11px] tracking-[0.3em]" },
    lg: { symbol: 70, text: "text-3xl sm:text-4xl", sub: "text-[13px] tracking-[0.35em]" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="DRL Resin & Decor Homepage"
    >
      {/* Authentic Handcrafted DRL Resin & Décor Seal */}
      <div
        className="relative rounded-full overflow-hidden border border-[#C9A052]/50 shadow-md bg-[#FFFDF8] flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
        style={{ width: sizeStyles.symbol, height: sizeStyles.symbol }}
      >
        <Image
          src="/images/logo.jpg"
          alt="DRL Resin & Décor Emblem"
          fill
          sizes={`${sizeStyles.symbol}px`}
          className="object-cover"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-semibold tracking-wider transition-colors leading-none ${sizeStyles.text} ${
              isDark ? "text-[#E5C77F]" : "text-[#1B1915]"
            }`}
          >
            DRL
          </span>
          <span
            className={`font-sans uppercase font-medium mt-1 leading-none ${sizeStyles.sub} ${
              isDark ? "text-[#A69A86]" : "text-[#77736B]"
            }`}
          >
            Resin & Décor
          </span>
        </div>
      )}
    </Link>
  );
}
