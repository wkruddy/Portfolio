interface AnalyticsEvent {
    type: string;
    path: string;
    tab?: string;
    ip?: string;
    userAgent?: string;
    createdAt: string;
}

const events: AnalyticsEvent[] = [];

export function recordEvent(event: AnalyticsEvent) {
    events.push(event);
}

export function getEventSummary() {
    return {
        total: events.length,
        recent: events.slice(-50).reverse(),
    };
}
