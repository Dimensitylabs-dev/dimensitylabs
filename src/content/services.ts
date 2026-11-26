import type { Service } from "@/types/content";

/**
 * Static service content for architecture scaffolding.
 * Replace with CMS/DB-backed source later via lib/content accessors.
 */
export const services: Service[] = [
  {
    slug: "product-engineering",
    title: "Product Engineering",
    summary: "End-to-end product design and engineering for ambitious teams.",
    description:
      "Placeholder description for product engineering. Content and UI arrive in a later phase.",
    status: "published",
  },
  {
    slug: "ai-systems",
    title: "AI Systems",
    summary: "Applied AI systems that ship into real products.",
    description:
      "Placeholder description for AI systems. Content and UI arrive in a later phase.",
    status: "published",
  },
];
