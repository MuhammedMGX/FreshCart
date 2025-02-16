import React, { useContext, useEffect, useState } from 'react'
import Styles from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Cart() {

const [isLoading, setIsLoading] = useState(true)

const [cartItems, setCartItems] = useState([])
const [isDropdownOpen, setIsDropdownOpen] = useState(false)







let { GetCart , RemoveItem , updateItem , ClearItem , totalCartPrice} = useContext(CartContext)


async function GetAllCart() {
  let response = await GetCart()
  setCartItems(response.data.data.products)
  setIsLoading(false)
  
}


async function RemoveCartItem(productId) {
  let response = await RemoveItem(productId)
  // console.log(response.data.data.products);
  setCartItems(response.data.data.products)

  
}



async function UpdateCartItem(productId , count) {
  let response = await updateItem(productId , count)
  // console.log(response.data.data.products);
  setCartItems(response.data.data.products)

  
}



async function ClearCartItem() {
  let response = await ClearItem()
  setCartItems([])

  
}

// =================================================================================




useEffect(() => {
  GetAllCart()
  
}, [])




  return (
        <HelmetProvider>
    
    <>
    
<Helmet>
<title>Cart</title>
</Helmet>


{isLoading ? <Loader/> : <div className="relative container mx-auto overflow-x-auto sm:rounded-lg my-10 p-10">
    <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between px-20">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search" className=" block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
        </div>
        <button onClick={()=>ClearCartItem()} className='bg-transparent text-red-500 border-2 border-red-400 px-3 py-1 rounded-full hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-500 text-sm font-bold mt-3'>Clear Cart</button>
      </div>


  <table className="w-full rounded-lg overflow-hidden mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-30 border shadow-xl">
    <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3 text-center">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Product
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Price
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Total Price
        </th>
        <th scope="col" className="px-6 py-3 text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartItems.map((item)=><tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full rounded-lg" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
        {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>UpdateCartItem(item.product.id , item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{item.count}</span>
            </div>
            <button onClick={()=>UpdateCartItem(item.product.id , item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
        £{item.price}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
        £{item.price * item.count}
        </td>
        <td className="px-6 py-4 text-center">
          <a onClick={()=>RemoveCartItem(item.product.id)} className="cursor-default bg-transparent text-gray-600 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold mt-3 dark:text-gray-200">Remove</a>
        </td>
      </tr>)}

      <tr className=" bg-white rounded-lg p-5 text-center font-bold text-black text-xl border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          


            <td colSpan={6} className='w-full px-10 relative h-40'>

               <div className='flex justify-between'>
                    <h2 className="bg-transparent p-5 font-extrabold dark:bg-transparent dark:text-gray-200">Total Price</h2>
                    <h2 className="bg-transparent p-5 font-extrabold dark:bg-transparent dark:text-gray-200" >{totalCartPrice}</h2>

                        <button id="dropdownDefaultButton" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className=" bg-transparent text-gray-600 border-2 border-gray-400 px-5 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold mt-3 dark:text-gray-200" type="button">Checkout</button>
                          {isDropdownOpen && (
                          <div id="dropdown" className="z-10 bg-gray-100 divide-y divide-gray-200 rounded-xl shadow-lg w-44 dark:bg-gray-700 absolute -top-10 right-2">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="dropdownDefaultButton">
                            <li>
                                          <Link to="/checkout" state={{type:"Online payment"}} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white">Online Payment</Link>
                                        </li>
                                        <li>
                                          <Link to="/checkout" state={{type:"Cash on Delivery"}} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white">Cash</Link>
                                        </li>
                            </ul>
                          </div>
                          )}
                  </div>

            </td>

            

      </tr>
      



                   
      
      
    </tbody>


  </table>




</div>}



    
    </>
        </HelmetProvider>
    
  )
}
