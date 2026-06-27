import type { Project, SiteData } from "@/types";

export default function JsonLd({ site, projects }: { site: SiteData; projects: Project[] }) {
  const url = site.url || `https://${site.domain}`;

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    url,
    description: site.tagline,
    author: { "@type": "Person", name: site.author || "Vaidic" },
  };

  const liveProjects = projects.filter((p) => p.status === "live");
  const inProgressProjects = projects.filter((p) => p.status === "in-progress");
  const todoProjects = projects.filter((p) => p.status === "todo");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.title} Projects`,
    description: site.tagline,
    url,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.description,
        applicationCategory: p.tags.join(", "),
        ...(p.links.demo ? { url: p.links.demo } : {}),
        ...(p.status === "live"
          ? { operatingSystem: "Web", offers: { "@type": "Offer", price: "0" } }
          : {}),
      },
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Vaidic's Labs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `A collection of hands-on projects by Vaidic across backend systems (Go, Python), GenAI (RAG, embeddings, agents, MCP), and trading tools. ${liveProjects.length} projects are live, ${inProgressProjects.length} in progress, and ${todoProjects.length} planned.`,
        },
      },
      {
        "@type": "Question",
        name: "How many projects are live?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${liveProjects.length} projects are currently live, including ${liveProjects.map((p) => p.title).join(", ")}.`,
        },
      },
      {
        "@type": "Question",
        name: "What technologies are used?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Projects span Go, Python, Rust, TypeScript, Flutter, and Next.js across categories like embeddings, RAG, agents, MCP, eval, CLI tools, and UI.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
