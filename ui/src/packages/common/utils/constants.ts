import type { TabKey } from "@portfolio/common";

export const NAV_ITEMS: Array<{ key: TabKey; label: string }> = [
    { key: "home", label: "Home" },
    { key: "work", label: "Impact" },
    { key: "contact", label: "Contact" },
];

export const SITE_CONFIG = {
    name: "Kyle Ruddy",
    role: "Senior Software Engineer",
    githubUrl: "https://github.com/wkruddy",
    linkedinUrl: "https://linkedin.com/in/kyleruddy",
    contactEndpoint: "/contact-api/api/contact",
    analyticsEndpoint: "/contact-api/api/analytics/events",
    resumeUrl: "/resume.pdf",
};
