
import Styles from './Checkout.module.css'
import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {TokenContext} from '../Context/TokenContext';
import { CartContext } from '../Context/CartContext';

export default function Checkout() {



 let {Token , setToken} = useContext(TokenContext);
 let {onlinePayment , cashPayment} = useContext(CartContext);
 const [paymentType, setPaymentType] = useState(null)

 let {state} = useLocation()
 useEffect(() => {
  setPaymentType(state.type)
 }, [])
 
  

    

    const formik = useFormik({
            initialValues: {
              details: "",
              phone: "",
              city: ""
            },

            onSubmit: (values) => {
              payNow(values);
                 
            },
            });



async function payNow(values) {
  if (paymentType === "Online payment") {
     await onlinePayment(values)
  }else{
     await cashPayment(values)
  }
  
  
}

  return (
    <>
    
    
    <div className="container mx-auto my-10 h-screen">

            

            <form className="w-full md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl"  onSubmit={formik.handleSubmit}>

                <h1 className='text-3xl font-semibold mb-5 dark:text-gray-200'>{paymentType}</h1>



            <div className="mb-5">
                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details</label>
                <input name='details' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {formik.touched.details && formik.errors.details ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.details}</span>
                </div>
            ) : null}




            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                <input name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.phone}</span> 
                </div>
            ) : null}




            <div className="mb-5">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
                <input name='city' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {formik.touched.city && formik.errors.city ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.city}</span> 
                </div>
            ) : null}
            

     
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 md:text-sm font-bold">Paynow</button>
            
            
            </form>


        </div>
    
    
    </>
  )
}
