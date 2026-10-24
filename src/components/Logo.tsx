import Link from "next/link";

interface LogoProps {
  theme?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ theme = "dark", className = "", size = "md" }: LogoProps) {
  const isDark = theme === "dark"; // on dark background -> champagne gold

  const sizeStyles = {
    sm: { symbol: 28, text: "text-lg", sub: "text-[9px] tracking-[0.25em]" },
    md: { symbol: 36, text: "text-2xl", sub: "text-[10px] tracking-[0.3em]" },
    lg: { symbol: 48, text: "text-3xl", sub: "text-[12px] tracking-[0.35em]" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="DRL Resin & Decor Homepage"
    >
      {/* Handcrafted Resin Drop & Botanical Emblem */}
      <svg
        width={sizeStyles.symbol}
        height={sizeStyles.symbol}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C77F" />
            <stop offset="50%" stopColor="#C9A052" />
            <stop offset="100%" stopColor="#9C7730" />
          </linearGradient>
          <linearGradient id="darkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A052" />
            <stop offset="100%" stopColor="#1B1915" />
          </linearGradient>
        </defs>

        {/* Outer Fine Luxury Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeDasharray="1 3"
          className="opacity-70"
        />

        {/* Dynamic Resin Teardrop & Fluid Wave */}
        <path
          d="M50 12 C50 12, 22 42, 22 62 C22 77.464 34.536 88 50 88 C65.464 88 78 77.464 78 62 C78 42, 50 12, 50 12 Z"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Interior Swirling Fluid Shoreline Layer */}
        <path
          d="M26 64 C35 72, 42 54, 52 65 C62 76, 70 66, 75 60 C73 75, 63 84, 50 84 C38 84, 28 76, 26 64 Z"
          fill="url(#goldGradient)"
          fillOpacity="0.25"
        />

        {/* Center Diamond / Star Sparkle */}
        <path
          d="M50 36 L52.5 45 L61.5 47.5 L52.5 50 L50 59 L47.5 50 L38.5 47.5 L47.5 45 Z"
          fill="url(#goldGradient)"
        />
      </svg>

      {/* Brand Monogram & Subtitle */}
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
    </Link>
  );
}
