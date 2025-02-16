import React, { useState } from 'react'
import Styles from './UserInfo.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';

export default function UserInfo() {



const [address, setAddress] = useState([])


 async function GetAddrees() {
  return await axios
    .get("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then((response) => {
      setAddress(response.data.data)
      return response;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
}


async function DelAddrees(addressId) {
  return await axios
    .delete(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    })
    .then((response) => {
      console.log(response);
      GetAddrees()
      return response;
    })
    .catch((err) => {
      // console.log(err);
      return err;
    });
}



useEffect(() => {
  GetAddrees()
}, [])




  return (
    <>
    
    
    
    
    
    <div className="container w-2/3 flex flex-col mb-36">
    
        <htmlForm className="w-full grid gap-y-4 grid-rows-3 grid-cols-2">

          <div className="w-full px-2 col-span-1 row-span-1">
            <label htmlFor="email-address-icon" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Name</label>
              <div className="relative">
                  <input type="text" className="rounded-xl cursor-pointer w-full font-semibold shadow-lg" value={localStorage.getItem("userName")} readOnly/>  
              </div>
          </div>


          <div className="w-full px-2 col-span-1 row-span-1">
            <label htmlFor="email-address-icon" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Email</label>
              <div className="relative">
                  <input type="text" className="rounded-xl cursor-pointer w-full font-semibold shadow-lg" value={localStorage.getItem("userEmail")} readOnly/>  
              </div>
          </div>


          <div className="w-full px-2 col-span-1 row-span-1">
                <label htmlFor="email-address-icon" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Phone</label>
                  <div className="relative">
                      <input type="text" className="rounded-xl cursor-pointer w-full font-semibold shadow-lg" value={localStorage.getItem("userPhone")} readOnly/>  
                  </div>
              </div>


              <div className="w-full px-2 col-span-1 row-span-1">
                <label htmlFor="email-address-icon" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Role</label>
                  <div className="relative">
                      <input type="text" className="rounded-xl cursor-pointer w-full font-semibold shadow-lg" value={localStorage.getItem("userRole")} readOnly/>  
                  </div>
              </div>


        </htmlForm>




        <h1 className='text-2xl font-bold ms-5 dark:text-gray-200'>Address :</h1>



      {address.map((item)=> <table key={item._id}  className=" rounded-lg overflow-hidden w-[90%] mx-auto text-sm text-left rtl:text-right shadow-xl text-gray-500 dark:text-gray-400 my-3">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              
              <th scope="col" colSpan="1" className="px-6 py-3 flex justify-between items-center">
                <h3 className='font-extrabold text-black dark:text-gray-200'>Address {address.indexOf(item)+1}</h3>
                <Link onClick={()=>DelAddrees(item._id)} type="button" className="bg-black text-gray-200 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:bg-white  dark:text-black dark:border-gray-300 dark:hover:bg-black dark:hover:text-white dark:hover:border-black transition duration-500 text-[8px] md:text-sm font-bold">Delete Address</Link>
              </th>
            </tr>
          </thead>
          <tbody>

          <tr className="rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-start w-1/2">
                  <p>Name : {item.name}</p>
              </td>
          </tr>

          <tr className="rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-start w-1/2">
                  <p>Details :{item.details}</p>
              </td>
          </tr>

          <tr className="rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-start w-1/2">
                  <p>Phone : {item.phone}</p>
              </td>
          </tr>

          <tr className="rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-start w-1/2">
                  <p>City : {item.city}</p>
              </td>
          </tr>

          </tbody>
          </table> )}

    
    
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
