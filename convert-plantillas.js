const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Angie\\Downloads\\Plantillas';
const targetDir = path.join(__dirname, 'public', 'plantillas');

// Asegurar que existe el directorio de destino
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

async function convertImages() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (['.png', '.tif', '.tiff', '.jpg', '.jpeg'].includes(ext)) {
      const inputPath = path.join(sourceDir, file);
      const outputName = path.basename(file, ext) + '.webp';
      const outputPath = path.join(targetDir, outputName);
      
      console.log(`Convirtiendo: ${file} -> ${outputName}`);
      
      try {
        await sharp(inputPath)
          .resize(800, 800, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 90 })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        console.log(`✓ ${outputName} (${(stats.size / 1024).toFixed(2)} KB)`);
      } catch (error) {
        console.error(`✗ Error convirtiendo ${file}:`, error.message);
      }
    }
  }
  
  console.log('\n✓ Conversión completada!');
}

convertImages().catch(console.error);
