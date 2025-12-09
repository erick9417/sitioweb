const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/plantillas';
const outputDir = './public/plantillas-optimized';

// Crear directorio de salida
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Obtener todos los archivos .webp
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.webp'));

console.log(`Optimizando ${files.length} imágenes...`);

Promise.all(
  files.map(async (file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    const stats = fs.statSync(inputPath);
    const sizeBefore = (stats.size / 1024).toFixed(2);
    
    try {
      // Optimizar la imagen
      await sharp(inputPath)
        .webp({
          quality: 75, // Reducir calidad a 75%
          effort: 6,   // Máximo esfuerzo de compresión
        })
        .resize(1200, 1200, { // Máximo 1200px en cualquier dimensión
          fit: 'inside',
          withoutEnlargement: true
        })
        .toFile(outputPath);
      
      const statsAfter = fs.statSync(outputPath);
      const sizeAfter = (statsAfter.size / 1024).toFixed(2);
      const reduction = (((stats.size - statsAfter.size) / stats.size) * 100).toFixed(1);
      
      console.log(`✓ ${file}: ${sizeBefore}KB → ${sizeAfter}KB (${reduction}% reducción)`);
    } catch (error) {
      console.error(`✗ Error procesando ${file}:`, error.message);
    }
  })
).then(() => {
  console.log('\n✓ Optimización completada!');
  console.log(`Los archivos optimizados están en: ${outputDir}`);
});
