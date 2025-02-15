import React from 'react'
import Styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "./../../assets/1.jpeg" // Use WebP format for optimized images
import slider2 from "./../../assets/2.jpeg"
import slider3 from "./../../assets/3.jpeg"

export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
  };

  

  return (
    <>
    <div className='w-full overflow-hidden h-[200px] md:h-[400px] lg:h-[500px] xl:h-screen'>



        <div className='w-full h-full overflow-hidden'>
        <Slider {...settings}>
          <img loading="eager" src={slider1} className='w-full ' alt="Slider 1" fetchpriority="high"/> 
          <img loading="lazy" src={slider2} className='w-full ' alt="Slider 2" /> 
          <img loading="lazy" src={slider3} className='w-full ' alt="Slider 3" /> 
        </Slider>
        </div>
    </div>
    </>
  )
}


