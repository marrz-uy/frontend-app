import React, { useState } from 'react';
import { turisticas } from '../Data/SliderImages.js';
import img1 from '../Assets/sliderImages/turisticas/turistica1.jpg';
import '../Css/Slider3.css';

export const Slider3 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setselectedImage] = useState(turisticas[0]);

	const [maxImages, setMaxImages] = useState(5);
  const [minImages, setMinImages] = useState(0);

	const [cantImages, setcantImages] = useState(turisticas.length);

	let images = [];
  for (let p = 0; p < 20; p++) {
    images.push(p + 1);
  }

  const selectedNewImage = (index, turisticas, next = true) => {
    const condicion = next
      ? selectedIndex < turisticas.length - 1
      : selectedIndex > 0;
    const nextIndex = next
      ? condicion
        ? selectedIndex + 1
        : 0
      : condicion
      ? selectedIndex - 1
      : turisticas.length - 1;
    setselectedImage(turisticas[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const previa = () => {
    selectedNewImage(selectedIndex, turisticas, false);
  };

  const siguiente = () => {
    selectedNewImage(selectedIndex, turisticas);
  };
  console.log(cantImages);

  return (
    <div className="slider3">
      {
				images.map((cantImages, index)=> {
					return (
                    <div key={index} className="numeroDePagina">{index + 1}

                    
                    </div>
                  );
			})
			}
      <button onClick={previa}>{'<'}</button>
      <button onClick={siguiente}>{'>'}</button>
    </div>
  );
};


// {turisticas.map((img) => (
// 	<div className="slider" key={selectedIndex}>
// 		<img src={img} alt="aa" key={selectedIndex}></img>
// 	</div>
// ))}