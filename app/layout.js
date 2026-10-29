import { Plus_Jakarta_Sans, Work_Sans, Inter, Fraunces, Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const work = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["600"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = {
  title: "Tiffexx – Food Delivery & Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${work.variable} ${inter.variable} ${fraunces.variable} ${figtree.variable}`}>
      <body>
        
        {children}
      </body>
    </html>
  );
}
