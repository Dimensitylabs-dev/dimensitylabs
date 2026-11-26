import type { CaseStudy } from "@/types/content";

/**
 * Case study seed data.
 * Entries follow the existing scaffolding pattern (Confidential clients,
 * placeholder narratives) so the showcase cylinder has enough cards while
 * real routes remain valid via generateStaticParams.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "roadster-3d",
    title: "Roadster 3D",
    client: "Dimensity Labs",
    category: "Product",
    summary: "Immersive automotive product landing with live 3D motion.",
    description:
      "Dummy product page for Roadster 3D. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/roadster-3d-car-landing.mp4",
    coverTone: "linear-gradient(145deg, #0a0a0b 0%, #1c1c1f 50%, #3a3a40 100%)",
  },
  {
    slug: "living-portrait",
    title: "Living Portrait",
    client: "Dimensity Labs",
    category: "Experience",
    summary: "Interactive portrait experience with expressive real-time motion.",
    description:
      "Dummy product page for Living Portrait. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering", "ai-systems"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/living-portrait-hero.mp4",
    coverTone: "linear-gradient(145deg, #101018 0%, #2a1f3d 55%, #5a4a7a 100%)",
  },
  {
    slug: "particle-self",
    title: "Particle Self",
    client: "Dimensity Labs",
    category: "AI Systems",
    summary: "Particle identity system for personal brand storytelling.",
    description:
      "Dummy product page for Particle Self. Full case narrative and delivery details will replace this placeholder.",
    services: ["ai-systems"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/oraciteslArea.mp4",
    coverTone: "linear-gradient(145deg, #050508 0%, #14141c 45%, #6e6e78 100%)",
  },
  {
    slug: "robot-jellyfish",
    title: "Robot Jellyfish",
    client: "Dimensity Labs",
    category: "Product",
    summary: "Technical product interface built around a kinetic Medusa system.",
    description:
      "Dummy product page for Robot Jellyfish. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/medusa-jellyfish-hero.mp4",
    coverTone: "linear-gradient(145deg, #f4f1ea 0%, #d8cfbc 40%, #11120d 100%)",
  },
  {
    slug: "ink-reveal",
    title: "Ink Reveal",
    client: "Dimensity Labs",
    category: "Brand",
    summary: "Brand reveal system with fluid typography and ink motion.",
    description:
      "Dummy product page for Ink Reveal. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/ink-reveal-hover.mp4",
    coverTone: "linear-gradient(145deg, #ffffff 0%, #e8e4dc 50%, #1a1a1a 100%)",
  },
  {
    slug: "space-voyage",
    title: "Space Voyage",
    client: "Dimensity Labs",
    category: "Film",
    summary: "Cinematic space voyage sequence for product storytelling.",
    description:
      "Dummy product page for Space Voyage. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/space-voyage-video.mp4",
    coverTone: "linear-gradient(145deg, #1a0f0a 0%, #5c3a28 45%, #c4a484 100%)",
  },
  {
    slug: "helion-dispatch",
    title: "Helion Dispatch",
    client: "Dimensity Labs",
    category: "Product",
    summary: "Dispatch landing experience for operations-focused product teams.",
    description:
      "Dummy product page for Helion Dispatch. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/helion-dispatch-landing.mp4",
    coverTone: "linear-gradient(145deg, #0c1018 0%, #243044 50%, #8aa0b8 100%)",
  },
  {
    slug: "honey-bee",
    title: "Honey Bee",
    client: "Dimensity Labs",
    category: "Brand",
    summary: "Playful product landing built around the Honey Bee brand world.",
    description:
      "Dummy product page for Honey Bee. Full case narrative and delivery details will replace this placeholder.",
    services: ["product-engineering"],
    status: "published",
    featured: true,
    video:
      "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/honey-bee-melli-landing.mp4",
    coverTone: "linear-gradient(145deg, #1a1408 0%, #c4a018 50%, #f4e8c0 100%)",
  },
];
