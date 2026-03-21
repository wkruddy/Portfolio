import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.email().max(254),
    message: z.string().trim().min(10).max(5000),
    company: z.string().optional().default(""),
});

export const analyticsEventSchema = z.object({
    type: z.enum(["page_view", "tab_view", "cta_click"]),
    path: z.string().min(1).max(255),
    tab: z.enum(["home", "work", "contact"]).optional(),
    meta: z.record(z.string(), z.string()).optional(),
    timestamp: z.string().optional(),
});
