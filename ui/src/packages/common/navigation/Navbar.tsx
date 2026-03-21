import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "../../config/site";
import type { TabKey } from "../../types/navigation";

interface NavbarProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
                <div className="text-sm font-semibold tracking-wide">Kyle Ruddy</div>

                <nav className="hidden items-center gap-1 md:flex">
                    {NAV_ITEMS.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => onTabChange(key)}
                            className={`relative rounded-full px-4 py-2 text-sm transition ${
                                activeTab === key
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {label}
                            {activeTab === key && (
                                <motion.span
                                    layoutId="activeTabUnderline"
                                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <button
                    className="md:hidden"
                    onClick={() =>
                        onTabChange(
                            activeTab === "home"
                                ? "work"
                                : activeTab === "work"
                                ? "contact"
                                : "home",
                        )
                    }
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
