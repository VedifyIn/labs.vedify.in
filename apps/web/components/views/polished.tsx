"use client";

import { useState, useMemo } from "react";
import LabBackground from "@/components/LabBackground";
import SiteHeader from "@/components/SiteHeader";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ProjectGrid from "@/components/ProjectGrid";
import FeaturedSlider from "@/components/FeaturedSlider";
import SectionLabel from "@/components/SectionLabel";
import PlannedAccordion from "@/components/PlannedAccordion";
import FooterNote from "@/components/FooterNote";
import type { Project, SiteData } from "@/types";

export default function PolishedView({ projects, site }: { projects: Project[]; site: SiteData }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set("All", projects.length);
    for (const p of projects) {
      for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const { featured, live, inProgress, todo } = useMemo(() => {
    const q = search.toLowerCase().trim();
    const filtered = projects.filter((p) => {
      if (activeTag !== "All" && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    return {
      featured: filtered
        .filter((p) => p.featured)
        .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)),
      live: filtered.filter((p) => p.status === "live" && !p.featured),
      inProgress: filtered.filter((p) => p.status === "in-progress"),
      todo: filtered.filter((p) => p.status === "todo"),
    };
  }, [projects, search, activeTag]);

  return (
    <main
      id="main-content"
      className="relative min-h-screen"
      style={{ animation: "flicker 8s steps(3) infinite" }}
    >
      <LabBackground />

      <div className="relative z-10 max-w-[800px] mx-auto px-4 py-10">
        <SiteHeader data={site} />
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter tags={tagCounts} active={activeTag} onSelect={setActiveTag} />

        {featured.length > 0 && (
          <>
            <SectionLabel label="Featured" />
            <FeaturedSlider items={featured} />
          </>
        )}

        {live.length > 0 && (
          <>
            <SectionLabel label="Live" />
            <ProjectGrid projects={live} />
          </>
        )}

        {inProgress.length > 0 && (
          <>
            <SectionLabel label="In progress" />
            <ProjectGrid projects={inProgress} />
          </>
        )}

        {todo.length > 0 && (
          <>
            <SectionLabel label="Planned" />
            <PlannedAccordion items={todo} />
          </>
        )}

        <FooterNote
          text={site.footer || `${projects.length} projects`}
          wittyTagline={site.wittyTagline}
          author={site.author}
          authorUrl={site.authorUrl}
        />
      </div>
    </main>
  );
}
