export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc?: string;
  tech: string;
  icon: string;
  color: string;
  status: "live" | "in-progress" | "todo";
  tags: string[];
  featured?: boolean;
  featuredOrder?: number;
  stats?: { label: string; value: string }[];
  ribbon?: string;
  links: {
    github?: string;
    demo?: string;
    readmore?: string;
  };
}

export interface SiteData {
  title: string;
  domain: string;
  tagline: string;
  footer?: string;
  view?: "polished" | "terminal" | "bento";
  theme?: "dark" | "light";
  wittyTagline?: string | string[];
  author?: string;
  authorUrl?: string;
  mainSite?: string;
  mainSiteLabel?: string;
  url?: string;
  links: { github?: string };
  social?: { twitter?: string };
}
