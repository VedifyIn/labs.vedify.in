import { getIcon } from "./icons";
import type { Project } from "@/types";

export default function FeaturedCard({ project }: { project: Project }) {
  const Icon = getIcon(project.icon);

  return (
    <a
      href={project.links.demo || project.links.github || "#"}
      target={project.links.demo ? "_blank" : undefined}
      rel={project.links.demo ? "noopener noreferrer" : undefined}
      className="block relative overflow-hidden rounded-[18px] p-6 no-underline text-inherit group border border-border-hover"
      style={{
        background: `linear-gradient(155deg, var(--color-surface-3), var(--color-surface-2))`,
      }}
    >
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
        <span className="text-[10.5px] px-2 py-0.5 rounded-full font-mono bg-bg-live text-text-live">
          Live
        </span>
      </div>

      <h2 className="text-[22px] font-bold m-0 mb-1 tracking-[-0.01em] relative z-[1]">
        {project.title}
      </h2>
      <p className="font-mono text-xs text-text-muted m-0 mb-3 relative z-[1]">{project.tech}</p>
      <p className="text-sm text-text-secondary leading-relaxed max-w-[560px] m-0 mb-4 relative z-[1]">
        {project.longDesc || project.description}
      </p>

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

      <div className="flex gap-4 pt-3.5 border-t border-border relative z-[1]">
        {project.links.demo && (
          <span className="text-xs text-purple flex items-center gap-1 cursor-pointer hover:underline">
            ↗ Try the demo
          </span>
        )}
        {project.links.github && (
          <span className="text-xs text-text-muted flex items-center gap-1 cursor-pointer hover:text-text-secondary hover:underline">
            ↗ View source
          </span>
        )}
        {project.links.readmore && (
          <span className="text-xs text-text-muted flex items-center gap-1 cursor-pointer hover:text-text-secondary hover:underline">
            ↗ Read more
          </span>
        )}
      </div>
    </a>
  );
}
