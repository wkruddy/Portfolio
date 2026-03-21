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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");

        try {
            await APIService.submitContactForm(formData);
            setStatus("success");
            setFormData(INITIAL_FORM);
        } catch {
            setStatus("error");
        }
    };

    return {
        formData,
        status,
        handleChange,
        handleSubmit,
    };
}
