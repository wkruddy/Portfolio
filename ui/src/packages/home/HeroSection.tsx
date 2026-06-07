import { SITE_CONFIG, TabKey, trackCtaClick, useReducedMotion } from "@portfolio/common";
import { pillClass } from "@portfolio/layout";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Mail, UserRound } from "lucide-react";
import { heroButtonPrimaryClass, heroButtonSecondaryClass } from "./home.styles";

interface HeroSectionProps {
    onTabChange: (tab: TabKey) => void;
}

export function HeroSection({ onTabChange }: HeroSectionProps) {
    const reduced = useReducedMotion();

    const goToTab = (tab: TabKey, cta: string) => {
        trackCtaClick("home", cta);
        onTabChange(tab);
    };

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="flex flex-col gap-6"
        >
            <div className={`${pillClass} self-start border-sky-300/20 bg-sky-300/5`}>
                Senior Software Engineer · Builder · Systems thinker
            </div>

            <h1 className="m-0 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Hi, I&apos;m Kyle.
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                I build thoughtful software with a bias toward clarity, speed, and real-world
                usefulness. I&apos;m especially interested in product engineering, internal platforms,
                AI-assisted workflows, and the systems that make teams more effective.
            </p>

            <div className="flex flex-wrap gap-3">
                <button
                    className={heroButtonPrimaryClass}
                    onClick={() => goToTab("work", "hero_impact_themes")}
                >
                    Explore impact themes <ArrowRight size={18} />
                </button>
                <a
                    className={heroButtonSecondaryClass}
                    href={SITE_CONFIG.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackCtaClick("home", "hero_resume")}
                >
                    View resume
                </a>
                <button
                    className={heroButtonSecondaryClass}
                    onClick={() => goToTab("contact", "hero_contact")}
                >
                    Get in touch
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1 text-sm text-muted">
                <a
                    className="inline-flex items-center gap-2 transition hover:text-foreground"
                    href={SITE_CONFIG.githubUrl}
                    onClick={() => trackCtaClick("home", "proof_github")}
                >
                    <Code2 size={18} /> GitHub
                </a>
                <a
                    className="inline-flex items-center gap-2 transition hover:text-foreground"
                    href={SITE_CONFIG.linkedinUrl}
                    onClick={() => trackCtaClick("home", "proof_linkedin")}
                >
                    <UserRound size={18} /> LinkedIn
                </a>
                <button
                    className="inline-flex items-center gap-2 transition hover:text-foreground"
                    onClick={() => goToTab("contact", "proof_contact")}
                >
                    <Mail size={18} /> Contact
                </button>
            </div>
        </motion.div>
    );
}
