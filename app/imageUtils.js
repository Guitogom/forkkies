import { promises as fs } from 'fs';
import path from 'path';

async function getImagesFromFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });

    const imagesArray = await Promise.all(imageFiles.map(async (file) => {
      const imagePath = path.join(folderPath, file);
      const imgBinary = await fs.readFile(imagePath);
      const imgBase64 = imgBinary.toString('base64');
      const name = path.basename(file, path.extname(file));

      return {
        name: name,
        img: imgBase64
      };
    }));

    return imagesArray;
  } catch (err) {
    throw new Error(`Error reading images folder: ${err.message}`);
  }
}

export { getImagesFromFolder };
