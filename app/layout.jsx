import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata = {
  title: "ListQik · by Resolution Realty Group",
  description:
    "ListQik by Resolution Realty Group – Know your home value, list faster, and sell smarter with our AI-powered real estate marketplace."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfairDisplay.variable}`}>{children}</body>
    </html>
  );
}
