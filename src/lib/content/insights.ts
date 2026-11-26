import { cache } from "react";

import { insights } from "@/content/insights";
import type { Insight } from "@/types/content";

export const getInsights = cache(async (): Promise<Insight[]> => {
  return insights.filter((item) => item.status === "published");
});

export const getInsightBySlug = cache(
  async (slug: string): Promise<Insight | undefined> => {
    const all = await getInsights();
    return all.find((item) => item.slug === slug);
  },
);
