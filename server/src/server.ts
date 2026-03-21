import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { analyticsRouter } from "./routes/analytics";
import { contactRouter } from "./routes/contact";
import { env } from "./utils/env";

const app = express();

app.use(
    cors({
        origin: env.allowedOrigins,
    }),
);

app.use(express.json({ limit: "20kb" }));

app.use(
    "/api",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false,
    }),
);

app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "portfolio-server" });
});

app.use("/api", contactRouter);
app.use("/api/analytics", analyticsRouter);

app.listen(env.port, () => {
    console.log(`Portfolio server listening on port ${env.port}`);
});
