export type ImpactEvidence = { label: string; href: string };

export type ImpactTheme = {
    key: string;
    title: string;
    description: string;
    scope: string[];
    evidence: ImpactEvidence[];
};

export const impactThemes: ImpactTheme[] = [
    {
        key: "systems-platform",
        title: "Systems & Platform Work",
        description:
            "I build reliable internal tools, backend systems, and product foundations that help teams move faster.",
        scope: [
            "Platform and internal tooling at Atlassian—reliability and service boundaries at enterprise scale",
            "Contributed to six-figure annual infrastructure savings through endpoint security licensing and capacity optimization",
            "Developer experience and operational reliability for teams running without heroics",
        ],
        evidence: [{ label: "Resume", href: "/resume.pdf" }],
    },
    {
        key: "ai-enhanced",
        title: "AI-Enhanced Development",
        description:
            "I use modern AI tooling thoughtfully to prototype faster, automate repetitive work, and sharpen engineering output.",
        scope: [
            "AI-assisted prototyping, workflow automation, and iteration speed",
            "Multi-agent pipeline for this portfolio—open engineering experiment",
            "Guardrails for quality and maintainability when shipping with AI tooling",
        ],
        evidence: [
            { label: "Portfolio Code", href: "https://github.com/wkruddy/Portfolio" },
            { label: "MealPrepper Code", href: "https://github.com/wkruddy/MealPrepper" },
        ],
    },
    {
        key: "product-minded",
        title: "Product-Minded Engineering",
        description:
            "I care about maintainability, user experience, and shipping practical solutions—not just writing code.",
        scope: [
            "Tradeoffs, scope, and sustainable delivery",
            "UX for internal and external users",
            "MealPrepper—AI experiment solving a real personal workflow problem",
        ],
        evidence: [{ label: "Portfolio Code", href: "https://github.com/wkruddy/Portfolio" }],
    },
];
