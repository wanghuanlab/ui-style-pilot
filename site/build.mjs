import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const siteRoot = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(siteRoot, "dist");

marked.setOptions({ gfm: true });

fs.mkdirSync(distDir, { recursive: true });

fs.copyFileSync(path.join(siteRoot, "landing.html"), path.join(distDir, "index.html"));
fs.copyFileSync(path.join(siteRoot, "styles.css"), path.join(distDir, "styles.css"));

const guideMarkdown = fs.readFileSync(path.join(siteRoot, "ADOPTION_GUIDE.zh-CN.md"), "utf8");
const guideBody = marked.parse(guideMarkdown);
const guideTemplate = fs.readFileSync(path.join(siteRoot, "guide-template.html"), "utf8");
const guideHtml = guideTemplate.replace("{{CONTENT}}", guideBody);

fs.writeFileSync(path.join(distDir, "adoption-guide.html"), guideHtml);

console.log("Site built:");
console.log("  site/dist/index.html");
console.log("  site/dist/adoption-guide.html");
