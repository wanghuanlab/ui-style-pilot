<script setup lang="ts">
const standards = [
  {
    title: "Usage Guide",
    path: "docs/frontend-standards/USAGE.md",
    text: "A practical onboarding guide for new team members and AI-assisted development.",
  },
  {
    title: "Frontend Standards",
    path: "docs/frontend-standards/README.md",
    text: "The main entry for tokens, layout rules, component rules, and review checklists.",
  },
  {
    title: "Component Inventory",
    path: "docs/frontend-standards/10-component-inventory.md",
    text: "A reusable-component-first map that prevents one-off UI implementations.",
  },
  {
    title: "Form Rules",
    path: "docs/frontend-standards/05-form-rules.md",
    text: "Rules for consistent labels, colons, spacing, readonly fields, and form actions.",
  },
  {
    title: "Component Patterns",
    path: "docs/frontend-standards/components/",
    text: "Documented Usp-style component patterns for reuse across pages, teams, and agents.",
  },
  {
    title: "AI Skills",
    path: "docs/ai-skills/frontend/",
    text: "Skill definitions for page building, design review, component reuse, and style migration.",
  },
];

const workflow = [
  "Read the standards before designing or coding.",
  "Search existing shared components before creating new UI.",
  "Use page templates to choose the right structure.",
  "Avoid inline styles and hardcoded visual values.",
  "Review every change with the checklist before handoff.",
];
</script>

<template>
  <main class="app-shell">
    <section class="hero">
      <p class="eyebrow">AI-assisted UI governance</p>
      <h1>UI Style Pilot</h1>
      <p class="hero-copy">
        A lightweight open-source starter for keeping AI-generated frontend work aligned with
        shared UI standards, component reuse, and review workflows.
      </p>
      <div class="hero-actions">
        <a href="https://github.com/wanghuanlab/ui-style-pilot" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
        <a
          class="secondary"
          href="https://wanghuanlab.github.io/ui-style-pilot/"
          target="_blank"
          rel="noreferrer"
        >
          Open live site
        </a>
      </div>
    </section>

    <section class="panel">
      <div class="section-heading">
        <p class="eyebrow">What is inside</p>
        <h2>Standards as working material</h2>
      </div>
      <div class="card-grid">
        <article v-for="item in standards" :key="item.title" class="card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <code>{{ item.path }}</code>
        </article>
      </div>
    </section>

    <section class="workflow">
      <div class="section-heading">
        <p class="eyebrow">Default workflow</p>
        <h2>Make consistency the path of least resistance</h2>
      </div>
      <ol>
        <li v-for="step in workflow" :key="step">{{ step }}</li>
      </ol>
    </section>
  </main>
</template>
