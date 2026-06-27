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

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = getIcon(project.icon);
  const iconColor = colorMap[project.color] ?? "var(--color-text-primary)";
  const ss = statusStyles[project.status] ?? statusStyles.todo;
  const cardHref = project.links.demo || project.links.github || "#";
  const cardTarget = project.links.demo ? "_blank" : undefined;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-surface-2 border border-border rounded-[14px] p-4 hover:border-border-hover transition-colors duration-200"
    >
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

      {(project.links.demo || project.links.readmore) && (
        <div className="flex gap-2.5 mt-3 pt-2.5 border-t border-border">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] text-purple no-underline flex items-center gap-1 hover:underline"
            >
              ↗ Demo
            </a>
          )}
          {project.links.readmore && (
            <a
              href={project.links.readmore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] text-text-muted no-underline flex items-center gap-1 hover:text-text-secondary hover:underline"
            >
              ↗ Read more
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
