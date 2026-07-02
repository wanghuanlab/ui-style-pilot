# GitHub Pages Site

This folder contains the promotional site published to GitHub Pages. It is separate from `docs/frontend-standards/` and `docs/ai-skills/`.

## Files

| File | Purpose |
|---|---|
| `landing.html` | Homepage source, published as `index.html` |
| `guide-template.html` | HTML shell for the adoption guide |
| `ADOPTION_GUIDE.zh-CN.md` | Adoption guide source, published as `adoption-guide.html` |
| `build.mjs` | Build script |
| `dist/` | Generated output (gitignored) |

## Commands

```bash
npm run build:site
```

Open `site/dist/index.html` or `site/dist/adoption-guide.html` in a browser after building.
