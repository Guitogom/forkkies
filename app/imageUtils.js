console.log('importando fs');
import fs from 'fs';
console.log('importando path');
import path from 'path';
console.log('todo importado');

const getImagesFromFolder = (folderPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return reject(err);
      }

      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
      });

      const imagesArray = imageFiles.map(file => {
        const imagePath = path.join(folderPath, file);
        const imgBinary = fs.readFileSync(imagePath);
        const imgBase64 = imgBinary.toString('base64');
        const name = path.basename(file, path.extname(file));

        return {
          name: name,
          img: imgBase64
        };
      });

      resolve(imagesArray);
    });
  });
};

export { getImagesFromFolder };
