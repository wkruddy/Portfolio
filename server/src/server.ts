import cors from "cors";
import express from "express";
import { analyticsRouter } from "./routes/analytics";
import { contactRouter } from "./routes/contact";
import { apiRateLimiter } from "./middleware/rateLimit";
import { requestLoggerMiddleware } from "./middleware/requestLogger";
import { env } from "./utils/env";

const app = express();
const apiBasePaths = ["/api", "/contact-api/api"];

// If deployed behind a reverse proxy, `req.ip` becomes meaningful with this enabled.
app.set("trust proxy", true);

app.use(
    cors({
        origin: env.allowedOrigins,
    }),
);

app.use(express.json({ limit: "20kb" }));

app.use(requestLoggerMiddleware);

for (const basePath of apiBasePaths) {
    app.use(
        basePath,
        apiRateLimiter,
    );
}

app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "portfolio-server" });
});

app.get("/contact-api/api/health", (_req, res) => {
    res.json({ ok: true, service: "portfolio-server" });
});

for (const basePath of apiBasePaths) {
    app.use(basePath, contactRouter);
}
app.use("/api/analytics", analyticsRouter);

app.listen(env.port, () => {
    console.log(`Portfolio server listening on port ${env.port}`);
});
