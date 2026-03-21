import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@portfolio/app": path.resolve(__dirname, "src/packages/app"),
            "@portfolio/api": path.resolve(__dirname, "src/packages/app"),
            "@portfolio/common": path.resolve(__dirname, "src/packages/common"),
            "@portfolio/contact": path.resolve(__dirname, "src/packages/contact"),
            "@portfolio/home": path.resolve(__dirname, "src/packages/home"),
            "@portfolio/work": path.resolve(__dirname, "src/packages/work"),
            "@portfolio/layout": path.resolve(__dirname, "src/packages/layout"),
        },
    },
});
