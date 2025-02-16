import React, { useContext, useEffect } from 'react'
import Styles from './Wishlist.module.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getWishlist , DelWishlist } from '../../Redux/WishlistSlice'
import Loader from '../Loader/Loader'
import { CartContext } from '../Context/CartContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Wishlist() {


let { AddToCart } = useContext(CartContext)
const [isLoading, setIsLoading] = useState(true)

let dispatch = useDispatch()
let {wishlist} = useSelector((state)=> state.wishlistReducer)




async function getAllWishlists() {
  await dispatch(getWishlist());
  setIsLoading(false)
}

async function AddProductToCart(productId) {
   await AddToCart(productId)
}

async function DelProductWishlist(productId) {
  await dispatch(DelWishlist(productId));
  getAllWishlists()
}




useEffect(() => {
  getAllWishlists()
}, [])


  return (
        <HelmetProvider>
    
    <>
    
    
<Helmet>
<title>Wishlist</title>
</Helmet>  
    
                
      
                        
      
  <div className='container py-10 mx-auto mb-20'>

                      

{isLoading ? <Loader/> : <div className='flex flex-wrap justify-center gap-8 '>



  {wishlist.length > 0 ? (
      wishlist.map((product) => (
       
<div key={product._id} className='w-1/2 md:w-1/4 lg:w-1/6 p-4 product rounded-xl overflow-hidden transition duration-500 shadow hover:shadow-2xl  dark:shadow-gray-800 relative dark:bg-gray-800'>

                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <div>
                      <img src={product.imageCover} className='w-full h-full rounded-xl overflow-hidden' alt="" />
                  </div>

                  <div className='flex justify-between pt-1'>
                    <h3 className='text-sm font-semibold dark:text-gray-200'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  </div>

                  <div className='flex justify-between items-center py-1'>
                    <div  className='font-medium text-sm text-gray-500 dark:text-gray-300'><i className='fa fa-star text-black text-xs dark:text-gray-200'></i> {product.ratingsAverage}</div>
                    

                    {product.priceAfterDiscount ? 
                      <div  className='relative flex justify-center font-bold text-sm dark:text-gray-200'>£{product.priceAfterDiscount} 
                          <span className='absolute -bottom-4 text-xs line-through text-gray-500 dark:text-gray-300'>£{product.price}</span>
                      </div>:
                
                      <div  className='relative flex justify-center font-bold text-sm dark:text-gray-200'>£{product.price}</div>
                      } 


                  </div>

                </Link>


                {product.priceAfterDiscount ? 
                  <div className='absolute top-0 left-0 w-[50px] h-[30px] bg-black rounded-br-xl flex justify-center items-center dark:bg-gray-700'>
                      <h3 className='text-white text-xs font-extrabold dark:text-white'>{ Math.round( ((product.priceAfterDiscount - product.price) / product.price) * 100  )}%</h3>
                  </div>:
                  null} 


                
                  <button onClick={() => AddProductToCart(product._id)} className='bg-transparent text-gray-600 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:text-white dark:border-gray-300 dark:hover:text-black dark:hover:bg-gray-200 dark:hover:border-gray-200 transition duration-500 text-sm font-bold mt-3   dark:text-white dark:border-gray-300 dark:hover:bg-black dark:hover:border-black'>Add to Cart</button>
                

              </div>

      ))
    ) : (
      <p>No products available</p>
    )}

</div>}





</div>
    
    
    
    
    
    
    
    
    </>
        </HelmetProvider>
    
  )
}
