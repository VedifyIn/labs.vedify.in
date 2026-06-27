import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const VALID_THEMES = ["dark", "light"] as const;

function getTheme(): "dark" | "light" {
  if (process.env.DEMO_THEME && VALID_THEMES.includes(process.env.DEMO_THEME as any)) {
    return process.env.DEMO_THEME as "dark" | "light";
  }
  return "dark";
}

export const metadata: Metadata = {
  title: {
    default: "Vaidic's Labs",
    template: "%s · Vaidic's Labs",
  },
  description: "Hands-on builds across backend systems, GenAI, and trading tools",
  metadataBase: new URL("https://labs.vedify.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vaidic's Labs",
    description: "Hands-on builds across backend systems, GenAI, and trading tools",
    url: "https://labs.vedify.in",
    siteName: "Vaidic's Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@vaidic",
    title: "Vaidic's Labs",
    description: "Hands-on builds across backend systems, GenAI, and trading tools",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  other: {
    "theme-color": "#0a0a0f",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = getTheme();
  return (
    <html lang="en" data-theme={theme} className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <ErrorBoundary>{children}</ErrorBoundary>
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration.scope);
      })
      .catch(error => {
        console.error('SW registration failed:', error);
      });
  });
}
            `,
          }}
        />
      </body>
    </html>
  );
}
