import React, { useEffect, useState } from 'react'
import Styles from './CatSlider.module.css'
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { data } from 'react-router-dom';





export default function CatSlider() {



  const [slidesToShow, setSlidesToShow] = useState(2);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setSlidesToShow(7); // lg breakpoint
      } else if (width >= 768) {
        setSlidesToShow(6); // md breakpoint
      } else {
        setSlidesToShow(2); // default for smaller screens
      }
    };

    updateSlidesToShow(); // Initial check
    window.addEventListener("resize", updateSlidesToShow);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
    
  };

function getCat() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}

let {data} = useQuery({
    queryKey:["CatSlider"],
    queryFn:getCat
  })


  useEffect(() => {
    getCat()
  
   
  }, [])




  
  return (
    <>

    


    <div className='container mx-auto p-10 h-[250px]'>

      <h1 className='font-extrabold text-xl pb-2 dark:text-gray-200'>Show Popular categories</h1>
    <Slider {...settings}>

          {data?.data?.data.map((cat) => <div key={cat._id} className='text-center my-3' >
            <div className='w-[90px] h-[90px] rounded-full mx-auto'>

             <img src={cat.image} className='w-full h-full rounded-full hover:shadow-xl transition duration-500 dark:hover:shadow-xl dark:hover:shadow-gray-700' alt="" /> :

            </div>
            <p className='text-center font-bold py-2 dark:text-gray-200'>{cat.name}</p>
            </div>)}
      
      </Slider>
    </div>
    
    </>
    
  )
}
