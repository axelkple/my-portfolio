import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you deploy to GitHub Pages at username.github.io/repo-name/,
// add:  base: "/repo-name/"
export default defineConfig({
  plugins: [react()],
});
