import { Panel, useReducedMotion } from "@portfolio/common";
import { pillClass } from "@portfolio/layout";
import { motion } from "framer-motion";

export function AvatarCard() {
    const reduced = useReducedMotion();

    return (
        <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.1 }}
        >
            <Panel className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-slate-900/90 to-slate-900/95">
                <div className="flex flex-col items-center gap-6 p-8 text-center sm:p-10">
                    <div className="h-44 w-44 rounded-full bg-gradient-to-br from-sky-300 to-violet-400 p-1 shadow-glow">
                        <img
                            src="/avatar.jpg"
                            alt="Kyle Ruddy"
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">Kyle Ruddy</h2>
                        <p className="mt-1 text-muted">Senior Software Engineer</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <span className={pillClass}>Frontend-focused Fullstack</span>
                        <span className={pillClass}>Systems</span>
                        <span className={pillClass}>AI Tooling</span>
                    </div>
                </div>
            </Panel>
        </motion.div>
    );
}
