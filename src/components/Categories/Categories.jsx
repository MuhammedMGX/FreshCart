import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../../Redux/Categories';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true)


let dispatch = useDispatch()
let {categories} = useSelector((state)=> state.categoriesReducer)
// console.log(categories);


async function getAllCategories() {
  await dispatch(getCategories());
  setIsLoading(false)
}



useEffect(() => {
  getAllCategories()
}, [])


  return (
        <HelmetProvider>
    
    <>
   
    
    
   <Helmet>
<title>Categories</title>
</Helmet>  
    
   


   
        <div className='container py-10 mx-auto md:h-screen'>
    
    {isLoading ? <Loader/> : <div className='flex flex-wrap justify-center'>
    
    
    
      {categories.map((product) => (
      
         
          <div key={product._id} className='w-1/2 md:w-1/4 lg:w-1/6 px-3 py-1 product '>
    
            <Link to={`/categoriesDetails/${product._id}`}>
              <img src={product.image} className='w-full' alt="" />
              <h3 className='text-xs px-1 py-1 font-bold text-black text-center dark:text-gray-200'>{product.name}</h3>
            </Link>
          </div>
        
      ))}
    
    </div>}
     
    
    
    
    
    </div> 


    
    
    </>
        </HelmetProvider>
    
  )
}
