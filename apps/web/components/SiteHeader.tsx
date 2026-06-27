import type { SiteData } from "@/types";

export default function SiteHeader({ data }: { data: SiteData }) {
  return (
    <header className="relative z-[1] flex items-start justify-between flex-wrap gap-3 mb-6">
      <div>
        <span className="font-mono text-xs text-text-muted bg-surface-2 border border-border rounded-[6px] px-2 py-0.5 inline-block mb-2">
          {data.domain}
        </span>
        <h1 className="text-[26px] font-bold m-0 tracking-[-0.02em]">{data.title}</h1>
        <p className="text-sm text-text-secondary mt-1.5 max-w-[480px] m-0">{data.tagline}</p>
      </div>
      <div className="flex items-center gap-2">
        {data.mainSite && (
          <a
            href={data.mainSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[10px] bg-surface-2 border border-border text-coral no-underline hover:text-text-primary hover:border-border-hover transition-colors font-medium"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            {data.mainSiteLabel || data.mainSite.replace(/https?:\/\//, "")}
          </a>
        )}
        {data.links.github && (
          <a
            href={data.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[10px] bg-surface-2 border border-border text-text-secondary no-underline hover:text-text-primary hover:border-border-hover transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
            GitHub
          </a>
        )}
      </div>
    </header>
  );
}
