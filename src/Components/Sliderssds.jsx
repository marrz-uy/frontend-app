import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../Css/Slider.css';

export const Slider = ({ arrayimages, title, description }) => {
  const [width, setWidth] = useState(0);
  const slider = useRef();

  useEffect(() => {
    setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
  }, []);
  console.log(width);

  return (
    <div className="componentSlider">
      <h4 className="titleSlider">{title}</h4>
      <span className="descriptionSlider">{description}</span>
      <div
        ref={slider}
        arrayimages={arrayimages}
        tile={title}
        description={description}
        className="sliderContainer"
      >
        <motion.div
          className="slider"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {arrayimages.map((img, index) => (
            <motion.div className="item" key={index}>
              {/* <img src={img} alt="" /> */}
              <img
                className="images"
                style={{
                  backgroundImage: `url(${img})`,
                }}
                alt=""
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
