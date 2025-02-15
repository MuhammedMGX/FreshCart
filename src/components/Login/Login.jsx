
import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {TokenContext} from '../Context/TokenContext';
import { CartContext } from '../Context/CartContext';



export default function Login() {
    
    const [isShow, setIsShow] = useState(false);
    let Navigate = useNavigate()
    const [message, setmessage] = useState(null)
    const [errmessage, seterrmessage] = useState(null)
    const [isloading, setisloading] = useState(false)



    let {Token , setToken , userInfo , setUserInfo} = useContext(TokenContext);
    

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },


        validationSchema: Yup.object({
            email: Yup.string().required('email is required').email('email is invalid'),
            password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password must contain at least 8 characters, one letter and one number'),
        }),


        onSubmit: (values) => {
            
            loginUser(values);
          
        },
        });



    async function loginUser(values) {
        setisloading(true)
        return await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
            .then((data) => {
                console.log(data);
                localStorage.setItem('userName' , data.data.user.name);
                localStorage.setItem('userEmail' , data.data.user.email);
                localStorage.setItem('userRole' , data.data.user.role);
               
                


                setisloading(false)
                localStorage.setItem('userToken' , data.data.token);
                setToken(data.data.token)

                    setmessage(data.data.message)
                    seterrmessage(null)
                    Navigate('/')
                    
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

            

            <form className=" md:w-1/2 mx-auto mt-20 p-20 shadow-2xl rounded-3xl"  onSubmit={formik.handleSubmit}>

                <h1 className='text-3xl font-semibold mb-5 dark:text-gray-100'>Login Now :</h1>


                { message ? 
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{message}</span>
                </div>
                 : null}


                { errmessage ? 
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{errmessage}</span>
                </div>
                 : null}







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
                <div className='absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer' onClick={()=>setIsShow(!isShow)}>{isShow ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>  }</div>
                </div>

            </div>
            {formik.touched.password && formik.errors.password ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">{formik.errors.password}</span> 
                </div>
            ) : null}

            
            

     
            <div className='flex justify-between'>
                { isloading ? <button type="submit" className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold"><i className='fa fa-spinner fa-spin dark:text-black'></i></button>
                : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="bg-black text-white border-2 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:text-black  dark:bg-transparent dark:text-gray-100 dark:border-gray-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black transition duration-500 text-sm font-bold">Login</button>}
            

                <Link to="/forgetpassword" className='mt-2 hover:text-blue-800 font-normal dark:text-gray-100'>forget your password ?</Link>
            </div>

         


            </form>


        </div>
    
    </>
  )
}