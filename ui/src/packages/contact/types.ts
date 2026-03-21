export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    company: string;
}

export type ContactStatus = "idle" | "loading" | "success" | "error";
