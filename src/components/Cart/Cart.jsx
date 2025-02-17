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
  setCartItems(response.data.data.products)

  
}



async function UpdateCartItem(productId , count) {
  let response = await updateItem(productId , count)
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


{isLoading ? <Loader/> : <div className="relative container mx-auto sm:rounded-lg my-2 p-10 ">
                                <div className="pb-4 bg-white dark:bg-gray-900 flex justify-between">
                                    <button onClick={()=>ClearCartItem()} className='bg-transparent text-red-500 border-2 border-red-400 px-3 py-1 rounded-full hover:bg-red-500 hover:border-red-500 hover:text-white transition duration-500 text-sm font-bold mt-3'>Clear Cart</button>
                                </div>



                              {cartItems.length > 0 ?  <div className="flex flex-wrap justify-center md:gap-2 rounded-xl text-sm text-gray-500 dark:text-gray-400 shadow-xl">
                                    


                                    
                                      {cartItems.map((item)=>
                                      
                                      <div key={item.product.id} className='w-1/2 md:w-1/4 lg:w-1/5 min:h-[360px] p-4 product rounded-xl overflow-hidden transition duration-500 shadow hover:shadow-2xl  dark:shadow-gray-800 dark:hover:shadow-3xl relative dark:bg-gray-800'>

                                            <div>
                                                <img loading="lazy" src={item.product.imageCover} className='w-full h-full rounded-xl overflow-hidden' alt="" />
                                            </div>

                                            
                                              <h3 className='text-sm font-semibold dark:text-gray-200 text-black text-center text-black'>{item.product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                           



                                            <div className="flex justify-center items-center my-3">
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




                                            <div className='flex justify-around items-center py-1'>

                                              {item.priceAfterDiscount ? 
                                                <div  className=' flex flex-col relative flex justify-center font-bold text-sm text-black dark:text-gray-200 w-[40px]'>
                                                  <p>Price</p>
                                                  £{item.priceAfterDiscount} 
                                                    <span className='absolute -bottom-4 text-xs line-through text-black dark:text-gray-300 w-[40px]'>
                                                      £{item.price}
                                                    </span>
                                                </div>:
                                          
                                                <div  className=' flex flex-col relative flex justify-center font-bold text-sm text-black dark:text-gray-200 w-[40px]'>
                                                  <p>Price</p>
                                                  £{item.price}
                                                </div>
                                                } 

                                                <div className=" flex flex-col font-semibold text-gray-900 dark:text-white text-center w-[40px]">
                                                  <p>Total</p>
                                                    £{item.price * item.count}
                                                </div>

                                            </div>


                                              <div className="px-6 py-4 text-center">
                                                <a onClick={()=>RemoveCartItem(item.product.id)} className="cursor-default bg-transparent text-gray-600 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold mt-3 dark:text-gray-200">Remove</a>
                                              </div>

                                    
                                              {item.priceAfterDiscount ? 
                                              <div className='absolute top-0 left-0 w-[50px] h-[30px] bg-black rounded-br-xl flex justify-center items-center dark:bg-gray-700'>
                                                  <h3 className='text-white text-xs font-extrabold dark:text-white'>{ Math.round( ((item.priceAfterDiscount - item.price) / item.price) * 100  )}%</h3>
                                              </div>:
                                              null} 
                                                      

                                      </div>
                                    
                                    
                                    )}

                                          


                                            <div className='w-full md:px-10 relative p-6'>

                                              <div className='flex justify-between items-center'>
                                                <div className='flex flex-col md:flex-row gap-4'>
                                                    <h2 className="bg-transparent font-extrabold dark:bg-transparent dark:text-gray-200 text-black">Total Price</h2>
                                                    <h2 className="bg-transparent font-extrabold dark:bg-transparent dark:text-gray-200 text-black" >£{totalCartPrice}</h2>
                                                </div>
                                                    

                                                        <button id="dropdownDefaultButton" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className=" bg-transparent text-gray-600 border-2 border-gray-400 px-5 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold mt-3 dark:text-gray-200" type="button">Checkout</button>
                                                          {isDropdownOpen && (
                                                          <div id="dropdown" className="z-10 bg-gray-100 divide-y divide-gray-200 rounded-xl shadow-lg w-44 dark:bg-gray-700 absolute -top-16 -right-8  md:-top-10 md:right-2">
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

                                            </div>
                                  
                            </div> :null}

                              
                            


                                        


                            </div>}



    
    </>
        </HelmetProvider>
    
  )
}
