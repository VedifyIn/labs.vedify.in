"use client";

import { useState, useMemo } from "react";
import { iconComponents } from "@/components/icons";

interface Project {
  id: string;
  title: string;
  description: string;
  longDesc?: string;
  tech: string;
  icon: string;
  color: string;
  status: string;
  tags: string[];
  featured?: boolean;
  featuredOrder?: number;
  stats?: { label: string; value: string }[];
  links: { github?: string; demo?: string; readmore?: string };
}

interface SiteData {
  title: string;
  domain: string;
  tagline: string;
  footer?: string;
  wittyTagline?: string;
  author?: string;
  authorUrl?: string;
  mainSite?: string;
  mainSiteLabel?: string;
  links: { github?: string };
}

const catColors: Record<string, string> = {
  Agents: "var(--bento-accent-purple)",
  Eval: "var(--bento-accent-amber)",
  RAG: "var(--bento-accent-teal)",
  MCP: "var(--bento-accent-blue)",
  Embeddings: "var(--bento-accent-pink)",
  UI: "var(--bento-accent-coral)",
  Tool: "var(--bento-accent-green)",
  Rust: "var(--bento-accent-amber)",
  Infra: "var(--bento-accent-purple)",
};

const statusDots: Record<string, { bg: string; shadow: string }> = {
  live: { bg: "var(--bento-live)", shadow: "var(--bento-live-glow)" },
  "in-progress": { bg: "var(--bento-progress)", shadow: "var(--bento-progress-glow)" },
  todo: { bg: "var(--bento-todo)", shadow: "transparent" },
};

const statusLabel: Record<string, string> = {
  live: "Live",
  "in-progress": "In Progress",
  todo: "Planned",
};

