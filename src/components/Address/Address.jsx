import React from 'react'
import Styles from './Address.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Address() {



  let Navigate = useNavigate()
  const [isloading, setisloading] = useState(false)
  const [errmessage, seterrmessage] = useState(null)
  const [errmessagere, seterrmessagere] = useState(null)
 
 
 
  const formik = useFormik({
   initialValues: {
    name: '',
    details: '',
    phone: '',
    city: '',
   },
 
 
   validationSchema: Yup.object({
            name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
            details: Yup.string().required('Details is required').min(10, 'Details must be at least 10 characters').max(50, 'Details must be at most 50 characters'),
            phone: Yup.string().required('phone is required').matches(/^[002]?01[0125][0-9]{8}$/, 'phone must be 11 digits'),
            city: Yup.string().required('City is required').min(3, 'City must be at least 3 characters').max(20, 'City must be at most 20 characters'),

     
   }),
 
 
   onSubmit: (values) => {
       
    addAdress(values);
   },
   });






   async function addAdress(values) {
    setisloading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/addresses",
         values,
        {headers : {
            token : localStorage.getItem("userToken")
        }})
        .then((response)=>{
          console.log(response);
          
          setisloading(false)
          Navigate('/UserProfile')
            
            return response
        
        }).catch((err)=>{
         seterrmessage(err.response.data.message)
         seterrmessagere(err.response.data.errors.msg);
         

          setisloading(false)
            return err
            
        })

    
    
}


  return (
    <>
    
    
    
    
    
    <div className='w-full mx-auto'>



            <form onSubmit={formik.handleSubmit} className=" md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl">

                      <h1 className='text-xl font-semibold mb-5 dark:text-gray-100'>Add Your Address :</h1>


                      { errmessage ? 
                      <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                      <span className="font-medium">{errmessage}  {errmessagere}</span>
                      </div>
                      : null}


                                        <div className="mb-5">
                                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                  <input name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                              </div>
                              {formik.touched.name && formik.errors.name ? (
                                  <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                  <span className="font-medium">{formik.errors.name}</span>
                                  </div>
                              ) : null}





                              <div className="mb-5">
                                  <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                                  <input name='details' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                              </div>
                              {formik.touched.details && formik.errors.details ? (
                                  <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                  <span className="font-medium">{formik.errors.details}</span>
                                  </div>
                              ) : null}




                              <div className="mb-5">
                                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                  <input name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                              </div>
                              {formik.touched.phone && formik.errors.phone ? (
                                  <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                  <span className="font-medium">{formik.errors.phone}</span>
                                  </div>
                              ) : null}




                              <div className="mb-5">
                                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                  <input name='city' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                              </div>
                              {formik.touched.city && formik.errors.city ? (
                                  <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                  <span className="font-medium">{formik.errors.city}</span>
                                  </div>
                              ) : null}

           

                  { isloading ? <button type="submit" className="bg-transparent text-gray-600 border-2 border-gray-400 px-4 py-2 rounded-full hover:bg-black hover:border-black hover:text-white  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"><i className='fa fa-spinner fa-spin dark:text-black'></i></button>
                  : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-transparent text-gray-600 border-2 border-gray-400 px-4 py-2 rounded-full hover:bg-black hover:border-black hover:text-white  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold">Verify</button>}
                  
                  
            
            </form>
    </div>
    
    
    
    
    
    
    
    </>
  )
}
