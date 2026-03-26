import { SITE_CONFIG, TabKey } from "@portfolio/common";
import { pillClass } from "@portfolio/layout";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Mail, UserRound } from "lucide-react";
import { heroButtonPrimaryClass, heroButtonSecondaryClass } from "./home.styles";

interface HeroSectionProps {
    onTabChange: (tab: TabKey) => void;
}

export function HeroSection({ onTabChange }: HeroSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
        >
            <div className={`${pillClass} self-start border-sky-300/20 bg-sky-300/5`}>
                Senior Software Engineer • Builder • Systems Thinker
            </div>

            <h1 className="m-0 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Hi, I’m Kyle.
            </h1>

            <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                I build thoughtful software with a bias toward clarity, speed, and real-world
                usefulness. I’m especially interested in product engineering, internal platforms,
                AI-assisted workflows, and the systems that make teams more effective.
            </p>

            <div className="flex flex-wrap gap-3">
                <button className={heroButtonPrimaryClass} onClick={() => onTabChange("work")}>
                    View Projects <ArrowRight size={18} />
                </button>
                <a
                    className={heroButtonSecondaryClass}
                    href={SITE_CONFIG.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    View Resume
                </a>
                <button className={heroButtonSecondaryClass} onClick={() => onTabChange("contact")}>
                    Get in Touch
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1 text-sm text-muted">
                <a
                    className="inline-flex items-center gap-2 transition hover:text-foreground"
                    href={SITE_CONFIG.githubUrl}
                >
                    <Code2 size={18} /> GitHub
                </a>
                <a
                    className="inline-flex items-center gap-2 transition hover:text-foreground"
                    href={SITE_CONFIG.linkedinUrl}
                >
                    <UserRound size={18} /> LinkedIn
                </a>
                <button
                    className="inline-flex items-center gap-2 transition hover:text-foreground"
                    onClick={() => onTabChange("contact")}
                >
                    <Mail size={18} /> Contact
                </button>
            </div>
        </motion.div>
    );
}
