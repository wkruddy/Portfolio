import { useReducedMotion } from "@portfolio/common";
import { motion } from "framer-motion";
import { NowSection } from "./NowSection";
import { impactThemes } from "./projectData";
import { evidenceLinkClass, projectCardClass } from "./work.styles";

export function ImpactThemes() {
    const reduced = useReducedMotion();

    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Impact</p>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    How I create leverage
                </h2>
                <p className="max-w-2xl leading-7 text-muted">
                    Themes from real work—patterns and judgment, not employer case studies.
                    Evidence links appear only when they&apos;re safe to share.
                </p>
            </div>

            <NowSection />

            <div className="grid gap-4 md:grid-cols-3">
                {impactThemes.map((theme, index) => (
                    <motion.div
                        key={theme.key}
                        initial={reduced ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: reduced ? 0 : 0.4,
                            delay: reduced ? 0 : 0.1 * index,
                        }}
                        className={projectCardClass}
                    >
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-foreground">{theme.title}</h3>
                            <p className="leading-7 text-muted">{theme.description}</p>
                            <ul className="list-disc space-y-1 pl-5 leading-7 text-muted">
                                {theme.scope.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            {theme.evidence.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {theme.evidence.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={evidenceLinkClass}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/** @deprecated Use ImpactThemes */
export const ProjectGrid = ImpactThemes;
