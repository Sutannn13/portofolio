import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "40rem", // 640px
      md: "48rem", // 768px
      lg: "64rem", // 1024px
      tablet: "1025px",
      xl: "80rem", // 1280px
      "2xl": "96rem", // 1536px
    },
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        sectionDark: "#070707",
        cardDark: "#161616",
        workCardBg: "#180d08",
        workCardIcon: "#E8620F",
        portfolioLight: "#F4EFE9",
        brandOrange: "#F16B0D",
        brandOrangeDot: "#F06A0E",
        brandOrangeBtn: "#ff6b00",
        brandRed: "#E61416",
        buttonDarkText: "#111111",
      },
      fontFamily: {
        sans: ['"Host Grotesk"', '"Host Grotesk Fallback"', "sans-serif"],
        host: ["var(--font-host-grotesk)", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      fontSize: {
        "hero-desktop": ["7.5vw", { lineHeight: "1.08" }],
        "hero-tablet": ["12vw", { lineHeight: "1.08" }],
        "hero-mobile": ["15vw", { lineHeight: "1.08" }],
        "h2-desktop": ["5.5vw", { lineHeight: "1.1" }],
        "h2-tablet": ["6.5vw", { lineHeight: "1.1" }],
        "h2-mobile": ["9vw", { lineHeight: "1.1" }],
        "footer-cta-desktop": ["3.4vw", { lineHeight: "1.15" }],
        "footer-cta-tablet": ["5vw", { lineHeight: "1.15" }],
        "footer-cta-mobile": ["7.5vw", { lineHeight: "1.15" }],
      },
      borderRadius: {
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        "4xl": "2rem", // 32px
        full: "9999px",
      },
      boxShadow: {
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      blur: {
        md: "12px",
        lg: "16px",
        "2xl": "40px",
      },
      maxWidth: {
        "4xl": "56rem", // 896px
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.16, 1, 0.3, 1)",
        "stagger-text": "cubic-bezier(0.625, 0.05, 0, 1)",
        "stagger-dot": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        testimonial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;


