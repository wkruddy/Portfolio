import { SITE_CONFIG } from "./constants";
import type { TabKey } from "../navigation/types";

export type AnalyticsEventType = "page_view" | "tab_view" | "cta_click";

export type AnalyticsEventPayload = {
    type: AnalyticsEventType;
    path: string;
    tab?: TabKey;
    meta?: Record<string, string>;
    timestamp?: string;
};

export async function trackAnalyticsEvent(payload: AnalyticsEventPayload): Promise<void> {
    try {
        await fetch(SITE_CONFIG.analyticsEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });
    } catch {
        // fail silent — analytics must not block UX
    }
}

export function trackTabView(tab: TabKey): void {
    void trackAnalyticsEvent({ type: "tab_view", path: "/", tab });
}

export function trackCtaClick(tab: TabKey, cta: string): void {
    void trackAnalyticsEvent({ type: "cta_click", path: "/", tab, meta: { cta } });
}
