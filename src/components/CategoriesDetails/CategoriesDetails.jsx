import React, { useEffect, useState } from 'react'
import Styles from './CategoriesDetails.module.css'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios'

export default function CategoriesDetails() {

    const [inLoading, setinLoading] = useState(true)
    const [categoriesDetails, setCategoriesDetails] = useState([])
  

  let {id} = useParams()
  // console.log(id);





  async function getCategoriesDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`).then((data) => {
      console.log(data?.data.data);
      setCategoriesDetails(data?.data.data)
      setinLoading(false)
    }
    ).catch((error) => {
      console.log(error);
      setinLoading(false)
    })
    
  }



  
    useEffect(() => {
      getCategoriesDetails()
    }, [])


  return (
    <>
    


        <div className='container mx-auto py-10 h-screen'>
    
          {inLoading ? <Loader/> : null}
    
          <div className='flex justify-around items-center'>
    
                <div className="w-1/2 shadow shadow-xl">
                  <img src={categoriesDetails.image} className='mx-auto' alt="" />
                  
                </div>
    
                <div className="w-1/2 p-10">
                  
                    <h1 className='text-black font-bold text-2xl dark:text-gray-200'>category Name : {categoriesDetails.name}</h1>
                    
                </div>
    
          </div>
    
    
    
        </div>
    
    
    </>
  )
}
