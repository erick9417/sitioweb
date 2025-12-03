# Script de Deployment Automático - PowerShell
# Uso: .\deploy.ps1

Write-Host "🚀 Iniciando deployment de lucvanlatam.com..." -ForegroundColor Cyan

# Configuración
$REMOTE_USER = "lucvan5"
$REMOTE_HOST = "104.247.74.226"
$REMOTE_PORT = "2222"
$REMOTE_DIR = "~/sitioweb"
$PUBLIC_HTML = "~/public_html"
$SSH_KEY = "$env:USERPROFILE\.ssh\id_rsa"

# Función para manejar errores
function Handle-Error {
    param($Message)
    Write-Host "❌ Error: $Message" -ForegroundColor Red
    exit 1
}

try {
    # 1. Pull desde GitHub
    Write-Host "`n📥 Actualizando código desde GitHub..." -ForegroundColor Yellow
    ssh -p $REMOTE_PORT -i $SSH_KEY "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIR && git pull origin master"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudo hacer pull desde GitHub" }
    Write-Host "✅ Código actualizado" -ForegroundColor Green

    # 2. Build local
    Write-Host "`n🔨 Compilando aplicación localmente..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) { Handle-Error "Build falló" }
    Write-Host "✅ Build completado" -ForegroundColor Green

    # 3. Subir carpeta out
    Write-Host "`n📤 Subiendo archivos al servidor..." -ForegroundColor Yellow
    scp -P $REMOTE_PORT -i $SSH_KEY -r out/* "$REMOTE_USER@$REMOTE_HOST`:$REMOTE_DIR/out/"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudieron subir archivos" }
    Write-Host "✅ Archivos subidos" -ForegroundColor Green

    # 4. Copiar a public_html
    Write-Host "`n📋 Copiando a public_html..." -ForegroundColor Yellow
    ssh -p $REMOTE_PORT -i $SSH_KEY "$REMOTE_USER@$REMOTE_HOST" "cp -r $REMOTE_DIR/out/* $PUBLIC_HTML/"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudo copiar a public_html" }
    Write-Host "✅ Archivos copiados" -ForegroundColor Green

    # 5. Ajustar permisos
    Write-Host "`n🔐 Configurando permisos..." -ForegroundColor Yellow
    ssh -p $REMOTE_PORT -i $SSH_KEY "$REMOTE_USER@$REMOTE_HOST" "find $PUBLIC_HTML/_next -type d -exec chmod 755 {} \; && find $PUBLIC_HTML/_next -type f -exec chmod 644 {} \; && find $PUBLIC_HTML/plantillas -type d -exec chmod 755 {} \; && find $PUBLIC_HTML/plantillas -type f -exec chmod 644 {} \;"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudieron configurar permisos" }
    Write-Host "✅ Permisos configurados" -ForegroundColor Green

    # 6. Verificar deployment
    Write-Host "`n🔍 Verificando deployment..." -ForegroundColor Yellow
    $Response = Invoke-WebRequest -Uri "http://lucvanlatam.com" -UseBasicParsing -ErrorAction SilentlyContinue
    if ($Response.StatusCode -eq 200) {
        Write-Host "✅ Deployment exitoso!" -ForegroundColor Green
        Write-Host "🌐 Sitio disponible en: http://lucvanlatam.com" -ForegroundColor Green
    } else {
        Write-Host "⚠️ El sitio respondió con código: $($Response.StatusCode)" -ForegroundColor Yellow
    }

    Write-Host "`n🎉 Deployment completado!" -ForegroundColor Green

} catch {
    Handle-Error $_.Exception.Message
}
