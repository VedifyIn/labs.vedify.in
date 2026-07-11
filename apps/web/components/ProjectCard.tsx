import { useState } from "react";
import { motion } from "framer-motion";
import { getIcon } from "./icons";
import type { Project } from "@/types";

const colorMap: Record<string, string> = {
  coral: "var(--color-coral)",
  purple: "var(--color-purple)",
  teal: "var(--color-teal)",
  pink: "var(--color-pink)",
  amber: "var(--color-amber)",
  blue: "var(--color-blue)",
};

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  live: { bg: "bg-bg-live", text: "text-text-live", label: "Live" },
  "in-progress": { bg: "bg-bg-progress", text: "text-text-progress", label: "In progress" },
  todo: { bg: "bg-bg-todo", text: "text-text-todo", label: "Todo" },
};

const MAX_VISIBLE_TAGS = 3;

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(project.icon);
  const iconColor = colorMap[project.color] ?? "var(--color-text-primary)";
  const ss = statusStyles[project.status] ?? statusStyles.todo;
  const cardHref = project.links.demo || project.links.github || "#";
  const cardTarget = project.links.demo ? "_blank" : undefined;
  const tags = project.tags ?? [];
  const visibleTags = expanded ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-surface-2 border border-border rounded-[14px] p-4 hover:border-border-hover transition-colors duration-200 relative overflow-hidden"
    >
      {project.ribbon && (
        <div className="absolute top-0 right-0 w-[80px] h-[80px] overflow-hidden z-[2] pointer-events-none">
          <div className="absolute top-[15px] right-[-20px] w-[100px] bg-red-500 text-white text-[8px] font-mono font-semibold text-center py-[2px] rotate-45 shadow-md">
            {project.ribbon}
          </div>
        </div>
      )}
      <div className="flex justify-between items-start mb-2.5">
        <Icon size={20} style={{ color: iconColor }} aria-hidden="true" />
        <span className={`text-[10.5px] px-2 py-0.5 rounded-full font-mono ${ss.bg} ${ss.text}`}>
          {ss.label}
        </span>
      </div>

      <a
        href={cardHref}
        target={cardTarget}
        rel={cardTarget ? "noopener noreferrer" : undefined}
        className="no-underline text-inherit block"
      >
        <h3 className="text-[14.5px] font-semibold m-0 mb-0.5 group-hover:text-purple">
          {project.title}
        </h3>
      </a>
      <p className="font-mono text-[11px] text-text-muted m-0 mb-2">{project.tech}</p>
      <p className="text-[12.5px] text-text-secondary leading-relaxed m-0">{project.description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-3 text-text-muted"
            >
              {tag}
            </span>
          ))}
          {!expanded && hiddenCount > 0 && (
            <button
              onClick={() => setExpanded(true)}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-3 text-purple hover:text-purple/80 cursor-pointer border-none"
            >
              +{hiddenCount} more
            </button>
          )}
          {expanded && tags.length > MAX_VISIBLE_TAGS && (
            <button
              onClick={() => setExpanded(false)}
              className="text-[10px] px-1.5 py-0.5 rounded-full font-mono bg-surface-3 text-text-muted hover:text-text-secondary cursor-pointer border-none"
            >
              Show less
            </button>
          )}
        </div>
      )}

      {(project.links.demo || project.links.readmore || project.links.github) && (
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
          {project.links.readmore && (
            <motion.span
              whileHover={{ x: -2 }}
              className="text-[11px] font-medium text-purple flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => window.open(project.links.readmore, '_blank', 'noopener,noreferrer')}
            >
              📄 Read more →
            </motion.span>
          )}
          {!project.links.readmore && <span />}
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[11px] font-medium text-text-secondary hover:text-text-primary flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-3 hover:bg-surface-2 transition-colors no-underline"
            >
              <GitHubIcon size={12} />
              GitHub
            </motion.a>
          )}
          {!project.links.github && <span />}
          {project.links.demo && (
            <motion.span
              whileHover={{ x: 2 }}
              className="text-[11px] font-medium text-purple flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => window.open(project.links.demo, '_blank', 'noopener,noreferrer')}
            >
              🚀 Demo →
            </motion.span>
          )}
        </div>
      )}
    </motion.div>
  );
}
