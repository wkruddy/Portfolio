import { SITE_CONFIG } from "@portfolio/common";
import type { ContactFormData } from "@portfolio/contact";

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
        throw new Error("Contact request failed");
    }
};
