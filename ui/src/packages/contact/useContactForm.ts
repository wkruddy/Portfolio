import { APIService } from "@portfolio/api";
import { useState } from "react";
import type { ContactFormData, ContactStatus } from "./types";

const INITIAL_FORM: ContactFormData = {
    name: "",
    email: "",
    message: "",
    company: "",
};

export function useContactForm() {
    const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
    const [status, setStatus] = useState<ContactStatus>("idle");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });
        if (formError) setFormError(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setFieldErrors({});
        setFormError(null);

        try {
            await APIService.submitContactForm(formData);
            setStatus("success");
            setFieldErrors({});
            setFormError(null);
            setFormData(INITIAL_FORM);
        } catch (err) {
            setStatus("error");
            if (err instanceof APIService.ContactRequestError) {
                setFormError(err.payload?.error ?? "Please fix the highlighted fields.");
                setFieldErrors(err.payload?.fieldErrors ?? {});
                return;
            }
            setFormError("Something went wrong. Please try again.");
        }
    };

    return {
        formData,
        status,
        fieldErrors,
        formError,
        handleChange,
        handleSubmit,
    };
}
