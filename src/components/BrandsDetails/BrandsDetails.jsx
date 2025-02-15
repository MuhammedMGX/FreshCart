import React, { useEffect, useState } from 'react'
import Styles from './BrandsDetails.module.css'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios'

export default function BrandsDetails() {

    const [inLoading, setinLoading] = useState(true)
    const [brandDetails, setBrandDetails] = useState([])
  

  let {id} = useParams()
  console.log(id);




  async function getBrandsDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then((data) => {
      console.log(data?.data.data);
      console.log(data?.data.data);
      setBrandDetails(data?.data.data)
      setinLoading(false)
    }
    ).catch((error) => {
      console.log(error);
      setinLoading(false)
    })
    
  }



  
    useEffect(() => {
      getBrandsDetails()
    }, [])
  
  return (
    <>
    
    
    
    
    

    
    
    <div className='container mx-auto py-10 h-screen'>

      {inLoading ? <Loader/> : null}

      <div className='flex justify-around items-center'>

            <div className="w-1/2 shadow shadow-xl">
              <img src={brandDetails.image} className='mx-auto' alt="" />
              
            </div>

            <div className="w-1/2 p-10">
              
                <h1 className='text-black font-bold text-2xl dark:text-gray-200'>Brand Name : {brandDetails.name}</h1>
                
            </div>

      </div>



    </div>
    
    
   
    
    
    
    
    </>
  )
}
