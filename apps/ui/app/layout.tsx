import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-heading",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Vedify Labs",
  description: "Coming Soon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
