import type { TabKey } from "@portfolio/common";
import { NAV_ITEMS, SITE_CONFIG, trackCtaClick, useReducedMotion } from "@portfolio/common";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

interface NavbarProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
}

const NAV_TAB_CTA: Record<TabKey, string> = {
    home: "nav_tab_home",
    work: "nav_tab_work",
    contact: "nav_tab_contact",
};

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
    const reduced = useReducedMotion();

    const handleTabChange = (tab: TabKey) => {
        trackCtaClick(tab, NAV_TAB_CTA[tab]);
        onTabChange(tab);
    };

    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
                <div className="text-sm font-semibold tracking-wide">Kyle Ruddy</div>

                <nav className="hidden items-center gap-1 md:flex">
                    {NAV_ITEMS.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => handleTabChange(key)}
                            className={`relative rounded-full px-4 py-2 text-sm transition ${
                                activeTab === key
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {label}
                            {activeTab === key &&
                                (reduced ? (
                                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-foreground" />
                                ) : (
                                    <motion.span
                                        layoutId="activeTabUnderline"
                                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                    />
                                ))}
                        </button>
                    ))}
                </nav>

                <a
                    href={SITE_CONFIG.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden md:inline-flex items-center rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-muted"
                    onClick={() => trackCtaClick(activeTab, "nav_resume")}
                >
                    View resume
                </a>

                <button
                    className="md:hidden"
                    onClick={() =>
                        handleTabChange(
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
