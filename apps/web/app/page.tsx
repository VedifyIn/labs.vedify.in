import { readFileSync } from "fs";
import { join } from "path";
import ClientPage from "./client-page";
import JsonLd from "@/components/JsonLd";
import type { Project, SiteData } from "@/types";

const VALID_VIEWS = ["polished", "terminal", "bento"] as const;
const VALID_THEMES = ["dark", "light"] as const;

export default function Page() {
  const projectsPath = join(process.cwd(), "public/data/projects.json");
  const sitePath = join(process.cwd(), "public/data/site.json");

  let projects: Project[] = [];
  let site: SiteData;

  try {
    const parsedProjects = JSON.parse(readFileSync(projectsPath, "utf-8"));
    projects = Array.isArray(parsedProjects) ? parsedProjects : [];
    site = JSON.parse(readFileSync(sitePath, "utf-8"));

    // Validate and apply environment overrides
    if (process.env.DEMO_VIEW && VALID_VIEWS.includes(process.env.DEMO_VIEW as any)) {
      site.view = process.env.DEMO_VIEW as (typeof VALID_VIEWS)[number];
    }
    if (process.env.DEMO_THEME && VALID_THEMES.includes(process.env.DEMO_THEME as any)) {
      site.theme = process.env.DEMO_THEME as (typeof VALID_THEMES)[number];
    }
  } catch (error) {
    console.error("Failed to load data:", error);
    // Provide fallback data
    site = {
      title: "Vaidic's Labs",
      domain: "labs.vedify.in",
      tagline: "Hands-on builds",
      links: {},
    };
  }

  return (
    <>
      <JsonLd site={site} projects={projects} />
      <ClientPage projects={projects} site={site} />
    </>
  );
}
