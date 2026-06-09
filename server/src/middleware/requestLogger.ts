import type { NextFunction, Request, Response } from "express";
import { getClientIp } from "../utils/clientIp.js";
import { recordEvent } from "../services/analyticsStore.js";

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // For `fetch` from the browser, IP may not be meaningful; still helpful for proxied deployments.
    const clientIp = getClientIp(req);

    res.on("finish", () => {
        // eslint-disable-next-line no-console
        console.log(
            `${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms) ip=${clientIp}`,
        );

        // Record high-level traffic for non-health API requests.
        if (!req.path.endsWith("/health")) {
            void recordEvent({
                type: "page_view",
                path: req.path.slice(0, 255),
                ip: clientIp,
                userAgent: req.get("user-agent") ?? "unknown",
                createdAt: new Date().toISOString(),
            });
        }
    });

    next();
}
