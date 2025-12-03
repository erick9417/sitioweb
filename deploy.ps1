# Script de Deployment Automatico - PowerShell
# Uso: .\deploy.ps1

Write-Host "Iniciando deployment de lucvanlatam.com..." -ForegroundColor Cyan

# Configuracion
$REMOTE_USER = "lucvan5"
$REMOTE_HOST = "104.247.74.226"
$REMOTE_PORT = "2222"
$REMOTE_DIR = "~/sitioweb"
$PUBLIC_HTML = "~/public_html"
$SSH_KEY = "$env:USERPROFILE\.ssh\id_rsa"

# Funcion para manejar errores
function Handle-Error {
    param($Message)
    Write-Host "Error: $Message" -ForegroundColor Red
    exit 1
}

try {
    # 1. Pull desde GitHub
    Write-Host "`nActualizando codigo desde GitHub..." -ForegroundColor Yellow
    ssh -p $REMOTE_PORT -i $SSH_KEY "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIR; git pull origin master"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudo hacer pull desde GitHub" }
    Write-Host "Codigo actualizado" -ForegroundColor Green

    # 2. Build local
    Write-Host "`nCompilando aplicacion localmente..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) { Handle-Error "Build fallo" }
    Write-Host "Build completado" -ForegroundColor Green

    # 3. Subir carpeta out
    Write-Host "`nSubiendo archivos al servidor..." -ForegroundColor Yellow
    scp -P $REMOTE_PORT -i $SSH_KEY -r out/* "$REMOTE_USER@$REMOTE_HOST`:$REMOTE_DIR/out/"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudieron subir archivos" }
    Write-Host "Archivos subidos" -ForegroundColor Green

    # 4. Copiar a public_html
    Write-Host "`nCopiando a public_html..." -ForegroundColor Yellow
    ssh -p $REMOTE_PORT -i $SSH_KEY "$REMOTE_USER@$REMOTE_HOST" "cp -r $REMOTE_DIR/out/* $PUBLIC_HTML/"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudo copiar a public_html" }
    Write-Host "Archivos copiados" -ForegroundColor Green

    # 5. Ajustar permisos
    Write-Host "`nConfigurando permisos..." -ForegroundColor Yellow
    ssh -p $REMOTE_PORT -i $SSH_KEY "$REMOTE_USER@$REMOTE_HOST" "chmod -R 755 $PUBLIC_HTML/_next; chmod -R 644 $PUBLIC_HTML/_next/static/chunks/*; chmod -R 644 $PUBLIC_HTML/plantillas/*"
    if ($LASTEXITCODE -ne 0) { Handle-Error "No se pudieron configurar permisos" }
    Write-Host "Permisos configurados" -ForegroundColor Green

    # 6. Verificar deployment
    Write-Host "`nVerificando deployment..." -ForegroundColor Yellow
    $Response = Invoke-WebRequest -Uri "http://lucvanlatam.com" -UseBasicParsing -ErrorAction SilentlyContinue
    if ($Response.StatusCode -eq 200) {
        Write-Host "Deployment exitoso!" -ForegroundColor Green
        Write-Host "Sitio disponible en: http://lucvanlatam.com" -ForegroundColor Green
    } else {
        Write-Host "El sitio respondio con codigo: $($Response.StatusCode)" -ForegroundColor Yellow
    }

    Write-Host "`nDeployment completado!" -ForegroundColor Green

} catch {
    Handle-Error $_.Exception.Message
}
