import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';

const SliderMain = ({ imagen }) => {
    return (
        <div>
            <Carousel infiniteLoop autoPlay>
                <div className='image'>
                    <img src={imagen} alt='llamame mimosa' />
                </div>
                <div className='image'>
                    <img src={imagen} alt='llamame mimosa' />
                </div>
                <div className='image'>
                    <img src={imagen} alt='llamame mimosa' />
                </div>
                <div className='image'>
                    <img src={imagen} alt='llamame mimosa' />
                </div>
            </Carousel>
        </div>
    )
}

export default SliderMain