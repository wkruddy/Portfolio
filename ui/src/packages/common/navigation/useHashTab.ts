import { useEffect, useState } from "react";
import { useReducedMotion } from "../utils/useReducedMotion";
import type { TabKey } from "./types";

const VALID_TABS: TabKey[] = ["home", "work", "contact"];

function getHashTab(): TabKey {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "") as TabKey;
    return VALID_TABS.includes(hash) ? hash : "home";
}

export function useHashTab() {
    const [activeTab, setActiveTab] = useState<TabKey>(getHashTab());
    const reducedMotion = useReducedMotion();
    const scrollBehavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";

    useEffect(() => {
        const onHashChange = () => {
            setActiveTab(getHashTab());
            window.scrollTo({ top: 0, behavior: scrollBehavior });
        };

        window.addEventListener("hashchange", onHashChange);
        setActiveTab(getHashTab());

        return () => window.removeEventListener("hashchange", onHashChange);
    }, [scrollBehavior]);

    const setTab = (tab: TabKey) => {
        window.location.hash = tab;
        window.scrollTo({ top: 0, behavior: scrollBehavior });
        setActiveTab(tab);
    };

    return { activeTab, setTab };
}
