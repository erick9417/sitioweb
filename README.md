# 🦶 Plantillas Ortopédicas Premium

Sitio web moderno y premium para plantillas ortopédicas, diseñado con las últimas tecnologías web y animaciones sofisticadas al estilo Figma.

## ✨ Características

### Diseño Premium
- **Único y llamativo**: Diseño completamente personalizado, alejado de plantillas WordPress genéricas
- **Animaciones fluidas**: Powered by Framer Motion, con efectos similares a Figma
- **Gradientes modernos**: Paleta de colores profesional con degradados suaves
- **Micro-interacciones**: Cada elemento responde de forma elegante a las acciones del usuario

### Secciones Implementadas
1. **Hero Section**: Presentación impactante con animaciones de fondo y estadísticas
2. **Features**: Características destacadas con iconos animados
3. **Products**: Catálogo de productos con efecto 3D y parallax
4. **Benefits**: Beneficios premium con estadísticas animadas
5. **Testimonials**: Testimonios de clientes con diseño moderno
6. **Contact**: Formulario de contacto con información completa

### Tecnologías
- **Next.js 16**: Framework React de última generación con App Router
- **TypeScript**: Tipado estático para código más robusto
- **Tailwind CSS**: Estilos utility-first para diseño rápido y consistente
- **Framer Motion**: Biblioteca líder en animaciones para React
- **Lucide React**: Iconos modernos y personalizables

## 🚀 Inicio Rápido

### Instalar dependencias
```bash
npm install
```

### Ejecutar servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilar para producción
```bash
npm run build
npm start
```

## 🎨 Personalización

### Colores
Los colores principales se pueden ajustar en los componentes individuales. La paleta actual usa:
- **Primario**: Púrpura (#9333ea) a Rosa (#ec4899)
- **Secundario**: Azul (#3b82f6) a Cian (#06b6d4)
- **Acentos**: Verde esmeralda, amarillo, naranja

### Fuentes
Se utilizan fuentes de Google Fonts:
- **Inter**: Para texto general (moderna y legible)
- **Playfair Display**: Para títulos (elegante y premium)

### Contenido
Edita los archivos en `/components` para modificar:
- Textos y descripciones
- Productos y precios
- Testimonios
- Información de contacto

## 📁 Estructura del Proyecto

```
sitioweb/
├── app/
│   ├── layout.tsx          # Layout principal con fuentes
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── Hero.tsx            # Sección héroe
│   ├── Features.tsx        # Características
│   ├── Products.tsx        # Productos
│   ├── Benefits.tsx        # Beneficios
│   ├── Testimonials.tsx    # Testimonios
│   └── Contact.tsx         # Contacto
└── public/                 # Recursos estáticos
```

## 🎯 Animaciones Destacadas

- **Scroll-triggered**: Las secciones aparecen con animación al hacer scroll
- **Hover effects**: Elementos interactivos con efectos sofisticados
- **Parallax**: Movimiento de fondo según el scroll
- **3D transforms**: Rotaciones y transformaciones en tarjetas
- **Gradient animations**: Gradientes animados en backgrounds
- **Micro-interactions**: Botones, iconos y elementos con feedback visual

## 🌐 Optimización

- **SEO optimizado**: Metadata y estructura semántica
- **Performance**: Lazy loading y optimización de imágenes
- **Responsive**: Adaptado a todos los dispositivos
- **Accesibilidad**: Cumple estándares WCAG

## 📝 Próximos Pasos Sugeridos

1. **Agregar imágenes reales**: Reemplaza los gradientes de productos con fotos profesionales
2. **Integrar CMS**: Conectar con Sanity, Contentful o similar para gestión de contenido
3. **E-commerce**: Añadir carrito de compras con Stripe/PayPal
4. **Blog**: Sección de artículos sobre salud postural
5. **Sistema de citas**: Integración con calendario para asesorías
6. **Dashboard de usuario**: Portal para clientes registrados

## 💡 Notas Técnicas

Este sitio está construido con tecnologías modernas que permiten:
- ✅ Animaciones complejas sin afectar el rendimiento
- ✅ Código mantenible y escalable con TypeScript
- ✅ Desarrollo rápido con Tailwind CSS
- ✅ SEO y performance optimizados con Next.js
- ✅ Deploy sencillo en Vercel, Netlify u otros

**Este NO es un sitio WordPress** - es una aplicación web moderna construida desde cero con control total sobre diseño y funcionalidad.

## 📞 Soporte

Para dudas o modificaciones, contacta al desarrollador.

---

**Desarrollado con ❤️ usando Next.js, TypeScript y Framer Motion**
