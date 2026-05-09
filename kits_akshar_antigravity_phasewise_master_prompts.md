# KITS Akshar — AniGravity Enterprise Build System
## Phase-Wise Master Prompts for Full Application Development
### Stack: React.js + Node.js + Express.js + PostgreSQL

---

# MASTER SYSTEM DIRECTIVE

You are building an enterprise-grade immersive institutional platform for KITS Akshar.

This is NOT a normal React college website.

The platform must function as:

# “A Fully Dynamic Visual Content Operating System”

All pages, sections, menus, departments, notifications, events, galleries, placements, and layouts must render dynamically from PostgreSQL-driven schemas.

NEVER hardcode:
- navbar items
- submenus
- homepage sections
- footer links
- department pages
- notifications
- faculty data
- events
- placements
- SEO metadata

Everything must be:
- reusable
- schema-driven
- CMS-controlled
- API-driven
- dynamically rendered

Tech Stack:
- React.js
- Vite
- TailwindCSS
- Framer Motion
- GSAP ScrollTrigger
- Lenis
- Zustand
- React Query
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

Design Identity:
“Dark Academia meets Silicon Valley”

Visual Style:
- premium
- cinematic
- institutional
- immersive
- modern
- technologically advanced

Animation Philosophy:
“AniGravity”

Meaning:
Every element FALLS into place.
No bounce.
No overshoot.
No playful motion.
Only gravitational easing.

Animation Rules:
- opacity: 0 → 1
- y: 30px → 0
- scale: 0.96 → 1
- duration: 0.65s–0.8s
- ease: cubic-bezier(0.16,1,0.3,1)

Global Requirements:
- mobile-first
- enterprise-grade architecture
- GPU-safe animations
- accessibility compliance
- reusable components
- schema-driven rendering
- scalable CMS architecture
- optimized performance
- modular backend

---

# PHASE 01 — FOUNDATION + CORE ENGINE

## OBJECTIVE

Build the complete application foundation including:
- design system
- app shell
- animation engine
- authentication system
- dynamic rendering architecture
- dynamic navbar engine
- admin foundation
- API structure
- PostgreSQL schema

---

# FRONTEND TASKS

## Setup React Architecture

Create:

```text
src/
 ├── components/
 │    ├── ui/
 │    ├── layout/
 │    ├── renderer/
 │    ├── sections/
 │
 ├── pages/
 ├── hooks/
 ├── stores/
 ├── services/
 ├── animations/
 ├── config/
```

---

# DESIGN SYSTEM

Create complete Tailwind design token architecture.

Colors:
- kits-black: #080810
- kits-navy: #0D1B2A
- kits-gold: #C9A84C
- kits-white: #F0EDE6
- kits-gray: #6B6F80

Typography:
- Clash Display Variable
- Satoshi Variable
- JetBrains Mono

Create:
- spacing scale
- border radius system
- shadow system
- glassmorphism utilities
- gold accent utilities

---

# ANIMATION ENGINE

Create:

```text
src/utils/animations.js
```

Export:
- GRAVITY_IN
- STAGGER
- SLIDE_LEFT
- SLIDE_RIGHT
- SCALE_IN
- FADE_UP

All animations must use:
- transform
- opacity

Avoid layout-affecting animations.

---

# LENIS + GSAP INTEGRATION

Setup:
- Lenis smooth scrolling
- GSAP ticker synchronization
- requestAnimationFrame optimization
- scroll restoration
- resize refresh handling

Performance Requirements:
- no scroll jitter
- no layout thrashing
- mobile-safe rendering

---

# APP SHELL

Create:
- Dynamic Navbar
- Page Loader
- Custom Cursor
- Footer
- Route Transitions
- Global Providers

---

# DYNAMIC NAVIGATION ENGINE

Navbar must render dynamically from PostgreSQL.

Database Tables:

```text
menus
menu_items
```

Features:
- nested submenus
- mega menus
- dynamic department links
- drag/drop sorting
- footer navigation
- visibility toggles

API:

```text
GET /api/navigation/main
```

Frontend renders dynamically.

No hardcoded nav items.

---

# DYNAMIC RENDERING ENGINE

Create:

```text
src/components/renderer/SectionRenderer.jsx
```

Use schema-driven rendering.

Example:

```jsx
const SECTION_COMPONENTS = {
  hero: HeroSection,
  stats: StatsSection,
  gallery: GallerySection,
  placements: PlacementsSection,
}
```

Sections render dynamically from database JSON.

---

# BACKEND TASKS

Setup:
- Express server
- Prisma ORM
- PostgreSQL connection
- JWT authentication
- RBAC authorization
- Zod validation

