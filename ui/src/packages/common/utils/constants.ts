import type { TabKey } from "@portfolio/common";

export const NAV_ITEMS: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "Home" },
  { key: "work", label: "Work" },
  { key: "contact", label: "Contact" },
];

export const SITE_CONFIG = {
  name: "Kyle Ruddy",
  role: "Software Engineer",
  githubUrl: "https://github.com/yourusername",
  linkedinUrl: "https://linkedin.com/in/yourusername",
  contactEndpoint: "/contact-api/api/contact",
};
