import { motion } from "framer-motion";
import { projects } from "./projectData";

export function ProjectGrid() {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    What I do
                </p>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    A few things I care about
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {projects.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="h-full rounded-3xl border shadow-sm"
                    >
                        <div className="space-y-3 p-6">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="leading-7 text-muted-foreground">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
