import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const repoName = "ui-style-pilot";

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === "pages" ? `/${repoName}/` : "/",
}));
