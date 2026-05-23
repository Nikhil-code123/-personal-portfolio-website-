# 🚀 Accessible Semantic Portfolio Website

A fully accessible, SEO-optimised, multi-page personal portfolio website built with pure **HTML5**, **CSS3**, and **vanilla JavaScript** — no frameworks, no build tools required.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Pages](#pages)
- [Features](#features)
- [Accessibility Highlights](#accessibility-highlights)
- [SEO Highlights](#seo-highlights)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Customisation Guide](#customisation-guide)
- [Lighthouse Optimisation Notes](#lighthouse-optimisation-notes)

---

## Overview

This portfolio is designed for frontend developers who need a **production-quality, recruiter-friendly** personal website that scores near **100 across all Google Lighthouse categories**:

| Category       | Target Score |
|----------------|:---:|
| Performance    | 💚 100 |
| Accessibility  | 💚 100 |
| Best Practices | 💚 100 |
| SEO            | 💚 100 |

---

## Pages

| File | Description |
|---|---|
| `index.html` | Home — hero, featured projects, stats |
| `about.html` | About — bio, experience timeline, education, achievements |
| `projects.html` | Projects — filterable project cards with GitHub + demo links |
| `skills.html` | Skills — animated progress bars, certifications, tools |
| `contact.html` | Contact — fully accessible form with live validation |

---

## Features

- ✅ **5-page multi-page website** with consistent navigation
- ✅ **Mobile-first responsive design** (mobile → tablet → desktop)
- ✅ **Dark / Light theme toggle** with `localStorage` persistence
- ✅ **Animated skill progress bars** triggered by Intersection Observer
- ✅ **Project filter buttons** (by technology)
- ✅ **Fully accessible contact form** with real-time validation
- ✅ **Smooth scroll** & animated section reveals
- ✅ **Sticky header** with backdrop blur
- ✅ **Hamburger navigation** for mobile with ARIA states
- ✅ **Footer** with navigation and copyright

---

## Accessibility Highlights

This site is built to meet **WCAG 2.1 Level AA** compliance:

| Feature | Implementation |
|---|---|
| Skip to content | `<a class="skip-link" href="#main-content">` |
| Heading hierarchy | Strict `h1 → h2 → h3` per page — never skipped |
| Landmark roles | `<header role="banner">`, `<main>`, `<nav>`, `<footer role="contentinfo">`, `<aside>` |
| ARIA live regions | `aria-live="polite"` on form success message |
| ARIA labels | All icon links, buttons, and inputs have descriptive `aria-label` attributes |
| `aria-current="page"` | Active nav link marked for screen readers |
| `aria-expanded` | Hamburger menu state announced to screen readers |
| `aria-invalid` | Form fields marked invalid on submission error |
| `aria-describedby` | Form fields linked to their error messages and hints |
| `aria-required` | Required form fields announced |
| Progress bar accessibility | `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` |
| Focus management | Form errors move focus to first invalid field; success message receives focus |
| Visible focus styles | `:focus-visible` with 3px `var(--color-accent)` outline on all interactive elements |
| Keyboard navigation | 100% keyboard navigable — tab, enter, escape all work |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all animations |
| Colour contrast | All text meets WCAG AA minimum 4.5:1 contrast ratio |
| Alt text | All `<img>` elements have descriptive `alt` attributes; decorative elements use `aria-hidden` |
| Breadcrumbs | `<nav aria-label="Breadcrumb">` on all inner pages |
| External links | `target="_blank"` links annotated with `(opens in new tab)` in `aria-label` |

---

## SEO Highlights

Every page includes:

- `<title>` — unique, descriptive, under 60 characters
- `<meta name="description">` — unique per page, 150–160 characters
- `<meta name="keywords">` — relevant per page
- `<link rel="canonical">` — prevents duplicate content penalties
- **Open Graph** tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- **Twitter Card** tags (`twitter:card`, `twitter:title`, etc.)
- Proper heading hierarchy — single `<h1>` per page
- Semantic HTML — `<article>`, `<section>`, `<aside>`, `<nav>`, `<header>`, `<footer>`
- `lang="en"` on `<html>` element

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Styling, layout (Flexbox + Grid), animations, custom properties |
| Vanilla JavaScript (ES6+) | Nav toggle, theme toggle, form validation, scroll animations |
| Google Fonts | Playfair Display, DM Sans, JetBrains Mono |
| Intersection Observer API | Skill bar animations, scroll reveal |
| `localStorage` | Theme preference persistence |

No npm, no bundlers, no frameworks required.

---

## Folder Structure

```
portfolio-website/
│
├── index.html          # Home page
├── about.html          # About page
├── projects.html       # Projects page
├── skills.html         # Skills page
├── contact.html        # Contact page
│
├── css/
│   └── style.css       # All styles (reset, variables, components, responsive)
│
├── js/
│   └── script.js       # All JavaScript (nav, theme, validation, animations)
│
├── images/             # Place your images here
│   └── (add og-cover.png, profile photo, etc.)
│
└── README.md           # This file
```

---

## Setup Instructions

### Option A — Open directly in browser

1. Download or clone this repository.
2. Open `index.html` in any modern browser.
3. No installation or server required.

### Option B — Local dev server (recommended)

Using VS Code with the **Live Server** extension:

1. Open the project folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

Using Node.js:

```bash
npx serve .
```

Using Python:

```bash
python -m http.server 8080
```

---

## Customisation Guide

### 1. Change your name & details

Replace all instances of `Alex Morgan` in the HTML files with your name.
Update `hello@alexmorgan.dev` with your email.

### 2. Add your profile photo

Place your photo at `images/profile.jpg`, then in `index.html` replace:

```html
<div class="photo-placeholder" role="img" aria-label="...">
  <!-- SVG placeholder -->
</div>
```

with:

```html
<img src="images/profile.jpg" alt="Your Name — Senior Frontend Developer" />
```

### 3. Update the colour theme

In `css/style.css`, edit the `:root` variables:

```css
:root {
  --color-accent: #f5a623;  /* Change to your brand colour */
}
```

### 4. Add/edit projects

Copy an `<article class="project-card">` block in `projects.html` and fill in your details.

### 5. Update skill percentages

Change `aria-valuenow` and `style="width:XX%"` on each `.skill-bar__fill` element in `skills.html`.

---

## Lighthouse Optimisation Notes

### Performance (100)
- No render-blocking resources (Google Fonts use `display=swap`)
- No JavaScript frameworks
- CSS and JS are minimal and unminified for readability — minify before production deployment
- Images should be compressed (WebP preferred) and have explicit `width`/`height`
- `<link rel="preconnect">` for Google Fonts CDN

### Accessibility (100)
- Every interactive element is keyboard-reachable and has a visible focus style
- All form elements have proper `<label>` associations
- ARIA attributes are used correctly and only where needed
- Colour contrast ratios exceed WCAG AA throughout

### Best Practices (100)
- HTTPS canonical URLs
- No deprecated HTML attributes
- All external links use `rel="noopener noreferrer"`
- `meta viewport` is set correctly

### SEO (100)
- Unique `<title>` and `<meta description>` per page
- Canonical `<link>` tags
- Open Graph and Twitter Card meta tags
- Single `<h1>` per page with natural keyword inclusion
- Descriptive anchor text (no "click here")

---

## License

MIT — free to use and modify for personal and commercial projects.

---

*Built with ❤️ and a11y in mind.*
