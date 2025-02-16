import React from 'react'
import Styles from './Settings.module.css'
import { Link } from 'react-router-dom'

export default function Settings() {
  return (
    <>
    
    
    
    <div className="container mx-auto w-3/4 my-10 flex flex-col items-center">
    
                


    
                 <div className='w-full border-gray-300 border-y-2 p-5 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                  <div>
                    <h2 className='text-lg  dark:text-gray-200'>Password</h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Change Your Password</p>
                  </div>
                    <Link to="/ChangePassword" type="button" className="bg-black text-gray-200 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:bg-white  dark:text-black dark:border-gray-300 dark:hover:bg-black dark:hover:text-white dark:hover:border-black transition duration-500 text-[10px] md:text-sm font-bold ">Change Password</Link>
                 </div>

                 <div className='w-full p-5 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                  <div>
                    <h2 className='text-lg dark:text-gray-200'>User Info</h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Update User Info</p>
                  </div>
                    <Link to="/UpdateUserInfo" type="button" className="bg-black text-gray-200 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:bg-white  dark:text-black dark:border-gray-300 dark:hover:bg-black dark:hover:text-white dark:hover:border-black transition duration-500 text-[10px] md:text-sm font-bold ">Update user data</Link>
                  </div>

                 <div className='w-full border-gray-300 border-y-2 p-5 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
                  <div>
                    <h2 className='text-lg dark:text-gray-200'>Addrees</h2>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Update Your Address</p>
                  </div>

                    <div className='flex flex-col'>
                      <Link to="/Address" type="button" className="bg-black text-gray-200 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:bg-white  dark:text-black dark:border-gray-300 dark:hover:bg-black dark:hover:text-white dark:hover:border-black transition duration-500 text-[10px] md:text-sm font-bold ">Add Address</Link>
                    </div>
                  </div>

              
  
    
    </div>
    
    
    
    </>
  )
}
