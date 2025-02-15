import React, { useEffect } from 'react'
import Styles from './UserProfile.module.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function UserProfile() {








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
 



  return (
    <>



        
<Helmet>
<title>User Profile</title>
</Helmet>  
    
   

      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <div className="grid grid-rows-4 grid-cols-4">
        <aside id="default-sidebar" className="col-span-1 row-span-4 w-full top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
            <ul className="space-y-2 font-medium px-2 flex flex-col items-start">
              
              <h1 className='text-2xl font-extrabold mx-auto my-4 dark:text-gray-100'>User Profile</h1>

                  <li className='w-full'>
                    <Link to="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <i className="fa-solid fa-user text-xl shrink-0 w-5 h-5 text-gray-500 transition duration-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-start"></i>
                      <span className="flex-1 ms-3 whitespace-nowrap">User info</span>
                    </Link>
                  </li>
                  <li className='w-full'>
                    <Link to="/allorders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <i className="fa-solid fa-bag-shopping text-xl shrink-0 w-5 h-5 text-gray-500 transition duration-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-start"></i>
                      <span className="ms-3">Orders</span>
                    </Link>
                  </li>
              
    
                  <li className='w-full'>
                      <Link to="/cart" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="fa-solid fa-cart-shopping text-xl shrink-0 w-5 h-5 text-gray-500 transition duration-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white scale-x-[-1] text-start"></i>
                        <span className="flex-1 ms-3 whitespace-nowrap">Cart</span>
                      </Link>
                  </li>



                  <li className='w-full'>
                      <Link to="/wishlist" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="fa-solid fa-heart text-xl shrink-0 w-5 h-5 text-gray-500 transition duration-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-start"></i>
                        <span className="flex-1 ms-3 whitespace-nowrap">Wishlist</span>
                      </Link>
                  </li>




                  <li className='w-full'>
                      <Link to="settings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="fa-solid fa-gear text-xl shrink-0 w-5 h-5 text-gray-500 transition duration-400 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-start"></i>
                        <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
                      </Link>
                  </li>
              
                  
                  <li className='w-full'>
                      <Link onClick={()=>logout()} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <i class="fa-solid fa-right-from-bracket text-red-500 text-xl shrink-0 w-5 h-5 text-gray-500 transition duration-400 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-white text-start"></i>
                        <span className="flex-1 ms-3 whitespace-nowrap font-bold text-red-500">LogOut</span>
                      </Link>
                  </li>
                </ul>


            </div>
          </aside>





          <div className="col-span-3 row-span-1 container px-28 w-full flex flex-row items-center my-8">

                      

                <div className="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 m-5">
                    <svg className="absolute w-40 h-40 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>

                <div>
                  <h1 className='text-4xl font-bold dark:text-gray-200'>{localStorage.getItem('userName')}</h1>
                  <p className='text-black font-semibold ps-1 dark:text-gray-200'>{localStorage.getItem('userRole')}</p>
                </div>
                


          </div>







          <div className="col-span-3 row-span-4 container mx-auto w-full flex flex-col items-center">

            <Outlet/>

          </div>



</div>




    </>
  )
}
