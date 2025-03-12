
import React, { useContext, useEffect, useMemo } from 'react'
import Styles from './NavbarReact.module.css'

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {TokenContext} from '../Context/TokenContext';
import { CartContext } from '../Context/CartContext';

export default function NavbarReact() {
    let navigate = useNavigate();
    let {Token , setToken} = useContext(TokenContext);
    let {numOfCartItems , GetCart } = useContext(CartContext);
    const [isDarkMode, setIsDarkMode] = useState(false);

     function logout() {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('cartOwner');
        setToken(null)
        navigate('/Login')   
     }

     useEffect(() => {
        if (localStorage.getItem("userToken")) {
            GetCart()
        }
    }, [])
    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark")
      }else{
        document.documentElement.classList.remove("dark")
      }
    }, [isDarkMode])  



  return (
    <>
    
    



<Navbar fluid rounded className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 left-0 right-0 h-[80px] max-h-[300px] md:h-[100px] z-[99] mx-auto px-4 py-5 lg:px-10 shadow">
      
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <i fetchpriority="high" className="fa-solid fa-cart-shopping text-2xl h-6 dark:text-gray-300"></i>
                  <span fetchpriority="high" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FreshCart</span>
        </Link>






        





        <div className="flex items-center bg-transparent flex-row px-0 md:p-4 p-0  font-medium border border-gray-100 rounded-lg bg-gray-50 space-x-5 md:space-x-6 lg:space-x-8 rtl:space-x-reverse flex-row border-0 md:order-2">
                        
          
            <div onClick={()=>setIsDarkMode(!isDarkMode)} className='cursor-pointer'>{isDarkMode? <i className="fa-solid fa-sun text-xl text-white mt-1"></i> : <i className="fa-solid fa-moon text-xl mt-1"></i> }</div>



            {Token ? 
            <div>
                <Link to="cart" className="block text-gray-900 mt-1 rounded-sm hover:bg-gray-100 md:hover:bg-transparent p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition"><i className="fa-solid fa-cart-shopping relative text-xl dark:text-white">{numOfCartItems != 0 ? <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black text-white rounded-full -top-5 -end-5 dark:bg-white dark:text-black">{numOfCartItems}</div> : null}</i></Link>
            </div>
            :null}

            {Token ? (
                <div className="flex items-center">

                    <div className="flex navCollapse space-x-4 md:space-x-2">
                        <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <i className="fa-solid fa-user text-xl text-black dark:text-white"></i>
                        }
                        >
                        <Dropdown.Header>
                            <Link to="/userprofile">
                                <span className="block text-sm">{localStorage.getItem('userName')}</span>
                                <span className="block truncate text-sm font-medium">{localStorage.getItem('userEmail')}</span>
                            </Link>
                        </Dropdown.Header>

                        <Dropdown.Item>
                            <Link to="cart" >Cart</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="allorders">Orders</Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="hover:text-red-500 transition">
                            <a to="login" onClick={() => logout()}>Sign out</a>
                        </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                </div>
                ) : (
                    <div className='md:flex md:gap-x-5'>
                        <div>
                            <Link to="login" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 focus:text-blue-700 cursor-default font-semibold transition">Login</Link>
                        </div>
                        <div>
                            <Link to="register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 focus:text-blue-700 cursor-default font-semibold transition">Register</Link>
                        </div>
                    </div>
                )}

            
            
        </div>



        <Navbar.Collapse>

            <div className='md:space-x-2 lg:space-x-8 flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-lg mt-1'>
                <NavLink to="/" className='bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black text-center'>Home</NavLink>
                <NavLink to="products" className='bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black text-center'>Products</NavLink>
                <NavLink to="cat" className='bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black text-center'>Categories</NavLink>
                <NavLink to="brands" className='bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black text-center'>Brands</NavLink>
                <NavLink to="wishlist" className='bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black text-center'>Wishlist</NavLink>
            </div>

        
        </Navbar.Collapse>





    </Navbar>

    
    </>
  )
}






