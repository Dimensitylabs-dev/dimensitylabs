import { cache } from "react";

import { caseStudies } from "@/content/work";
import type { CaseStudy, ShowcaseProject } from "@/types/content";

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  return caseStudies.filter((item) => item.status === "published");
});

export const getCaseStudyBySlug = cache(
  async (slug: string): Promise<CaseStudy | undefined> => {
    const all = await getCaseStudies();
    return all.find((item) => item.slug === slug);
  },
);

export const getShowcaseProjects = cache(
  async (): Promise<ShowcaseProject[]> => {
    const all = await getCaseStudies();
    return all
      .filter((item) => item.featured !== false)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        summary: item.summary,
        category: item.category,
        href: `/work/${item.slug}`,
        image: item.image,
        video: item.video,
        coverTone:
          item.coverTone ??
          "linear-gradient(145deg, #11120d 0%, #565449 50%, #d8cfbc 100%)",
      }));
  },
);
