
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
    
    
    <div className="container mx-auto my-10">

            

            <form className="max-w-sm mx-auto"  onSubmit={formik.handleSubmit}>

                <h1 className='text-3xl font-semibold mb-5'>{paymentType}</h1>



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
            

     
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition">Paynow</button>
            {/* 
            { isloading ? <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className='fa fa-spinner fa-spin'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>}
             */}
            
            </form>


        </div>
    
    
    </>
  )
}
