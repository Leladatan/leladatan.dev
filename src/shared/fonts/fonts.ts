import localFont from "next/font/local";

export const geistLatin = localFont({
  src: "./geist-latin.woff2",
  variable: "--font-geist-latin",
  display: "swap",
  weight: "100 900",
});

export const geistCyrillic = localFont({
  src: "./geist-cyrillic.woff2",
  variable: "--font-geist-cyr",
  display: "swap",
  weight: "100 900",
});

export const syne = localFont({
  src: "./syne-latin.woff2",
  variable: "--font-syne",
  display: "swap",
  weight: "400 800",
});

export const fontVariables = `${geistLatin.variable} ${geistCyrillic.variable} ${syne.variable}`;
