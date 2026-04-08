<div align="center">

# 👋 Hola, soy Juan Galarce

[![GitHub stars](https://img.shields.io/github/stars/g0dlessjs/portfolio2026?style=for-the-badge)](https://github.com/g0dlessjs/portfolio2026/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/g0dlessjs/portfolio2026?style=for-the-badge)](https://github.com/g0dlessjs/portfolio2026/network)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![CI](https://github.com/g0dlessjs/portfolio2026/actions/workflows/ci.yml/badge.svg)](https://github.com/g0dlessjs/portfolio2026/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/g0dlessjs/portfolio2026/branch/main/graph/badge.svg)](https://codecov.io/gh/g0dlessjs/portfolio2026)

</div>

---

**Desarrollador Full Stack Junior** apasionado por crear experiencias digitales excepcionales. Especializado en React, TypeScript y desarrollo web moderno con enfoque en rendimiento, accesibilidad y diseño minimalista.

**Desarrollador Full Stack Junior** apasionado por crear experiencias digitales excepcionales. Especializado en React, TypeScript y desarrollo web moderno con enfoque en rendimiento, accesibilidad y diseño minimalista.

---

## 🚀 **Portfolio 2026**

Este es mi portfolio profesional construido con las tecnologías más modernas del ecosistema React. Una aplicación de una sola página (SPA) que showcases mis proyectos, habilidades, experiencia y servicios.

### ✨ **Características Principales**

- 🎨 **Diseño Premium**: UI minimalista con Tailwind CSS y sistema de diseño personalizado
- 🎭 **Animaciones Suaves**: Framer Motion para transiciones elegantes
- 🌍 **Internacionalización**: Soporte completo para Español e Inglés
- 📱 **Totalmente Responsivo**: Optimizado para todos los dispositivos
- ♿ **Accesible**: Cumple con mejores prácticas WCAG
- 🎯 **SEO Optimizado**: React Helmet Async para metaetiquetas dinámicas
- ⚡ **Máximo Rendimiento**: Vite + code splitting automático

---

## 🛠️ **Stack Tecnológico**

### **Core**
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite 6** - Build tool ultra rápido

### **Estilo & Animación**
- **Tailwind CSS 4** - Framework utility-first
- **Framer Motion 12** - Animaciones avanzadas
- **Lucide React** - Iconos consistentes

### **Herramientas de Desarrollo**
- **Vitest** - Testing framework
- **React Testing Library** - Tests de componentes
- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **Husky** + **lint-staged** - Git hooks

### **Despliegue**
- **Vercel** - Hosting + CI/CD automático
- **GitHub Actions** - Pipeline de integración continua

---

## 📋 **Tabla de Contenidos**

- [🚀 Getting Started](#-getting-started)
- [🧪 Testing](#-testing)
- [📝 Linting & Formatting](#-linting--formatting)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🔄 CI/CD](#-cicd)
- [📦 Dependencias](#-dependencias)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)

---

## 🚀 **Getting Started**

### **Prerrequisitos**

- Node.js 18+ ([Descargar](https://nodejs.org/))
- npm o yarn
- Git

### **Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/g0dlessjs/portfolio2026.git
   cd portfolio2026
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   - Copia `.env.local` (si existe) o crea uno con:
     ```env
     GEMINI_API_KEY=tu_clave_aqui
     ```
   - Nota: Esta variable es opcional si no usas funcionalidades de IA

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La app estará disponible en `http://localhost:3000`

---

## 🧪 **Testing**

Este proyecto incluye tests unitarios e integración con **Vitest** y **React Testing Library**.

### **Ejecutar Tests**

```bash
# Modo watch (desarrollo)
npm test

# Una sola vez
npm test -- --run

# Con UI interactiva
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

### **Cobertura Actual**

- **94.44%** de cobertura de statements
- Componentes testeados: Button, Footer, Hero, LanguageContext
- Tests de integración useContext y navegación

---

## 📝 **Linting & Formatting**

### **ESLint**

Reglas estrictas para TypeScript + React:

```bash
# Revisar código
npm run lint

# Auto-corregir errores
npm run lint:fix
```

### **Prettier**

Formateo consistente en todo el código:

```bash
# Formatear todos los archivos
npm run format

# Verificar formato sin modificar
npm run format:check
```

### **Husky + lint-staged**

Cada commit automáticamente:
1. Ejecuta ESLint en archivos staged
2. Aplica Prettier
3. Falla si hay errores no corregibles

*Esto asegura que todo código en el repo cumple los estándares.*

---

## 🔧 **Scripts Disponibles**

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción |
| `npm run preview` | Preview local del build |
| `npm test` | Tests en watch mode |
| `npm run test:ui` | Tests con interfaz visual |
| `npm run test:coverage` | Reporte de cobertura HTML |
| `npm run lint` | Revisar código con ESLint |
| `npm run lint:fix` | Auto-corregir problemas |
| `npm run format` | Formatear todos los archivos |
| `npm run format:check` | Verificar formato |

---

## 🏗️ **Estructura del Proyecto**

```
portfolio-2026/
├── public/                    # Archivos estáticos
│   └── favicon.svg
├── src/
│   ├── components/            # Componentes React
│   │   ├── layout/           # Navbar, Footer
│   │   ├── sections/         # Secciones de la página
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/               # Componentes UI reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── CustomCursor.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── SEO.tsx
│   ├── context/              # React Context
│   │   └── LanguageContext.tsx  # Internacionalización
│   ├── config/               # Configuraciones
│   │   └── portfolio.ts      # Datos del portfolio
│   ├── motion/               # Variantes de animación
│   │   └── variants.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── test/                 # Configuración de tests
│   │   └── setup.ts
│   ├── App.tsx               # Componente principal
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales + Tailwind
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions CI
├── .husky/                   # Git hooks
├── .eslintrc.json            # Configuración ESLint
├── .prettierrc.js            # Configuración Prettier
├── .lintstagedrc.json        # Config lint-staged
├── tailwind.config.js        # Configuración Tailwind
├── vite.config.ts            # Configuración Vite + Vitest
├── vercel.json               # Configuración Vercel
├── tsconfig.json             # Configuración TypeScript
└── package.json              # Dependencias y scripts
```

---

## 🔄 **CI/CD**

### **GitHub Actions**

Pipeline de integración continua que se ejecuta en cada push/PR a `main`:

1. **Job: test**
   - Type checking con TypeScript
   - Tests unitarios con Vitest
   - Cobertura de código
   - Upload a Codecov

2. **Job: build**
   - Build de producción
   - Verifica que no hay errores de build
   - Guarda artefacto

### **Vercel**

- **Automatic Deployments**: Cada push a `main` despliega automáticamente
- **Preview Deployments**: Cada PR genera una URL de preview
- **Rollback**: Capacidad de revertir a cualquier deploy anterior

**URL Producción**: https://portfolio2026-orpin.vercel.app

---

## 📦 **Dependencias Principales**

### **Producción**

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | ^19.2.0 | Biblioteca UI |
| react-dom | ^19.2.0 | Renderizado DOM |
| framer-motion | ^12.38.0 | Animaciones |
| lucide-react | ^0.555.0 | Iconos |
| react-helmet-async | ^3.0.0 | SEO |

### **Desarrollo**

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| vite | ^6.2.0 | Build tool |
| typescript | ~5.8.2 | Lenguaje |
| vitest | ^4.1.3 | Testing |
| @testing-library/react | ^16.3.2 | Tests React |
| tailwindcss | ^4.1.17 | Estilos |
| eslint | ^8.57.1 | Linting |
| prettier | ^3.8.1 | Formateo |
| husky | ^9.1.7 | Git hooks |
| lint-staged | ^16.4.0 | Pre-commit |

*(Ver package.json para lista completa)*

---

## 🗺️ **Roadmap / Mejoras Futuras**

- [ ] **Tests E2E** con Playwright o Cypress
- [ ] **i18n completo** con más idiomas
- [ ] **Blog integrado** con MDX
- [ ] **Formulario de contacto** funcional (backend)
- [ ] **Analytics** (Google Analytics / Plausible)
- [ ] **Performance monitoring** (Sentry)
- [ ] **PWA support** (offline capability)
- [ ] **RSS feed** para proyectos
- [ ] **Admin panel** para gestionar contenido

---

## 🤝 **Contribuciones**

Este es un proyecto personal de portfolio. Sin embargo, si encuentras bugs o tienes sugerencias:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Asegúrate de:
- ✅ Todos los tests pasan
- ✅ Código formateado con Prettier
- ✅ Sin errores de ESLint
- ✅ Cobertura no disminuye

---

## 📄 **Licencia**

[MIT](LICENSE) - Siéntete libre de usar este código como referencia para tu propio portfolio.

---

## 📞 **Contacto**

**Juan Galarce**  
📧 hola@juangalarce.dev  
🌐 https://juangalarce.dev  
🐙 [github.com/g0dlessjs](https://github.com/g0dlessjs)  
💼 [linkedin.com/in/juangalarce](https://linkedin.com/in/juangalarce)

---

## 🙏 **Agradecimientos**

- [Vite](https://vitejs.dev/) - Build tool increíblemente rápido
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos
- [Framer Motion](https://www.framer.com/motion/) - Animaciones elegantes
- [Lucide](https://lucide.dev/) - Iconos hermosos
- [Vercel](https://vercel.com/) - Hosting y CI/CD

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

---

## 📊 **Estadísticas del Proyecto**

<div align="center">

| Métrica | Valor |
|---------|-------|
| **Tests** | [![Tests](https://img.shields.io/badge/tests-26-brightgreen)](https://github.com/g0dlessjs/portfolio2026/actions) |
| **Cobertura** | [![Coverage](https://img.shields.io/badge/coverage-94.44%25-green)](https://github.com/g0dlessjs/portfolio2026/actions) |
| **Build** | [![Build](https://github.com/g0dlessjs/portfolio2026/actions/workflows/ci.yml/badge.svg)](https://github.com/g0dlessjs/portfolio2026/actions/workflows/ci.yml) |
| **Linting** | ✅ ESLint + Prettier |
| **Deploy** | [![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://portfolio2026-orpin.vercel.app) |

**Stack completo**: React 19 + TypeScript + Tailwind CSS + Vite + Framer Motion

</div>

---

*Última actualización: Abril 2026*
