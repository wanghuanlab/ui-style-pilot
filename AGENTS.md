# AGENTS.md

This file defines repository-wide collaboration rules for AI coding agents and human contributors.

## Project Purpose

UI Style Pilot is an open-source starter kit for AI-assisted frontend style governance. It helps teams keep AI-generated UI aligned with shared standards, reusable components, interaction patterns, and review checklists.

## Required Context

Before changing documentation standards, AI skill definitions, or example app behavior, read:

- `README.md`
- `docs/frontend-standards/USAGE.md`
- `docs/frontend-standards/README.md`
- `docs/frontend-standards/09-review-checklist.md`

Before changing the Vite/Vue preview app, also inspect:

- `src/App.vue`
- `src/styles.css`
- `package.json`

## Documentation Policy

- Keep reusable project rules in `docs/frontend-standards/`.
- Keep AI skill definitions in `docs/ai-skills/`.
- Keep GitHub Pages site sources in `site/`.
- Keep product-specific examples clearly marked as examples or templates.
- Do not bury operational rules inside the preview app.
- Prefer concise, actionable docs over long conceptual prose.

## Frontend Policy

- This project uses Vite + Vue 3 + TypeScript.
- Keep the preview app lightweight and dependency-minimal.
- Use design tokens from `src/styles.css`.
- Do not add UI libraries unless the example explicitly needs them.
- Keep the preview app as a documentation browser, not a full product dashboard.

## Package Manager Policy

Use npm for this project.

- Install dependencies with `npm install`.
- Start the local dev server with `npm run dev`.
- Build with `npm run build`.

Do not commit generated `dist/` output.

## Verification

Prefer these checks before handoff:

```bash
npm run build
```

If dependencies are not installed, at least verify file structure and TypeScript/Vite config consistency.
