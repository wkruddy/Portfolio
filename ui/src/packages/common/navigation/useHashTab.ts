import type { TabKey } from "@portfolio/common";
import { useEffect, useState } from "react";

const VALID_TABS: TabKey[] = ["home", "work", "contact"];

function getHashTab(): TabKey {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "") as TabKey;
    return VALID_TABS.includes(hash) ? hash : "home";
}

export function useHashTab() {
    const [activeTab, setActiveTab] = useState<TabKey>(getHashTab());

    useEffect(() => {
        const onHashChange = () => {
            setActiveTab(getHashTab());
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        window.addEventListener("hashchange", onHashChange);
        setActiveTab(getHashTab());

        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const setTab = (tab: TabKey) => {
        window.location.hash = tab;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveTab(tab);
    };

    return { activeTab, setTab };
}
