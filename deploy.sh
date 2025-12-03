#!/bin/bash
# Script de deployment automático para lucvanlatam.com
# Uso: bash deploy.sh

echo "🚀 Iniciando deployment de lucvanlatam.com..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuración
REMOTE_USER="lucvan5"
REMOTE_HOST="104.247.74.226"
REMOTE_PORT="2222"
REMOTE_DIR="~/sitioweb"
PUBLIC_HTML="~/public_html"

# Función para manejar errores
handle_error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# 1. Pull desde GitHub
echo -e "${YELLOW}📥 Actualizando código desde GitHub...${NC}"
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_DIR && git pull origin master" || handle_error "No se pudo hacer pull desde GitHub"
echo -e "${GREEN}✅ Código actualizado${NC}"

# 2. Instalar dependencias (si package.json cambió)
echo -e "${YELLOW}📦 Verificando dependencias...${NC}"
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_DIR && npm ci --prefer-offline --no-audit" || handle_error "No se pudieron instalar dependencias"
echo -e "${GREEN}✅ Dependencias actualizadas${NC}"

# 3. Build local (en tu máquina) porque el servidor tiene Node 16
echo -e "${YELLOW}🔨 Compilando aplicación localmente...${NC}"
npm run build || handle_error "Build falló"
echo -e "${GREEN}✅ Build completado${NC}"

# 4. Subir carpeta out al servidor
echo -e "${YELLOW}📤 Subiendo archivos al servidor...${NC}"
scp -P $REMOTE_PORT -r out/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/out/ || handle_error "No se pudieron subir archivos"
echo -e "${GREEN}✅ Archivos subidos${NC}"

# 5. Copiar al public_html
echo -e "${YELLOW}📋 Copiando a public_html...${NC}"
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "cp -r $REMOTE_DIR/out/* $PUBLIC_HTML/" || handle_error "No se pudo copiar a public_html"
echo -e "${GREEN}✅ Archivos copiados${NC}"

# 6. Ajustar permisos
echo -e "${YELLOW}🔐 Configurando permisos...${NC}"
ssh -p $REMOTE_PORT $REMOTE_USER@$REMOTE_HOST "find $PUBLIC_HTML -type d -exec chmod 755 {} \; && find $PUBLIC_HTML -type f -exec chmod 644 {} \;" || handle_error "No se pudieron configurar permisos"
echo -e "${GREEN}✅ Permisos configurados${NC}"

# 7. Verificar deployment
echo -e "${YELLOW}🔍 Verificando deployment...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://lucvanlatam.com)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Deployment exitoso!${NC}"
    echo -e "${GREEN}🌐 Sitio disponible en: http://lucvanlatam.com${NC}"
else
    echo -e "${RED}⚠️ El sitio respondió con código: $HTTP_CODE${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment completado!${NC}"
