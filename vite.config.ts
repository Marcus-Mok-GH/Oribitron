import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Freebuff injects PORT for the managed preview; fall back to Vite's default.
const port = Number(process.env.PORT) || 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port,
    // Freebuff requires HMR to remain disabled.
    hmr: false,
  },
});
