import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Portfolio = () => {
  var isUseEffectcalled = false;
  var [imagesbase64,setImagesbase64] = useState([]);
  var [images,setImages] = useState([]);
    useEffect(() => {
        if (!isUseEffectcalled) {
            isUseEffectcalled = true;
            let requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch("https://thestoryloft.in/api/images?section_id=20&refresh=" + Number(Math.random()).toFixed(1), requestOptions)
                .then((response) => response.json())
                .then(async (result) => {
                    console.log(result);
                    images = result.sort((a, b) => a.image_order - b.image_order);

                    for (let i = 0; i < (images.length < 4 ? images.length : 4); i++) {
                        if (images[i]) {
                            let requestOptions = {
                                method: "GET",
                                redirect: "follow"
                            };

                            await fetch(`https://thestoryloft.in/api/base64image?url=${encodeURIComponent(images[i].image_url)}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    imagesbase64.push(result);
                                    setImagesbase64(imagesbase64);
                                    if(i===3)
                                    setImages(images);  
                                })
                                .catch((error) => console.error(error));
                        }
                    }
                })
                .catch((error) => console.error(error));
        }
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
                  <p><EditIcon/><DeleteIcon/></p>
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

