"use client";

import { useState, useEffect } from "react";
import PolishedView from "@/components/views/polished";
import TerminalView from "@/components/views/terminal";
import BentoView from "@/components/views/bento";
import LabBackground from "@/components/LabBackground";
import SiteHeader from "@/components/SiteHeader";
import FooterNote from "@/components/FooterNote";
import type { Project, SiteData } from "@/types";

export default function ClientPage({
  projects,
  site: rawSite,
}: {
  projects: Project[];
  site: SiteData;
}) {
  const view = rawSite.view || "polished";
  const theme = rawSite.theme || "dark";

  const taglines = Array.isArray(rawSite.wittyTagline) ? rawSite.wittyTagline : [];
  const [wittyIndex, setWittyIndex] = useState(0);

  useEffect(() => {
    if (taglines.length < 2) return;
    const interval = setInterval(() => {
      setWittyIndex((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [taglines]);

  const site = {
    ...rawSite,
    wittyTagline: taglines.length > 0 ? taglines[wittyIndex] : undefined,
  };

  if (projects.length === 0) {
    return (
      <div data-theme={theme} className="relative min-h-screen">
        <LabBackground />
        <div className="relative z-10 max-w-[800px] mx-auto px-4 py-10">
          <SiteHeader data={site} />
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1
              className="m-0 font-bold tracking-[-0.03em] text-center"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontFamily: "var(--font-heading, var(--font-sans)), monospace",
                background: "linear-gradient(135deg, #a78bfa, #f472b6, #2dd4bf, #a78bfa)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s ease-in-out infinite",
                textShadow: "0 0 80px rgba(168, 85, 247, 0.15)",
              }}
            >
              Coming Soon
            </h1>
            <p
              className="mt-6 text-text-secondary tracking-[0.3em] uppercase text-center"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
                animation: "fadeIn 2s ease-out 0.5s both",
              }}
            >
              {rawSite.domain}
            </p>
          </div>
          <FooterNote
            text={rawSite.footer || "Stay tuned for upcoming projects"}
            wittyTagline={site.wittyTagline}
            author={site.author}
            authorUrl={site.authorUrl}
          />
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case "terminal":
        return <TerminalView projects={projects} site={site} />;
      case "bento":
        return <BentoView projects={projects} site={site} />;
      default:
        return <PolishedView projects={projects} site={site} />;
    }
  };

  return <div data-theme={theme}>{renderView()}</div>;
}
