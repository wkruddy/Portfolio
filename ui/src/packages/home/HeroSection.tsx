import { SITE_CONFIG, TabKey } from "@portfolio/common";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

interface HeroSectionProps {
    onTabChange: (tab: TabKey) => void;
}

export const HeroSection = ({ onTabChange }: HeroSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
                Software Engineer • Builder • Systems Thinker
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    Hi, I’m Kyle.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                    I build thoughtful software with a bias toward clarity, speed, and real-world
                    usefulness. I’m especially interested in product engineering, internal
                    platforms, AI-assisted workflows, and the systems that make teams more
                    effective.
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    className="rounded-2xl border px-5 py-3 text-sm font-medium"
                    onClick={() => onTabChange("work")}
                >
                    <span className="inline-flex items-center gap-2">
                        View Projects <ArrowRight className="h-4 w-4" />
                    </span>
                </button>
                <button
                    className="rounded-2xl border px-5 py-3 text-sm font-medium"
                    onClick={() => onTabChange("contact")}
                >
                    Get in Touch
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                <a
                    href={SITE_CONFIG.githubUrl}
                    className="inline-flex items-center gap-2 hover:text-foreground"
                >
                    <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                    href={SITE_CONFIG.linkedinUrl}
                    className="inline-flex items-center gap-2 hover:text-foreground"
                >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <button
                    onClick={() => onTabChange("contact")}
                    className="inline-flex items-center gap-2 hover:text-foreground"
                >
                    <Mail className="h-4 w-4" /> Contact
                </button>
            </div>
        </motion.div>
    );
};
