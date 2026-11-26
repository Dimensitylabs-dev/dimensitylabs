import type { Metadata } from "next";

import {
  FeaturedWork,
  FinalCta,
  Hero,
  Intro,
  ServicesOverview,
  WhyDimensity,
} from "@/app/(site)/_sections";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Dimensity Labs",
    description:
      "Dimensity Labs is a technology and AI product engineering studio serving clients globally.",
    path: "/",
  }),
  title: {
    absolute: "Dimensity Labs",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesOverview />
      <FeaturedWork />
      <WhyDimensity />
      <FinalCta />
    </>
  );
}
