import { Router } from "express";
import { getEventSummary, recordEvent } from "../services/analyticsStore";
import { analyticsEventSchema } from "../utils/validation";

export const analyticsRouter = Router();

analyticsRouter.post("/events", (req, res) => {
    const parsed = analyticsEventSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "Invalid analytics payload." });
    }

    recordEvent({
        ...parsed.data,
        ip: req.ip,
        userAgent: req.get("user-agent") ?? "unknown",
        createdAt: new Date().toISOString(),
    });

    return res.status(202).json({ ok: true });
});

analyticsRouter.get("/summary", (_req, res) => {
    return res.json({ ok: true, data: getEventSummary() });
});