Folder Structure:

```text
backend/
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── prisma/
 ├── validations/
 ├── services/
```

---

# CORE DATABASE TABLES

```text
users
roles
permissions
menus
menu_items
pages
page_sections
section_types
notifications
```

---

# PHASE 02 — DYNAMIC CONTENT SYSTEMS

## OBJECTIVE

Build all dynamic institutional systems.

---

# DYNAMIC HOMEPAGE BUILDER

Admins must:
- add sections
- remove sections
- reorder sections
- duplicate sections
- configure animations
- enable/disable sections

Homepage must render dynamically.

No hardcoded layouts.

Database:

```text
pages
page_sections
```

API:

```text
GET /api/pages/home
```

---

# HERO SECTION

Build immersive cinematic hero.

Features:
- Three.js particle background
- animated typography
- smooth scroll parallax
- statistics strip
- CTA animations
- GPU-safe rendering

Animations:
- gravitational motion only
- no bounce
- no excessive effects

---

# ABOUT SECTION

Features:
- institutional storytelling
- campus video
- motion-based reveals
- stagger animations
- responsive layout

---

# DYNAMIC DEPARTMENT GENERATOR

Admin creates department once.

System auto-generates:
- department homepage
- faculty section
- labs
- achievements
- placements
- syllabus
- gallery
- notifications

Database:

```text
departments
department_sections
faculty
labs
```

---

# DYNAMIC FACULTY SYSTEM

Features:
- faculty cards
- specialization
- publications
- social links
- department association

---

# WHY KITS SECTION

Build immersive institutional USP section.

Features:
- animated cards
- hover interactions
- icon system
- stagger reveals

---

# PHASE 03 — IMMERSIVE ENTERPRISE MODULES

## OBJECTIVE

Build all immersive institutional feature modules.

---

# PLACEMENTS SYSTEM

Features:
- placement analytics
- recruiter showcases
- placement statistics
- student success stories
- salary charts
- company logos

Database:

```text
placements
recruiters
```

API:

```text
GET /api/placements
```

---

# EVENTS SYSTEM

Features:
- event timeline
- categories
- registrations
- countdown timers
- downloadable brochures
- event galleries

Database:

```text
events
```

---

# DYNAMIC NOTIFICATIONS SYSTEM

Features:
- sticky ticker
- popup alerts
- department notices
- emergency notifications
- expiry automation
- scheduling

Database:

```text
notifications
```

---

# CAMPUS GALLERY SYSTEM

Features:
- masonry layout
- lightbox
- lazy loading
- optimized rendering
- motion-based parallax

Database:

```text
galleries
media_assets
```

---

# ALUMNI SYSTEM

Features:
- alumni profiles
- global placements
- success stories
- testimonials
- company associations

---

# TESTIMONIAL SYSTEM

Features:
- animated testimonials
- auto-rotation
- motion transitions
- responsive carousel

---

# PHASE 04 — ENTERPRISE FINALIZATION

## OBJECTIVE

Production optimization and enterprise stabilization.

---

# SEO SYSTEM

Using:
- React Helmet Async
- JSON-LD
- dynamic metadata
- prerendering

Database:

```text
seo_metadata
```

Features:
- dynamic page titles
- OG images
- schema markup
- canonical URLs

---

# PERFORMANCE ENGINEERING

Implement:
- code splitting
- React lazy loading
- image optimization
- Cloudinary transforms
- React Query caching
- optimized animations

Requirements:
- Lighthouse > 90
- excellent Core Web Vitals
- no mobile lag

---

# SECURITY ARCHITECTURE

Implement:
- Helmet
- CORS
- JWT auth
- RBAC
- rate limiting
- sanitization
- upload validation
- Zod validation

---

# CMS FINALIZATION

Admin CMS must support:
- visual page builder
- drag/drop sections
- dynamic menus
- notifications management
- media uploads
- SEO management
- department management
- placement management
- event management

---

# FINAL DATABASE STRUCTURE

```text
users
roles
permissions

menus
menu_items

pages
page_sections
section_types

notifications

seo_metadata

departments
department_sections
faculty
labs

placements
recruiters

alumni

events
news

galleries
media_assets

theme_settings
```

---

# FINAL SYSTEM REQUIREMENTS

The final platform must:
- render dynamically
- support enterprise scalability
- provide immersive experiences
- maintain high performance
- support multi-admin workflows
- remain fully customizable
- preserve accessibility
- support future expansion

The final product should feel comparable to:
- modern international universities
- premium technology brands
- immersive institutional ecosystems

This project is NOT:
“A React College Website”

This project IS:

# “A Fully Dynamic Institutional Visual Content Operating System”

