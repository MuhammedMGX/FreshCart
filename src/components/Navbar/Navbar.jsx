
import React, { useContext, useEffect, useMemo } from 'react'
import Styles from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {TokenContext} from '../Context/TokenContext';
import { CartContext } from '../Context/CartContext';




export default function Navbar() {

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
    
    
 

<nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 left-0 right-0 h-[80px] max-h-[300px] md:h-[100px] z-[99]">
  <div className=" flex flex-wrap items-center justify-between mx-auto p-4 lg:px-10 h-full">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <i fetchpriority="high" className="fa-solid fa-cart-shopping text-2xl h-6 dark:text-gray-300 mt-1"></i>
            <span fetchpriority="high" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mt-1">FreshCart</span>
        </Link>


        


  <div className="flex items-center md:order-2 space-x-0 md:space-x-0 rtl:space-x-reverse">


  <div className="flex items-center bg-transparent flex-row px-0 md:p-4 p-0  font-medium border border-gray-100 rounded-lg bg-gray-50 space-x-5 md:space-x-5 lg:space-x-8 rtl:space-x-reverse flex-row md:mt-0 border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                
  
                <div onClick={()=>setIsDarkMode(!isDarkMode)} className='cursor-pointer'>{isDarkMode? <i className="fa-solid fa-sun text-xl text-white mt-2"></i> : <i className="fa-solid fa-moon text-xl mt-2"></i> }</div>



                {Token ? 
                <div>
                    <Link to="cart" className="block text-gray-900 mt-2 rounded-sm hover:bg-gray-100 md:hover:bg-transparent p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 focus:text-blue-900 transition"><i className="fa-solid fa-cart-shopping relative text-xl dark:text-gray-300">{numOfCartItems != 0 ? <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black text-white rounded-full -top-5 -end-5 dark:bg-white dark:text-black">{numOfCartItems}</div> : null}</i></Link>
                </div>:null}

                {Token ? (
                    <div className="flex items-center">
                                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                    <button type="button" className="flex bg-white hover:bg-black dark:bg-gray-900 dark:hover:bg-white transition duration-500 items-center text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                                        <div className="relative w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                            <svg className="absolute w-9 h-9 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                                        </div>
                                    </button>
                                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600 p-3" id="user-dropdown">
                                        <Link to="/userprofile" className="flex">
                                            <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">{localStorage.getItem('userName')}</span>
                                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{localStorage.getItem('userRole')}</span>
                                            </div>
                                        </Link>
                                        <ul className="py-2" aria-labelledby="user-menu-button">

                                        <li>
                                            <Link to="cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition">Cart</Link>
                                        </li>

                                        <li>
                                            <Link to="allorders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition">Orders</Link>
                                        </li>
                                        
                                        <li>
                                            <a to="login" onClick={() => logout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:text-red-500 transition">Sign out</a>
                                        </li>
                                        </ul>
                                    </div>       
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



      <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>


  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mt-1" id="navbar-cta">
    <ul className="flex flex-col items-center text-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <ul className="w-full flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className='py-2 md:py-0'>
                <NavLink to="/" className="bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black">Home</NavLink>
            </li>
            <li className='py-2 md:py-0'>
                <NavLink to="products" className="bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black  ">Products</NavLink>
            </li>
            <li className='py-2 md:py-0'>
                <NavLink to="cat" className="bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black">Categories</NavLink>
            </li>
            <li className='py-2 md:py-0'>
                <NavLink to="brands" className="bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black ">Brands</NavLink>
            </li>
            <li className='py-2 md:py-0'>
                <NavLink to="wishlist" className="bg-transparent text-gray-600 dark:text-gray-100 px-3 py-2 rounded-full hover:bg-black hover:text-white transition duration-500 text-sm font-bold dark:hover:bg-white dark:hover:text-black">Wishlist</NavLink>
            </li>
            </ul> 
    </ul>
  </div>
  </div>
</nav>


    
    </>
  )
}









