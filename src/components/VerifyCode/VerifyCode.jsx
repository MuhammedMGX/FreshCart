import React from 'react'
import Styles from './VerifyCode.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {


 let Navigate = useNavigate()
 const [isloading, setisloading] = useState(false)





const formik = useFormik({
        initialValues: {
          resetCode: '',
        },



        onSubmit: (values) => {
            
            resetCode(values);
            
           
          
        },
        });





        
        async function resetCode(values) {
          setisloading(true)
          return await axios
              .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , values)
              .then((data) => {


                Navigate('/resetpassword')
                  setisloading(false)
                  
                  
                  seterrmessage(null)
                  
                  
              })
              .catch((error) => {
                  setisloading(false)
                  
                  
              })
      }




  return (
    <>
    
    
    
    
    <div className='w-full mx-auto h-screen'>



            <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl">

                      <h1 className='text-xl font-semibold mb-5'>please enter your verification code :</h1>


                  <div className="mb-5">
                      <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                      <input name='resetCode' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  {formik.touched.resetCode && formik.errors.resetCode ? (
                      <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                      <span className="font-medium">{formik.errors.resetCode}</span>
                      </div>
                  ) : null}

           

                  { isloading ? <button type="submit" className="bg-black text-white border-2 px-4 py-2  rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"><i className='fa fa-spinner fa-spin'></i></button>
                  : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-black text-white border-2 px-4 py-2  rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold">Verify</button>}
                  
                  
            
            </form>
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
