import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants/site";
import type { PageSeoInput } from "@/types/seo";

function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/images/brand/og-default.png");

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
  },
};
