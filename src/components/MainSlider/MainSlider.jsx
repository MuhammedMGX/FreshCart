import React, { useEffect } from 'react'
import Styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "./../../assets/1.jpeg" // Use WebP format for optimized images
import slider2 from "./../../assets/2.jpeg"
import slider3 from "./../../assets/3.jpeg"

export default function MainSlider() {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = slider1;
    link.as = 'image';
    document.head.appendChild(link);
  }, []);

  
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

    <link rel="preload" as="image" href={slider1} type="image/jpeg" />


    <div className='w-full overflow-hidden h-[200px] md:h-[400px] lg:h-[500px] xl:h-screen'>
        <Slider {...settings}>
          <img loading="eager" fetchpriority="high" src={slider1} className='w-full ' alt="Slider 1"/> 
          <img loading="lazy" src={slider2} className='w-full ' alt="Slider 2" /> 
          <img loading="lazy" src={slider3} className='w-full ' alt="Slider 3" />
        </Slider>
    </div>
    </>
  )
}

