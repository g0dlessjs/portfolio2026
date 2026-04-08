# 🚀 Guía de Personalización del Portfolio Professional 2026

¡Gracias por adquirir esta plantilla! Ha sido diseñada con **React 19**, **Tailwind v4** y **Framer Motion** para ofrecer una experiencia ultra-premium y fácil de mantener.

## 🛠️ Configuración Rápida (Sin tocar código JSX)

Todo el contenido del sitio se gestiona desde un único archivo central:
`src/config/portfolio.ts`

### 1. Datos Personales
Busca el objeto `profile` para cambiar tu nombre, rol, bio y ubicación:
```typescript
export const profile = {
  name: "Tu Nombre",
  brandName: "Tu.Marca", // Usado en el Logo
  role: "Tu Especialidad",
  email: "tu@email.com",
  // ...
};
```

### 2. Formulario de Contacto Funcional
Esta plantilla incluye integración con **Web3Forms** (gratis y sin backend).
1. Crea una cuenta en [Web3Forms](https://web3forms.com/).
2. Copia tu `Access Key`.
3. Pégalo en el objeto `contactForm` dentro de `portfolio.ts`.

### 3. Gestionar Secciones
¿Quieres ocultar los Testimonios o los Servicios? Simplemente cambia el valor a `false` en el objeto `sections`:
```typescript
export const sections = {
  showTestimonials: false, // ¡Desaparecerá de la web y del menú!
  // ...
};
```

### 4. Proyectos y Archivo
Añade tus proyectos al array `projects`. Cada proyecto soporta:
- `size`: "large" (2x2 en el grid) o "medium" (1x1).
- `techStack`: Desglose detallado por categorías (Frontend, Backend, etc.).
- `challenge/solution/result`: Para generar casos de estudio automáticos.

## 🚀 Despliegue (Deployment)

1. **Instalar dependencias:** `npm install`
2. **Previsualizar local:** `npm run dev`
3. **Construir para producción:** `npm run build`

Sube la carpeta `dist` resultante a **Vercel**, **Netlify** o **GitHub Pages**.

---
*Diseñado con ❤️ para desarrolladores de alto nivel.*
