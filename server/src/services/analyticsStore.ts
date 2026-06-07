import fs from "node:fs/promises";
import path from "node:path";

interface AnalyticsEvent {
    type: string;
    path: string;
    tab?: string;
    meta?: Record<string, string>;
    timestamp?: string;
    ip?: string;
    userAgent?: string;
    createdAt: string;
}

const MAX_EVENTS = 10_000;

const DATA_FILE = path.join(process.cwd(), "data", "analytics-events.json");

let events: AnalyticsEvent[] = [];
let initialized = false;
let persistTimer: NodeJS.Timeout | null = null;

async function initIfNeeded() {
    if (initialized) return;
    initialized = true;

    try {
        const raw = await fs.readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(raw) as { events?: AnalyticsEvent[] };
        if (parsed?.events && Array.isArray(parsed.events)) {
            events = parsed.events;
        }
    } catch {
        // It's fine if the file doesn't exist yet.
        events = [];
    }
}

async function persistNow() {
    await initIfNeeded();
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ events }, null, 2), "utf8");
}

function schedulePersist() {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
        persistNow().catch(() => {
            // best-effort persistence; logging handled by requestLogger.
        });
    }, 750);
}

export async function recordEvent(event: AnalyticsEvent) {
    await initIfNeeded();
    events.push(event);
    if (events.length > MAX_EVENTS) {
        events.splice(0, events.length - MAX_EVENTS);
    }
    schedulePersist();
}

export async function getEventSummary() {
    await initIfNeeded();
    return {
        total: events.length,
        recent: events.slice(-50).reverse(),
    };
}
