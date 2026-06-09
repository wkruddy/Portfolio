import { Router } from "express";
import { getEventSummary, recordEvent } from "../services/analyticsStore.js";
import { analyticsEventSchema } from "../utils/validation.js";
import { getClientIp } from "../utils/clientIp.js";

export const analyticsRouter = Router();

analyticsRouter.post("/events", async (req, res) => {
    const parsed = analyticsEventSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ ok: false, error: "Invalid analytics payload." });
    }

    await recordEvent({
        ...parsed.data,
        ip: getClientIp(req),
        userAgent: req.get("user-agent") ?? "unknown",
        createdAt: new Date().toISOString(),
    });

    return res.status(202).json({ ok: true });
});

analyticsRouter.get("/summary", async (_req, res) => {
    return res.json({ ok: true, data: await getEventSummary() });
});
