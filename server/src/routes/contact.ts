import { Router } from "express";
import { resend } from "../services/resend";
import { env } from "../utils/env";
import { contactSchema } from "../utils/validation";

export const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: "Please fix the highlighted fields.",
            fieldErrors: parsed.error.issues.reduce<Record<string, string>>((acc, issue) => {
                const field = issue.path[0];
                if (typeof field === "string" && !acc[field]) {
                    acc[field] = issue.message;
                }
                return acc;
            }, {}),
        });
    }

    const { name, email, message, company } = parsed.data;

    if (company) {
        return res.status(200).json({ ok: true });
    }

    const result = await resend.emails.send({
        from: env.contactFromEmail,
        to: [env.contactToEmail],
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
        <div>
            <h2>Portfolio contact</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap;">${message}</div>
        </div>
        `,
    });

    if (result.error) {
        return res.status(502).json({ ok: false, error: "Email delivery failed." });
    }

    return res.json({ ok: true });
});