export default function BentoView({ projects, site }: { projects: Project[]; site: SiteData }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set("All", projects.length);
    for (const p of projects) {
      for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter((p) => {
      if (activeTag !== "All" && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, search, activeTag]);

  const featured = useMemo(
    () =>
      filtered
        .filter((p) => p.featured)
        .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)),
    [filtered]
  );
  const live = useMemo(
    () => filtered.filter((p) => p.status === "live" && !p.featured),
    [filtered]
  );
  const inProgress = useMemo(() => filtered.filter((p) => p.status === "in-progress"), [filtered]);
  const todo = useMemo(() => filtered.filter((p) => p.status === "todo"), [filtered]);

  const mainTag = (p: Project) => p.tags[0] || "";

  return (
    <div
      style={{
        background: "var(--bento-bg)",
        color: "var(--bento-text)",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        WebkitFontSmoothing: "antialiased",
        lineHeight: 1.5,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            paddingBottom: 24,
            borderBottom: "1px solid var(--bento-border)",
          }}
        >
          <div>
            <h1 style={{ fontSize: 32, letterSpacing: "-0.04em", fontWeight: 700, margin: 0 }}>
              {site.title}
            </h1>
            <div
              style={{
                fontFamily: "'SF Mono',monospace",
                fontSize: 12,
                color: "var(--bento-muted)",
                marginTop: 4,
              }}
            >
              {site.domain}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'SF Mono',monospace",
                fontSize: 11,
                color: "var(--bento-muted)",
              }}
            >
              {projects.length} PROJECTS
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 12 }}>
              <span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: 4,
                    background: "var(--bento-live)",
                    boxShadow: "0 0 6px var(--bento-live)",
                  }}
                />
                {projects.filter((p) => p.status === "live").length} Live
              </span>
              <span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: 4,
                    background: "var(--bento-progress)",
                    boxShadow: "0 0 6px var(--bento-progress)",
                  }}
                />
                {projects.filter((p) => p.status === "in-progress").length} In Progress
              </span>
              <span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: 4,
                    background: "var(--bento-todo)",
                  }}
                />
                {projects.filter((p) => p.status === "todo").length} Planned
              </span>
            </div>
            {(site.links.github || site.mainSite) && (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 8,
                  fontSize: 12,
                  justifyContent: "flex-end",
                }}
              >
                {site.mainSite && (
                  <a
                    href={site.mainSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--bento-accent-coral)", textDecoration: "none" }}
                  >
                    {site.mainSiteLabel || site.mainSite.replace(/https?:\/\//, "")}
                  </a>
                )}
                {site.links.github && (
                  <a
                    href={site.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--bento-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Search + Filters */}
        <div style={{ marginBottom: 32 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiments..."
            style={{
              width: "100%",
              background: "var(--bento-surface)",
              border: "1px solid var(--bento-border)",
              borderRadius: 14,
              padding: "12px 16px",
              fontSize: 13.5,
              color: "var(--bento-text)",
              outline: "none",
              fontFamily: "inherit",
              marginBottom: 12,
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tagCounts.slice(0, 8).map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  fontSize: 12,
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: "1px solid var(--bento-border)",
                  background: activeTag === tag ? "var(--bento-text)" : "var(--bento-surface)",
                  color: activeTag === tag ? "var(--bento-bg)" : "var(--bento-secondary)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: activeTag === tag ? 600 : 400,
                }}
              >
                {tag} <span style={{ opacity: 0.5 }}>({count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid */}
        <div
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            gridAutoRows: "minmax(140px, auto)",
          }}
        >
          {/* Featured items */}
          {featured.map((p) => (
            <BentoItem key={p.id} project={p} span="featured" category={mainTag(p)} />
          ))}

          {/* Live items — first one tall, rest normal */}
          {live.map((p, i) => (
            <BentoItem
              key={p.id}
              project={p}
              span={i < 1 ? "tall" : "normal"}
              category={mainTag(p)}
            />
          ))}

          {/* In-progress items — first one wide */}
          {inProgress.map((p, i) => (
            <BentoItem
              key={p.id}
              project={p}
              span={i < 1 ? "wide" : "normal"}
              category={mainTag(p)}
            />
          ))}

          {/* Planned strip */}
          {todo.length > 0 && (
            <div
              className="bento-planned"
              style={{
                gridColumn: "span 4",
                background: "transparent",
                border: "1px dashed var(--bento-border)",
                borderRadius: 20,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 13,
                color: "var(--bento-muted)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'SF Mono',monospace",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--bento-text)",
                  }}
                >
                  {todo.length}
                </div>
                <div style={{ textTransform: "uppercase", fontSize: 10, letterSpacing: "0.1em" }}>
                  Planned
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flex: 1, overflowX: "auto" }}>
                {todo.map((p) => (
                  <span
                    key={p.id}
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: 12,
                      color: "var(--bento-secondary)",
                      background: "var(--bento-surface)",
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--bento-border)",
                    }}
                  >
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--bento-border)",
            textAlign: "center",
            fontFamily: "'SF Mono',monospace",
            fontSize: 11,
            color: "var(--bento-muted)",
            lineHeight: 1.8,
          }}
        >
          {site.wittyTagline && (
            <div style={{ fontStyle: "italic", marginBottom: 4 }}>{site.wittyTagline}</div>
          )}
          <div>{projects.length} PROJECTS</div>
          {site.author && (
            <div>
              by{" "}
              {site.authorUrl ? (
                <a
                  href={site.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--bento-text)",
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  {site.author}
                </a>
              ) : (
                site.author
              )}
            </div>
          )}
        </footer>
      </div>

      <style>{`
        .bento-grid > * { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .bento-grid > *:nth-child(1) { animation-delay: 0s; }
        .bento-grid > *:nth-child(2) { animation-delay: 0.05s; }
        .bento-grid > *:nth-child(3) { animation-delay: 0.1s; }
        .bento-grid > *:nth-child(4) { animation-delay: 0.15s; }
        .bento-grid > *:nth-child(5) { animation-delay: 0.2s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

function BentoItem({
  project,
  span,
  category,
}: {
  project: Project;
  span: string;
  category: string;
}) {
  const Icon = iconComponents[project.icon];
  const accentColor = catColors[category] || "var(--bento-muted)";
  const dot = statusDots[project.status] || statusDots.todo;
  const label = statusLabel[project.status] || "Planned";

  const isFeatured = span === "featured";
  const gridStyles: React.CSSProperties =
    span === "featured"
      ? { gridColumn: "span 4", gridRow: "span 2", padding: 32 }
      : span === "wide"
        ? { gridColumn: "span 2" }
        : span === "tall"
          ? { gridRow: "span 2" }
          : {};

  return (
    <a
      href={project.links.demo || project.links.github || "#"}
      target={project.links.demo ? "_blank" : undefined}
      rel={project.links.demo ? "noopener noreferrer" : undefined}
      style={{
        ...gridStyles,
        background: "var(--bento-surface)",
        border: "1px solid var(--bento-border)",
        borderRadius: 20,
        padding: 24,
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "var(--bento-border-hover)";
        e.currentTarget.style.background = "var(--bento-raised)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "var(--bento-border)";
        e.currentTarget.style.background = "var(--bento-surface)";
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: accentColor,
          opacity: 0.7,
        }}
      />

      <div
        style={{
          fontFamily: "'SF Mono',monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--bento-muted)",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            display: "inline-block",
            background: dot.bg,
            boxShadow: dot.shadow !== "transparent" ? `0 0 8px ${dot.shadow}` : "none",
            animation: dot.shadow !== "transparent" ? "bentoPulse 2s infinite" : "none",
          }}
        />
        {label}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
        {Icon && (
          <Icon
            size={isFeatured ? 22 : 18}
            style={{ color: accentColor, flexShrink: 0 }}
            aria-hidden="true"
          />
        )}
        <h3
          style={{
            fontSize: isFeatured ? 22 : 16,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
            flex: 1,
          }}
        >
          {project.title}
        </h3>
      </div>

      <div
        style={{
          fontFamily: "'SF Mono',monospace",
          fontSize: 11,
          color: "var(--bento-muted)",
          marginBottom: isFeatured ? 12 : 8,
        }}
      >
        {project.tech}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "var(--bento-secondary)",
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {isFeatured ? project.longDesc || project.description : project.description}
      </div>

      {isFeatured && project.stats && (
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid var(--bento-border)",
          }}
        >
          {project.stats.map((s) => (
            <div key={s.label} style={{ fontSize: 11, color: "var(--bento-muted)" }}>
              <strong
                style={{
                  display: "block",
                  fontFamily: "'SF Mono',monospace",
                  fontSize: 15,
                  color: "var(--bento-text)",
                  fontWeight: 600,
                }}
              >
                {s.value}
              </strong>
              {s.label.toUpperCase()}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "auto",
          paddingTop: 14,
          display: "flex",
          gap: 16,
          fontSize: 12,
          color: "var(--bento-muted)",
        }}
      >
        {project.links.demo && (
          <span
            style={{
              color: "var(--bento-accent-purple)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ↗ Try demo
          </span>
        )}
        {project.links.github && (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>View source</span>
        )}
      </div>
    </a>
  );
}
