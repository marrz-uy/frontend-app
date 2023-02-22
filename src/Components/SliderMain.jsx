import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const SliderMain = ({ array }) => {
  console.log('ARRAYIMAGENES: ', array);
  return (
    <div>
      <Carousel infiniteLoop autoPlay>
        {array?.map((imagen, index) => {
          return (
            <div className="image" key={index}>
              <img src={imagen} alt={`imagen ${index}`} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SliderMain;
