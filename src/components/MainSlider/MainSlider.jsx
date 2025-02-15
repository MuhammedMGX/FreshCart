import React from 'react'
import Styles from './MainSlider.module.css'
import Slider from "react-slick";
import slider1 from "./../../assets/1.png"
import slider2 from "./../../assets/2.png"
import slider3 from "./../../assets/3.png"

export default function MainSlider() {

  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <>
    
    <div className='w-full overflow-hidden'>


        <div className='w-full'>

        <Slider {...settings}>
          <img src={slider1} className='' alt="" /> 
          <img src={slider2} className='' alt="" /> 
          <img src={slider3} className='' alt="" /> 
        </Slider>

        </div>

     
    </div>
    
    
    
    </>
  )
}
