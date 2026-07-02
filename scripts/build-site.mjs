import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteDir = path.join(root, "_site");

marked.setOptions({ gfm: true });

fs.mkdirSync(siteDir, { recursive: true });

fs.copyFileSync(path.join(root, "docs/landing.html"), path.join(siteDir, "index.html"));

const guideMarkdown = fs.readFileSync(path.join(root, "ADOPTION_GUIDE.zh-CN.md"), "utf8");
const guideBody = marked.parse(guideMarkdown);
const guideTemplate = fs.readFileSync(path.join(root, "docs/guide-template.html"), "utf8");
const guideHtml = guideTemplate.replace("{{CONTENT}}", guideBody);

fs.writeFileSync(path.join(siteDir, "adoption-guide.html"), guideHtml);

console.log("Site built:");
console.log("  _site/index.html");
console.log("  _site/adoption-guide.html");
