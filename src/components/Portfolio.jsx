import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Portfolio = () => {
  const [imagesbase64, setImagesbase64] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://thestoryloft.in/api/images?section_id=20&refresh=${Number(Math.random()).toFixed(1)}`,
          { method: "GET", redirect: "follow" }
        );
        const result = await response.json();
        const sortedImages = result.sort((a, b) => a.image_order - b.image_order);
        setImages(sortedImages);

        const base64Promises = sortedImages.slice(0, 4).map(async (image) => {
          const base64Response = await fetch(
            `https://thestoryloft.in/api/base64image?url=${encodeURIComponent(image.image_url)}`,
            { method: "GET", redirect: "follow" }
          );
          return base64Response.text();
        });

        const base64Data = await Promise.all(base64Promises);
        setImagesbase64(base64Data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="full-gallery">
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-items">
            <div className="item">
              <img src={imagesbase64[index]} alt={image.name} />
              <div className="item-title">
                <div className="transparent-back"></div>
                <div className="title-text">
                  <p><EditIcon /><DeleteIcon /></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;

