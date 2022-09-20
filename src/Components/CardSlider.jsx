import '../css/CardSlider.css'
import React from 'react'

const CardSlider = () => {
  return (
    <div className='cardslider__container'>
        <div className='cardslider__img'>
            <img src='../images/pai1.jpg' alt='paisaje 1'></img>
        </div>
        <div className='cardslider__info'>
            <p>Cositas por aca cositas por alla</p>
        </div>
    </div>
  )
}

export default CardSlider