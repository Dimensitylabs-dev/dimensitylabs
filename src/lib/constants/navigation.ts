import type { NavItem } from "@/types/navigation";

/** Primary site navigation — keep in sync across header and mobile nav. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: "Careers", href: "/careers" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
