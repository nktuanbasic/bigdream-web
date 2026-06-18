import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectsDir = path.join(process.cwd(), 'public', 'projects');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.bmp'].includes(ext)) {
        // Skip if already compressed
        if (fullPath.includes('.compressed.')) continue;
        
        console.log(`Processing: ${fullPath}`);
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          const parsed = path.parse(fullPath);
          const newPath = path.join(parsed.dir, `${parsed.name}.compressed.jpg`);

          let transform = image;
          if (metadata.width > 1920) {
            transform = transform.resize({ width: 1920, withoutEnlargement: true });
          }

          await transform
            .jpeg({ quality: 80, progressive: true })
            .toFile(newPath);

          // Delete old file
          fs.unlinkSync(fullPath);
          
          // Rename new file back to .jpg
          const finalPath = path.join(parsed.dir, `${parsed.name}.jpg`);
          fs.renameSync(newPath, finalPath);
          console.log(`Saved: ${finalPath}`);

        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image compression...');
  await processDirectory(projectsDir);
  console.log('Compression Done!');
}

run();
