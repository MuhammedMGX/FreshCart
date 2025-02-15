import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    let Navigate = useNavigate()
    const [message, setmessage] = useState(null)
    const [errmessage, seterrmessage] = useState(null)
    const [isloading, setisloading] = useState(false)
    const [isShow, setIsShow] = useState(false);
    




    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          rePassword: '',
          phone: '',
        },


        validationSchema: Yup.object({
            name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
            email: Yup.string().required('email is required').email('email is invalid'),
            password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password must contain at least 8 characters, one letter and one number'),
            rePassword: Yup.string().required('password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
            phone: Yup.string().required('phone is required').matches(/^[002]?01[0125][0-9]{8}$/, 'phone must be 11 digits'),
        }),


        onSubmit: (values) => {
            
            localStorage.setItem('userPhone' , values.phone);
            registerUser(values);
            
           
          
        },
        });

           


        async function registerUser(values) {
            setisloading(true)
            return await axios
                .post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
                .then((data) => {
                    console.log(data);
                    setisloading(false)
                    console.log(data.data.message);
                    
                    setmessage(data.data.message)
                    seterrmessage(null)
                    Navigate('/Login')
                    
                })
                .catch((error) => {
                    setisloading(false)
                    console.log(error.response.data.message);
                    
                    seterrmessage(error.response.data.message)
                    setmessage(null)
                })
        }

  return (
    <>
    
        <div className="container mx-auto my-10 h-screen">

            

            <form onSubmit={formik.handleSubmit} className=" md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl">

                <h1 className='text-3xl font-semibold mb-5 dark:text-gray-100'>Register Now :</h1>


                { message ? 
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">{message}</span>
                </div>
                 : null}


                { errmessage ? 
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{errmessage}</span>
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
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className='relative'>
                <input name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type={isShow? "text" : "password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <div className='absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer' onClick={()=>setIsShow(!isShow)}>{isShow ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>  }</div>
                </div>            
            </div>
            {formik.touched.password && formik.errors.password ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.password}</span> 
                </div>
            ) : null}
            

            <div className="mb-5">
                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
                            
                <div className='relative'>
                <input name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type={isShow? "text" : "password"} id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <div className='absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer' onClick={()=>setIsShow(!isShow)}>{isShow ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>  }</div>
                </div>
            
            </div>
            {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.rePassword}</span> 
                </div>
            ) : null}
            
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.phone}</span>
                </div>
            ) : null}
            

            { isloading ? <button type="submit" className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"><i className='fa fa-spinner fa-spin dark:text-black'></i></button>
            : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold">Register</button>}
            
            
            
            </form>


        </div>
    
    </>
  )
}
