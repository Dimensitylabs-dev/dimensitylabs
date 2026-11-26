export type ContentStatus = "draft" | "published";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: ContentStatus;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  services: string[];
  status: ContentStatus;
  /** Editorial category label shown on showcase cards. */
  category: string;
  /** Optional optimized preview under /public. */
  image?: string;
  /** Optional muted preview video. */
  video?: string;
  /** When false, excluded from homepage showcase. Defaults to true. */
  featured?: boolean;
  /** Neutral CSS gradient used when no image asset exists. */
  coverTone?: string;
};

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  publishedAt: string;
  status: ContentStatus;
};

/** Lightweight shape consumed by the 3D project showcase. */
export type ShowcaseProject = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  href: string;
  image?: string;
  video?: string;
  coverTone: string;
};
