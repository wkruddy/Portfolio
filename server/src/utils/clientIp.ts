import type { Request } from "express";

export function getClientIp(req: Request): string {
    // If we're behind a proxy/CDN, prefer the first address in `X-Forwarded-For`.
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (typeof xForwardedFor === "string" && xForwardedFor.trim().length > 0) {
        return xForwardedFor.split(",")[0]?.trim() ?? req.ip ?? "unknown";
    }

    return req.ip ?? "unknown";
}
