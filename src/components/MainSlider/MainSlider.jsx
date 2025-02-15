import React from 'react'
import Styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "./../../assets/1.jpeg" // Use WebP format for optimized images
import slider2 from "./../../assets/2.jpeg"
import slider3 from "./../../assets/3.jpeg"

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
  };

  

  return (
    <>
    <div className='w-full overflow-hidden h-[250px] md:h-[400px] lg:h-[600px] xl:h-[700px] 2xl:h-full'>


    




        <div className='w-full'>
        <Slider {...settings}>
          <img loading="eager" src={slider1} className='w-full object-cover' alt="Slider 1" fetchpriority="high"/> 
          <img loading="lazy" src={slider2} className='w-full object-cover' alt="Slider 2" /> 
          <img loading="lazy" src={slider3} className='w-full object-cover' alt="Slider 3" /> 

          

        </Slider>
        </div>
    </div>
    </>
  )
}


