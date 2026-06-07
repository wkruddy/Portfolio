import { SITE_CONFIG } from "@portfolio/common";
import type { ContactFormData } from "@portfolio/contact";

export type { AnalyticsEventPayload, AnalyticsEventType } from "@portfolio/common";
export { trackAnalyticsEvent } from "@portfolio/common";

export type FieldErrors = Record<string, string>;

export interface ContactApiErrorPayload {
    error?: string;
    fieldErrors?: FieldErrors;
}

export class ContactRequestError extends Error {
    public readonly status?: number;
    public readonly payload?: ContactApiErrorPayload;

    constructor(message: string, opts?: { status?: number; payload?: ContactApiErrorPayload }) {
        super(message);
        this.name = "ContactRequestError";
        this.status = opts?.status;
        this.payload = opts?.payload;
    }
}

export const submitContactForm = async (payload: ContactFormData): Promise<void> => {
    const response = await fetch(SITE_CONFIG.contactEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let parsed: ContactApiErrorPayload | null = null;
        try {
            parsed = (await response.json()) as ContactApiErrorPayload;
        } catch {
            // ignore invalid/non-JSON bodies
        }

        throw new ContactRequestError(parsed?.error ?? "Contact request failed", {
            status: response.status,
            payload: parsed ?? undefined,
        });
    }
};
