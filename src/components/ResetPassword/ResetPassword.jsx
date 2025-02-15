import React from 'react'
import Styles from './ResetPassword.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

 let Navigate = useNavigate()
 const [isloading, setisloading] = useState(false)








 const formik = useFormik({
  initialValues: {
    email: '',
    newPassword: '',
  },


  validationSchema: Yup.object({
      email: Yup.string().required('email is required').email('email is invalid'),
      newPassword: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password must contain at least 8 characters, one letter and one number'),
      
  }),


  onSubmit: (values) => {
      
      resetPass(values);
      
     
    
  },
  });




  async function resetPass(values) {
    setisloading(true)
    return await axios
        .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , values)
        .then((data) => {

          Navigate('/Login')
            setisloading(false)
            
            
            seterrmessage(null)
            
            
        })
        .catch((error) => {
            setisloading(false)
            console.log(error.response.data.message);
            
            
        })
}










  return (
    <>
    
    
    <div className='w-full mx-auto h-screen'>



            <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl">

                      <h1 className='text-xl font-semibold mb-5'>Reset your account password :</h1>


                  <div className="mb-5">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                      <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                      <span className="font-medium">{formik.errors.email}</span>
                      </div>
                  ) : null}





            <div className="mb-5">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            
                <div className='relative'>
                <input name='newPassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type={isShow? "text" : "password"} id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <div className='absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer' onClick={()=>setIsShow(!isShow)}>{isShow ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>  }</div>
                </div>
            
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.newPassword}</span> 
                </div>
            ) : null}

           

                  { isloading ? <button type="submit" className="bg-black text-white border-2 px-4 py-2  rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"><i className='fa fa-spinner fa-spin'></i></button>
                  : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-black text-white border-2 px-4 py-2  rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold">Verify</button>}
                  
                  
            
            </form>
    </div>
    
    
    
    
    
    
    </>
  )
}
