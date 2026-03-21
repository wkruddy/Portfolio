import { motion } from "framer-motion";

export function AvatarCard() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-3xl border shadow-sm"
        >
            <div className="flex flex-col items-center gap-6 p-8 text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border">
                    <img
                        src="/avatar.jpg"
                        alt="Kyle avatar"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Kyle Ruddy</h2>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border px-3 py-1">Backend</span>
                    <span className="rounded-full border px-3 py-1">Systems</span>
                    <span className="rounded-full border px-3 py-1">AI Tooling</span>
                </div>
            </div>
        </motion.div>
    );
}
