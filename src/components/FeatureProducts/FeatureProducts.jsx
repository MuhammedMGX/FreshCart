import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { useDispatch } from 'react-redux';
import { addWishlist, getWishlist } from '../../Redux/WishlistSlice';


export default function FeatureProducts() {

  let dispatch = useDispatch()
  const [wishlistId, setWishlistId] = useState([])
  const [search, setSearch] = useState("")

  let { AddToCart } = useContext(CartContext)

  async function AddProductToCart(productId) {
    let response = await AddToCart(productId)
  }

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["FeatureProducts"],
    queryFn: getProducts
  })

  useEffect(() => {
    if (data?.data?.data) {
      setWishlistId(data.data.data.map(item => item._id));
    }
  }, [data])

  async function addToWishlists(productId) {
    await dispatch(addWishlist(productId));
    getAllWishlists()
  }

  async function getAllWishlists() {
    let rec = await dispatch(getWishlist());
    setWishlistId(rec.payload.data.map((item) => item._id));
  }

  useEffect(() => {
    getAllWishlists()
  }, [])



  return (
    <>
      <div className='container py-10 mx-auto mb-20'>
        <form className="my-5 px-10">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block shadow-lg dark:shadow-lg dark:shadow-gray-800 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10" placeholder="Search Mockups, Logos..." required />
            <button type="submit" className="absolute end-2.5 bottom-2 mt-1 bg-transparent text-gray-600 border-2 border-gray-400 hover:bg-black transition duration-500 hover:text-white font-bold hover:border-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-4 py-2 dark:bg-black dark:hover:bg-gray-800 dark:text-white dark:border-black">Search</button>
          </div>
        </form>

        {isLoading ? <Loader /> : <div className='flex flex-wrap justify-center gap-0 md:gap-8 '>
          {data?.data?.data.length > 0 ? (
            data?.data?.data.filter((item) => { return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search) }).map((product) => (

              <div key={product._id} className='w-1/2 md:w-1/4 lg:w-1/5 p-4 product rounded-xl overflow-hidden transition duration-500 shadow hover:shadow-2xl  dark:shadow-gray-800 dark:hover:shadow-3xl relative dark:bg-gray-800'>

                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <div>
                      <img src={product.imageCover} className='w-full h-full rounded-xl overflow-hidden' alt="" />
                  </div>

                  <div className='flex justify-between pt-1'>
                    <h3 className='text-sm font-semibold dark:text-gray-200'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  </div>

                  <div className='flex justify-between items-center py-1'>
                    <div  className='font-medium text-sm text-gray-500 dark:text-gray-300'><i className='fa fa-star text-black dark:text-gray-200 text-xs'></i> {product.ratingsAverage}</div>

                    

                    {product.priceAfterDiscount ? 
                      <div  className='relative flex justify-center font-bold text-sm dark:text-gray-200'>£{product.priceAfterDiscount} 
                          <span className='absolute -bottom-4 text-xs line-through text-gray-500 dark:text-gray-300'>£{product.price}</span>
                      </div>:
                
                      <div  className='relative flex justify-center font-bold text-sm dark:text-gray-200'>£{product.price}</div>
                      } 
                      
                    

                  </div>

                </Link>

                <button onClick={() => addToWishlists(product._id)} className='btnH text-xl text-white px-2 rounded mx-auto absolute top-5 right-3'>
                  {wishlistId.includes(product._id) ? <i className="fa-solid fa-heart text-red-500"></i> : <i className="fa-regular fa-heart text-red-500"></i>}
                </button>

                   {product.priceAfterDiscount ? 
                  <div className='absolute top-0 left-0 w-[50px] h-[30px] bg-black rounded-br-xl flex justify-center items-center dark:bg-gray-700'>
                      <h3 className='text-white text-xs font-extrabold dark:text-white'>{ Math.round( ((product.priceAfterDiscount - product.price) / product.price) * 100  )}%</h3>
                  </div>:
                  null} 
                  

                
                  <button onClick={() => AddProductToCart(product._id)} className='bg-transparent text-gray-600 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:text-white dark:border-gray-300 dark:hover:text-black dark:hover:bg-gray-200 dark:hover:border-gray-200 transition duration-500 text-sm font-bold mt-3'>Add to Cart</button>
                

              </div>

            ))
          ) : (
            <p>No products available</p>
          )}
        </div>}
      </div>
    </>
  )
}
