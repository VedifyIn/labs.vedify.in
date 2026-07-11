import { useState } from "react";
import { motion } from "framer-motion";
import { getIcon } from "./icons";
import type { Project } from "@/types";

const MAX_VISIBLE_TAGS = 3;

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  live: { bg: "bg-bg-live", text: "text-text-live", label: "Live" },
  "in-progress": { bg: "bg-bg-progress", text: "text-text-progress", label: "In progress" },
  todo: { bg: "bg-bg-todo", text: "text-text-todo", label: "Todo" },
};

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function FeaturedCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(project.icon);
  const ss = statusStyles[project.status] ?? statusStyles.todo;
  const tags = project.tags ?? [];
  const visibleTags = expanded ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <a
      href={project.links.readmore || project.links.demo || project.links.github || "#"}
      target={project.links.demo ? "_blank" : undefined}
      rel={project.links.demo ? "noopener noreferrer" : undefined}
      className="block relative overflow-hidden rounded-[18px] p-6 no-underline text-inherit group border border-border-hover"
      style={{
        background: `linear-gradient(155deg, var(--color-surface-3), var(--color-surface-2))`,
      }}
    >
      {project.ribbon && (
        <div className="absolute top-0 right-0 w-[100px] h-[100px] overflow-hidden z-[2] pointer-events-none">
          <div className="absolute top-[19px] right-[-25px] w-[120px] bg-red-500 text-white text-[9px] font-mono font-semibold text-center py-[3px] rotate-45 shadow-md">
            {project.ribbon}
          </div>
        </div>
      )}
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-40%",
          right: "-15%",
          width: 280,
          height: 280,
          background: "radial-gradient(circle, rgba(167,139,250,0.16), transparent 70%)",
        }}
      />

      <div className="flex justify-between items-start mb-3.5 relative z-[1]">
        <span className="font-mono text-[11px] tracking-[0.05em] uppercase text-purple flex items-center gap-1.5">
          <Icon size={13} aria-hidden="true" />
          Most active project
        </span>
        <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-mono ${ss.bg} ${ss.text}`}>
          {ss.label}
        </span>
      </div>

      <h2 className="text-[22px] font-bold m-0 mb-1 tracking-[-0.01em] relative z-[1]">
        {project.title}
      </h2>
      <p className="font-mono text-xs text-text-muted m-0 mb-3 relative z-[1]">{project.tech}</p>
      <p className="text-sm text-text-secondary leading-relaxed max-w-[560px] m-0 mb-4 relative z-[1]">
        {project.longDesc || project.description}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-[1]">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-2 text-text-muted"
            >
              {tag}
            </span>
          ))}
          {!expanded && hiddenCount > 0 && (
            <button
              onClick={(e) => { e.preventDefault(); setExpanded(true); }}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-2 text-purple hover:text-purple/80 cursor-pointer border-none"
            >
              +{hiddenCount} more
            </button>
          )}
          {expanded && tags.length > MAX_VISIBLE_TAGS && (
            <button
              onClick={(e) => { e.preventDefault(); setExpanded(false); }}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-2 text-text-muted hover:text-text-secondary cursor-pointer border-none"
            >
              Show less
            </button>
          )}
        </div>
      )}

      {project.stats && (
        <div className="flex gap-5 mb-4 relative z-[1]">
          {project.stats.map((s) => (
            <div key={s.label} className="text-xs text-text-muted">
              <b className="block text-sm font-mono font-semibold text-text-primary">{s.value}</b>
              {s.label}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3.5 border-t border-border relative z-[1]">
        {project.links.readmore && (
          <motion.span
            whileHover={{ x: -2 }}
            className="text-xs font-medium text-purple flex items-center gap-1.5 cursor-pointer hover:underline"
            onClick={(e) => { e.stopPropagation(); window.open(project.links.readmore, '_blank', 'noopener,noreferrer'); }}
          >
            📄 Read more →
          </motion.span>
        )}
        {!project.links.readmore && <span />}
        {project.links.github && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-medium text-text-secondary hover:text-text-primary flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-3 hover:bg-surface-2 transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); window.open(project.links.github, '_blank', 'noopener,noreferrer'); }}
          >
            <GitHubIcon size={14} />
            GitHub
          </motion.span>
        )}
        {!project.links.github && <span />}
        {project.links.demo && (
          <motion.span
            whileHover={{ x: 2 }}
            className="text-xs font-medium text-purple flex items-center gap-1.5 cursor-pointer hover:underline"
            onClick={(e) => { e.stopPropagation(); window.open(project.links.demo, '_blank', 'noopener,noreferrer'); }}
          >
            🚀 Try the demo →
          </motion.span>
        )}
      </div>
    </a>
  );
}
