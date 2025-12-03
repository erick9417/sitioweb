# 🚀 Deployment Guide - LucvánLATAM

## Cambios Implementados

### ✅ Mejoras Responsive
1. **Hero Carrusel Móvil**: Altura reducida (85vh) y tamaño de imagen optimizado (280px en móvil)
2. **LucvánLab Móvil**: Espaciado reducido y tamaño de imagen responsivo
3. **Navbar Móvil Mejorado**: 
   - Logo centrado en la parte superior
   - Menú hamburguesa y botones en barra inferior
   - Botones compactos y funcionales

### ✅ Mejoras de Funcionalidad
1. **Preload de Imágenes**: Las imágenes del carrusel se precargan para evitar flicker
2. **Botones Funcionales**:
   - "Agendar Consulta" → Scroll a sección contacto
   - "Visitar Consultorio" → Abre Google Maps
3. **Sección Contacto Reordenada**:
   - Orden: Ubicación → Teléfono → Email → Redes → Horario
   - Mapa de Google Maps embebido
   - Botón "Ver en Google Maps" funcional

## 📦 Deployment Automático

### Opción 1: PowerShell (Windows)
```powershell
.\deploy.ps1
```

### Opción 2: Bash (Linux/Mac o Git Bash en Windows)
```bash
bash deploy.sh
```

## 🛠️ Deployment Manual

Si prefieres hacerlo paso a paso:

### 1. Build Local
```bash
npm run build
```

### 2. Subir a Servidor
```bash
scp -P 2222 -i ~/.ssh/id_rsa -r out/* lucvan5@104.247.74.226:~/sitioweb/out/
```

### 3. Copiar a Public HTML
```bash
ssh -p 2222 -i ~/.ssh/id_rsa lucvan5@104.247.74.226 "cp -r ~/sitioweb/out/* ~/public_html/"
```

### 4. Ajustar Permisos
```bash
ssh -p 2222 -i ~/.ssh/id_rsa lucvan5@104.247.74.226 "find ~/public_html/_next -type d -exec chmod 755 {} \; && find ~/public_html/_next -type f -exec chmod 644 {} \;"
```

## 🔄 Workflow de Desarrollo

1. **Hacer cambios localmente**
2. **Compilar y probar**: `npm run dev`
3. **Build de producción**: `npm run build`
4. **Commit a Git**:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin master
   ```
5. **Deploy**: Ejecutar `deploy.ps1` o `deploy.sh`

## 📋 Requisitos

- Node.js 20+ (local)
- SSH Key configurada en `~/.ssh/id_rsa`
- Acceso SSH al servidor (puerto 2222)

## 🌐 URLs

- **Producción**: http://lucvanlatam.com
- **Servidor IP**: http://104.247.74.226
- **GitHub**: https://github.com/erick9417/sitioweb

## 🐛 Troubleshooting

### Problema: Imágenes no cargan (403)
```bash
ssh -p 2222 lucvan5@104.247.74.226 "chmod -R 755 ~/public_html/_next && chmod -R 644 ~/public_html/_next/static/chunks/*.js"
```

### Problema: Página en blanco
1. Verificar que `out` se copió: `ls -la ~/public_html/_next`
2. Revisar permisos: `ls -la ~/public_html/_next/static`
3. Limpiar caché del navegador (Ctrl+Shift+R)

### Problema: Build falla
```bash
npm ci
npm run build
```

## 📝 Notas Importantes

- **Node.js en servidor**: v16.20.2 (no compatible con Next.js 16)
- **Solución**: Build local con Node 20+, subir archivos compilados
- **Archivos estáticos**: No requiere Node.js para servir
- **Permisos críticos**: Carpetas 755, archivos 644

## 🎯 Próximos Pasos

- [ ] Configurar SSL (HTTPS) con Let's Encrypt
- [ ] Optimizar imágenes con WebP
- [ ] Implementar caché de navegador
- [ ] Configurar CDN para assets estáticos
