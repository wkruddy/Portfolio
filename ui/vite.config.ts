import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Portfolio API: run `PORT=3001 npm run dev` in server/ (port 3000 is often taken, e.g. Open WebUI).
const apiPort = process.env.VITE_API_PORT ?? "3001";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/contact-api": {
                target: `http://localhost:${apiPort}`,
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@portfolio/app": path.resolve(__dirname, "src/packages/app"),
            "@portfolio/api": path.resolve(__dirname, "src/packages/api-service"),
            "@portfolio/common": path.resolve(__dirname, "src/packages/common"),
            "@portfolio/contact": path.resolve(__dirname, "src/packages/contact"),
            "@portfolio/home": path.resolve(__dirname, "src/packages/home"),
            "@portfolio/work": path.resolve(__dirname, "src/packages/work"),
            "@portfolio/layout": path.resolve(__dirname, "src/packages/layout"),
        },
    },
    build: {
        outDir: "dist",
    },
});
