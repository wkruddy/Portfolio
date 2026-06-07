import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { error: "Please enter your full name— or at least 2 characters." })
        .max(100, {
            error: "Whoa! Your name is too long, sorry. Please keep it under 100 characters.",
        }),

    email: z
        .email({ error: "Please enter a valid email address, like you@somewhere.com." })
        .max(254, { error: "That email is crazy long! Please use a shorter one." }),

    message: z
        .string()
        .trim()
        .min(10, { error: "Your message is a little short. Please add a bit more detail." })
        .max(5000, {
            error: "Your message is too long. Please shorten it to under 5000 characters",
        }),

    company: z.string().optional().default(""),
});

export const analyticsEventSchema = z.object({
    type: z.enum(["page_view", "tab_view", "cta_click"]),
    path: z.string().min(1).max(255),
    tab: z.enum(["home", "work", "contact"]).optional(),
    meta: z.record(z.string(), z.string()).optional(),
    timestamp: z.string().optional(),
});
