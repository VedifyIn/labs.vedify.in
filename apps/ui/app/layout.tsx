import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
