import { useState, useEffect } from 'react';

const useDownloadImage = (imageUrl) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function downloadImage() {
      const cachedImage = localStorage.getItem('imageUrl');
      if (cachedImage) {
        setImage(cachedImage);
      } else {
        const response = await fetch(imageUrl, {
          mode: 'cors',
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer-when-downgrade',
            'Access-Control-Allow-Origin': 'https://localhost:3000',
          },
        });
        const blob = await response.blob();
        const imageSrc = URL.createObjectURL(blob);
        localStorage.setItem('imageUrl', imageSrc);
        console.log('GUARDO IMAGENNNNNNNN');
        setImage(imageSrc);
      }
    }
    downloadImage();
  }, [imageUrl]);

  return image;
};

export default useDownloadImage;
