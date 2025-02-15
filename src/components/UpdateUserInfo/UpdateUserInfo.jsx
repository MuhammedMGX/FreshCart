import React from 'react'
import Styles from './UpdateUserInfo.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateUserInfo() {







  let Navigate = useNavigate()
  const [isloading, setisloading] = useState(false)
  const [errmessage, seterrmessage] = useState(null)
  const [errmessagere, seterrmessagere] = useState(null)
 
 
 
  const formik = useFormik({
   initialValues: {
    name: '',
    email: '',
    phone: '',
   },
 
 
   validationSchema: Yup.object({
            name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
            email: Yup.string().required('email is required').email('email is invalid'),
            phone: Yup.string().required('phone is required').matches(/^[002]?01[0125][0-9]{8}$/, 'phone must be 11 digits'),
     
   }),
 
 
   onSubmit: (values) => {
       
    updateUserInfo(values);
   },
   });
 
 
 
 
   async function updateUserInfo(values) {
     setisloading(true)
     return await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/",
          values,
         {headers : {
             token : localStorage.getItem("userToken")
         }})
         .then((response)=>{
           console.log(response);
                localStorage.setItem('userName' , data.data.user.name);
                localStorage.setItem('userEmail' , data.data.user.email);
                localStorage.setItem('userRole' , data.data.user.role);
           
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



            <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto my-20 w-2/3">

                      <h1 className='text-xl font-semibold mb-5'>Update Your Account Info :</h1>


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
                                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                  <input name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                              </div>
                              {formik.touched.email && formik.errors.email ? (
                                  <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                  <span className="font-medium">{formik.errors.email}</span>
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

           

                  { isloading ? <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className='fa fa-spinner fa-spin'></i></button>
                  : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>}
                  
                  
            
            </form>
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
