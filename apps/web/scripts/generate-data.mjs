import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dataDir = join(root, "data");
const projectsDir = join(dataDir, "projects");
const outDir = join(root, "public", "data");

const isDev = process.env.NODE_ENV === "development";
const log = isDev ? console.log : () => {};

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Validation function
function validateProject(project, filename) {
  const errors = [];

  if (!project.id || typeof project.id !== "string") {
    errors.push(`${filename}: Missing or invalid 'id'`);
  }
  if (!project.title || typeof project.title !== "string") {
    errors.push(`${filename}: Missing or invalid 'title'`);
  }
  if (!project.description || typeof project.description !== "string") {
    errors.push(`${filename}: Missing or invalid 'description'`);
  }
  if (!project.tech || typeof project.tech !== "string") {
    errors.push(`${filename}: Missing or invalid 'tech'`);
  }
  if (!["live", "in-progress", "todo"].includes(project.status)) {
    errors.push(`${filename}: Invalid 'status' - must be 'live', 'in-progress', or 'todo'`);
  }
  if (!Array.isArray(project.tags)) {
    errors.push(`${filename}: Missing or invalid 'tags' - must be an array`);
  }
  if (!project.links || typeof project.links !== "object") {
    errors.push(`${filename}: Missing or invalid 'links' - must be an object`);
  }

  if (errors.length > 0) {
    console.error("Validation errors:");
    errors.forEach((err) => console.error(`  - ${err}`));
    process.exit(1);
  }

  return project;
}

const siteRaw = readFileSync(join(dataDir, "site.yaml"), "utf-8");
const site = yaml.load(siteRaw);
writeFileSync(join(outDir, "site.json"), JSON.stringify(site, null, 2));
log("✓ public/data/site.json");

const files = readdirSync(projectsDir).filter(
  (f) => f.endsWith(".yaml") && !f.startsWith("_") && f !== "template.yaml"
);
const projects = files.map((f) => {
  const raw = readFileSync(join(projectsDir, f), "utf-8");
  const project = yaml.load(raw);
  return validateProject(project, f);
});

// Sort: live → in-progress → todo, then by title
const order = { live: 0, "in-progress": 1, todo: 2 };
projects.sort((a, b) => {
  const sa = order[a.status] ?? 2;
  const sb = order[b.status] ?? 2;
  if (sa !== sb) return sa - sb;
  return a.title.localeCompare(b.title);
});

writeFileSync(join(outDir, "projects.json"), JSON.stringify(projects, null, 2));
log(`✓ public/data/projects.json (${projects.length} projects)`);
