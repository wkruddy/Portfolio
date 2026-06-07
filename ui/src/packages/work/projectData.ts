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
            "Platform and service boundaries",
            "Operational reliability",
            "Developer experience for internal users",
        ],
        evidence: [],
    },
    {
        key: "ai-enhanced",
        title: "AI-Enhanced Development",
        description:
            "I use modern AI tooling thoughtfully to prototype faster, automate repetitive work, and sharpen engineering output.",
        scope: [
            "Workflow automation",
            "Prototyping and iteration speed",
            "Guardrails for quality and maintainability",
        ],
        evidence: [],
    },
    {
        key: "product-minded",
        title: "Product-Minded Engineering",
        description:
            "I care about maintainability, user experience, and shipping practical solutions—not just writing code.",
        scope: [
            "Tradeoffs and scope",
            "UX for internal and external users",
            "Sustainable delivery",
        ],
        evidence: [],
    },
];
