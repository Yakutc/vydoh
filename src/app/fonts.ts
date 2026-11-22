import { Cormorant_Garamond, Manrope } from "next/font/google";

export const display = Cormorant_Garamond({
  weight: ["300", "400"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-display-face",
  display: "swap",
});

export const displayItalic = Cormorant_Garamond({
  weight: "300",
  style: "italic",
  subsets: ["cyrillic", "latin"],
  variable: "--font-display-italic-face",
  display: "swap",
  preload: false,
});

export const body = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body-face",
  display: "swap",
});
