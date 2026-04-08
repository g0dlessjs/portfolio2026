# Portfolio 2026 — Professional Developer Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, professional portfolio template built with React, TypeScript, Tailwind CSS, and Framer Motion. Fully config-driven — customize everything from a single file.

---

**[Español abajo](#portfolio-2026--plantilla-profesional-en-español)**

---

## Features

- **Config-driven**: All content lives in `src/config/portfolio.ts` — no need to touch component files
- **Section toggles**: Show or hide sections (About, Projects, Experience, Testimonials, Services, Contact) with simple `true`/`false` booleans
- **Framer Motion animations**: Fade-in-up, stagger children, page transitions, hover effects
- **Dark mode**: Light, dark, and system theme options
- **SEO-ready**: Dynamic meta tags, Open Graph, Twitter Cards via `react-helmet-async`
- **Responsive**: Mobile-first design that adapts to any screen size
- **Accessibility**: Keyboard navigation, `:focus-visible` styles, `prefers-reduced-motion` support

## Quick Start

### 1. Install

```bash
git clone https://github.com/your-username/portfolio-2026.git
cd portfolio-2026
npm install
```

### 2. Customize

Open `src/config/portfolio.ts` and update:

- **Personal info**: `name`, `title`, `headline`, `tagline`, `email`, `location`
- **Projects**: Title, description, tags, images, tech stack, gallery
- **Experience**: Role, company, period, description
- **Testimonials**: Name, role, quote, rating
- **Services**: Title, description, features
- **Social links**: GitHub, LinkedIn, Twitter URLs
- **Site config**: `title`, `description`, `siteUrl`, `defaultOgImage`, `googleAnalyticsId`

### 3. Section Toggles

In `src/config/portfolio.ts`, set any section to `false` to hide it:

```ts
export const sections = {
  showHero: true,
  showAbout: true,
  showProjects: true,
  showExperience: false,    // Hide Experience section
  showTestimonials: false,  // Hide Testimonials section
  showServices: false,      // Hide Services section
  showContact: true,
} as const;
```

### 4. Run

```bash
npm run dev
```

### 5. Deploy

Deploy to Vercel with zero configuration:

1. Push to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Select your repository
4. Framework preset: **Vite**
5. Click **Deploy**

Other platforms: Netlify (`netlify.toml`), GitHub Pages, Cloudflare Pages.

## Project Structure

```
src/
├── config/
│   └── portfolio.ts        ← Edit this file to customize everything
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      ← Fixed navigation bar with theme switcher
│   │   └── Footer.tsx      ← Footer with social links
│   ├── sections/
│   │   ├── Hero.tsx         ← Hero section with CTA
│   │   ├── About.tsx        ← About + tech stack
│   │   ├── Projects.tsx     ← Bento grid + all projects + detail view
│   │   ├── Experience.tsx   ← Vertical timeline
│   │   ├── Testimonials.tsx ← Quote cards grid
│   │   ├── Services.tsx     ← Service cards
│   │   └── Contact.tsx      ← Contact form + info
│   └── ui/
│       ├── Button.tsx       ← Reusable button variants
│       ├── Skeleton.tsx     ← Loading skeleton with shimmer
│       └── Input.tsx        ← Form input
├── motion/
│   └── variants.ts          ← Framer Motion presets
├── App.tsx                   ← Main app with routing
├── SEO.tsx                   ← Dynamic SEO meta tags
├── types/index.ts            ← TypeScript interfaces
└── index.css                 ← Global styles + Tailwind config
```

## Images

Replace the placeholder `picsum.photos` URLs in `config/portfolio.ts` with your own images:

- **Project cover**: `imageUrl` (recommended 1200x800)
- **Gallery**: `gallery[]` array (recommended 800x600)
- **Open Graph**: Place `og-image.jpg` in `/public` and update `site.defaultOgImage`

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion (animations)
- react-helmet-async (SEO)
- lucide-react (icons)

## Screenshots

| Light Mode | Dark Mode |
|---|---|
| ![Light](https://picsum.photos/id/180/800/500) | ![Dark](https://picsum.photos/id/119/800/500) |

---

## License

MIT. Use it for personal or commercial projects.

---

# Portfolio 2026 — Plantilla Profesional en Español

Un template de portfolio moderno construido con React, TypeScript, Tailwind CSS y Framer Motion. 100% configurable desde un solo archivo.

## Características

- **Configuración centralizada**: Todo el contenido está en `src/config/portfolio.ts`
- **Secciones opcionales**: Muestra u oculta secciones con booleanos simples
- **Animaciones Fluidas**: Transiciones de página, efecto hover, animaciones al hacer scroll
- **Modo oscuro**: Tres opciones: claro, oscuro y sistema
- **SEO integrado**: Meta tags dinámicas, Open Graph, Twitter Cards
- **Responsive**: Diseño adaptativo a cualquier pantalla
- **Accesible**: Navegación por teclado, estilos de foco, soporte para movimiento reducido

## Inicio Rápido

### 1. Instalar

```bash
git clone https://github.com/your-username/portfolio-2026.git
cd portfolio-2026
npm install
```

### 2. Personalizar

Edita `src/config/portfolio.ts`:

- **Datos personales**: nombre, título, descripción, email, ubicación
- **Proyectos**: título, descripción, tags, imágenes, stack tecnológico
- **Experiencia**: rol, empresa, período, descripción
- **Testimonios**: nombre, cargo, cita, calificación
- **Servicios**: título, descripción, características
- **Redes sociales**: URLs de GitHub, LinkedIn, Twitter
- **Configuración del sitio**: título, descripción, URL, imagen OG

### 3. Mostrar/Ocultar secciones

```ts
export const sections = {
  showHero: true,
  showAbout: true,
  showProjects: true,
  showExperience: true,
  showTestimonials: true,
  showServices: true,
  showContact: true,
} as const;
```

Cambia `true` por `false` para ocultar cualquier sección.

### 4. Ejecutar

```bash
npm run dev
```

### 5. Publicar

Despliega gratis en Vercel:

1. Sube el proyecto a GitHub
2. Ve a [vercel.com/new](https://vercel.com/new)
3. Selecciona tu repositorio
4. Preset: **Vite**
5. Click en **Deploy**

## Imágenes

Reemplaza las URLs de `picsum.photos` en `config/portfolio.ts` por tus propias imágenes:

- **Portada del proyecto**: `imageUrl` (recomendado 1200x800)
- **Galería**: `gallery[]` (recomendado 800x600)
- **Open Graph**: Coloca `og-image.jpg` en `/public` y actualiza `site.defaultOgImage`

## Tecnologías Utilizadas

React 19, TypeScript, Vite 6, Tailwind CSS v4, Framer Motion, react-helmet-async, lucide-react

---

MIT License — úsalo libremente.
