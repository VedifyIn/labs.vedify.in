"use client";

import { useState, useMemo } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  icon: string;
  color: string;
  status: string;
  tags: string[];
  featured?: boolean;
  featuredOrder?: number;
  stats?: { label: string; value: string }[];
  longDesc?: string;
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

export default function TerminalView({ projects, site }: { projects: Project[]; site: SiteData }) {
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

  return (
    <div
      style={{
        background: "var(--tv-bg)",
        color: "var(--tv-text)",
        fontFamily: "'SF Mono','Cascadia Code','Courier New',monospace",
        fontSize: 13,
        lineHeight: 1.6,
        minHeight: "100vh",
        padding: "40px 20px",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* CRT overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 999,
          background:
            "linear-gradient(rgba(18,16,16,0) 50%, var(--tv-crt-scan) 50%), linear-gradient(90deg, rgba(255,0,0,0.03), rgba(0,255,0,0.01), rgba(0,0,255,0.03))",
          backgroundSize: "100% 2px, 3px 100%",
        }}
      />

      <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Terminal header */}
        <div
          style={{
            border: "2px solid var(--tv-border-bright)",
            padding: 20,
            marginBottom: 32,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -10,
              left: 16,
              background: "var(--tv-bg)",
              padding: "0 8px",
              color: "var(--tv-dim)",
              fontSize: 11,
            }}
          >
            ┌─ {site.domain} ─┐
          </div>
          <div style={{ fontSize: 24, fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 8 }}>
            <span style={{ color: "var(--tv-green)" }}>$ </span>
            {site.title.toLowerCase().replace(/\s/g, "_")}
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 16,
                background: "var(--tv-green)",
                animation: "blink 1s step-end infinite",
                verticalAlign: "middle",
                marginLeft: 4,
              }}
            />
          </div>
          <div style={{ color: "var(--tv-secondary)", fontSize: 13 }}>{site.tagline}</div>
        </div>

        {/* Links */}
        {(site.links.github || site.mainSite) && (
          <div style={{ marginBottom: 18, display: "flex", gap: 16, alignItems: "center" }}>
            {site.mainSite && (
              <a
                href={site.mainSite}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--tv-amber)",
                  fontSize: 12,
                  textDecoration: "underline",
                  textUnderlineOffset: 2,
                }}
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
                  color: "var(--tv-secondary)",
                  fontSize: 12,
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
                {site.links.github.split("/").pop()}
              </a>
            )}
          </div>
        )}

        {/* Search */}
        <div style={{ marginBottom: 18 }}>
          <span style={{ color: "var(--tv-dim)", fontSize: 12 }}>{"> "}</span>
          <span style={{ color: "var(--tv-amber)" }}>grep</span>
          <span style={{ color: "var(--tv-secondary)" }}> -i "</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--tv-text)",
              fontFamily: "inherit",
              fontSize: 13,
              outline: "none",
              width: 200,
              borderBottom: "1px dashed var(--tv-border-bright)",
            }}
            placeholder="search experiments..."
          />
          <span style={{ color: "var(--tv-secondary)" }}>"</span>
        </div>

        {/* Tag filter */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
          <span style={{ color: "var(--tv-dim)", fontSize: 12, marginRight: 8 }}>
            $ tags --list
          </span>
          {tagCounts.slice(0, 6).map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                background: "transparent",
                border:
                  activeTag === tag ? "1px solid var(--tv-green)" : "1px solid var(--tv-border)",
                color: activeTag === tag ? "var(--tv-green)" : "var(--tv-secondary)",
                cursor: "pointer",
                padding: "3px 10px",
                fontSize: 12,
                fontFamily: "inherit",
                borderRadius: 0,
              }}
            >
              {tag}
              <span style={{ opacity: 0.5 }}> ({count})</span>
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <div style={{ color: "var(--tv-dim)", fontSize: 12, marginBottom: 12 }}>
              <span style={{ color: "var(--tv-amber)" }}>&gt; </span>ls -la /featured
            </div>
            <div style={{ border: "1px solid var(--tv-border)" }}>
              {featured.map((p) => (
                <a
                  key={p.id}
                  href={p.links.demo || p.links.github || "#"}
                  target={p.links.demo ? "_blank" : undefined}
                  rel={p.links.demo ? "noopener noreferrer" : undefined}
                  style={{
                    display: "block",
                    padding: 20,
                    textDecoration: "none",
                    color: "inherit",
                    background: "var(--tv-surface)",
                    borderBottom: "1px solid var(--tv-border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        background: "var(--tv-green)",
                        boxShadow: "0 0 6px var(--tv-green)",
                      }}
                    />
                    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--tv-text)" }}>
                      {p.title}
                    </span>
                    <span style={{ color: "var(--tv-cyan)", fontSize: 11 }}>
                      {p.tech} · <span style={{ color: "var(--tv-green)" }}>LIVE</span>
                    </span>
                  </div>
                  <div style={{ color: "var(--tv-secondary)", lineHeight: 1.5 }}>
                    {p.longDesc || p.description}
                  </div>
                  {p.stats && (
                    <div
                      style={{
                        display: "flex",
                        gap: 24,
                        marginTop: 12,
                        fontSize: 12,
                        color: "var(--tv-secondary)",
                      }}
                    >
                      {p.stats.map((s) => (
                        <span key={s.label}>
                          <strong style={{ color: "var(--tv-text)" }}>{s.value}</strong> {s.label}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </>
        )}

        {/* Section header */}
        <div
          style={{
            marginTop: 32,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "var(--tv-dim)" }}>//</span>
          <span style={{ color: "var(--tv-amber)", fontSize: 12 }}>LIVE</span>
          <span style={{ color: "var(--tv-dim)", fontSize: 11 }}>
            ({live.length + featured.length} projects)
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "var(--tv-border)",
              borderBottom: "1px dashed var(--tv-border-bright)",
            }}
          />
        </div>

        {/* Table header */}
        <div style={{ border: "1px solid var(--tv-border)", marginBottom: 32 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "20px 140px 100px 1fr 80px",
              gap: 12,
              padding: "10px 16px",
              borderBottom: "1px solid var(--tv-border)",
              color: "var(--tv-dim)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              background: "var(--tv-surface)",
            }}
          >
            <div />
            <div>NAME</div>
            <div>STACK</div>
            <div>DESCRIPTION</div>
            <div />
          </div>

          {[...featured, ...live, ...inProgress].map((p) => (
            <a
              key={p.id}
              href={p.links.demo || p.links.github || "#"}
              target={p.links.demo ? "_blank" : undefined}
              rel={p.links.demo ? "noopener noreferrer" : undefined}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 140px 100px 1fr 80px",
                gap: 12,
                padding: "10px 16px",
                borderBottom: "1px solid var(--tv-border)",
                textDecoration: "none",
                color: "inherit",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--tv-surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 1,
                  background:
                    p.status === "live"
                      ? "var(--tv-green)"
                      : p.status === "in-progress"
                        ? "var(--tv-amber)"
                        : "var(--tv-dim)",
                  boxShadow:
                    p.status === "live"
                      ? "0 0 6px var(--tv-green)"
                      : p.status === "in-progress"
                        ? "0 0 6px var(--tv-amber)"
                        : "none",
                }}
              />
              <div style={{ color: "var(--tv-text)", fontWeight: 600 }}>{p.title}</div>
              <div style={{ color: "var(--tv-cyan)", fontSize: 11 }}>
                {p.tech.split("·")[0].trim()}
              </div>
              <div
                style={{
                  color: "var(--tv-secondary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.description}
              </div>
              <div style={{ color: "var(--tv-dim)", fontSize: 11, textAlign: "right" }}>
                {p.links.demo ? "demo →" : p.links.readmore ? "read_more →" : ""}
              </div>
            </a>
          ))}
        </div>

        {/* Planned */}
        {todo.length > 0 && (
          <>
            <div
              style={{
                marginTop: 32,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ color: "var(--tv-dim)" }}>//</span>
              <span style={{ color: "var(--tv-dim)", fontSize: 12 }}>PLANNED</span>
              <span style={{ color: "var(--tv-dim)", fontSize: 11 }}>({todo.length} ideas)</span>
              <div style={{ flex: 1, height: 1, background: "var(--tv-border)" }} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 8,
              }}
            >
              {todo.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: "1px solid var(--tv-border)",
                    padding: 12,
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: 12,
                  }}
                >
                  <div style={{ color: "var(--tv-secondary)", marginBottom: 4 }}>{p.title}</div>
                  <div style={{ color: "var(--tv-cyan)", fontSize: 10, opacity: 0.7 }}>
                    {p.tech}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 16,
            borderTop: "1px dashed var(--tv-border)",
            color: "var(--tv-dim)",
            fontSize: 11,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{projects.length} projects total</span>
          <span>view: terminal</span>
        </div>
        {site.wittyTagline && (
          <div
            style={{
              color: "var(--tv-dim)",
              fontSize: 11,
              textAlign: "center",
              marginTop: 12,
              fontStyle: "italic",
            }}
          >
            {site.wittyTagline}
          </div>
        )}
        {site.author && (
          <div
            style={{
              color: "var(--tv-dim)",
              fontSize: 11,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            by{" "}
            {site.authorUrl ? (
              <a
                href={site.authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--tv-text)",
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
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        input::placeholder { color: var(--tv-dim); }
      `}</style>
    </div>
  );
}
