import { cache } from "react";

import { services } from "@/content/services";
import type { Service } from "@/types/content";

export const getServices = cache(async (): Promise<Service[]> => {
  return services.filter((service) => service.status === "published");
});

export const getServiceBySlug = cache(
  async (slug: string): Promise<Service | undefined> => {
    const all = await getServices();
    return all.find((service) => service.slug === slug);
  },
);
