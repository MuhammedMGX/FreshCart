import React, { useContext, useEffect, useState } from 'react'
import Styles from './ProductDetails.module.css'
import { data, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext';
import { useDispatch } from 'react-redux';
import { addWishlist, getWishlist } from '../../Redux/WishlistSlice';




export default function ProductDetails() {

  let dispatch = useDispatch()
  const [wishlistId, setWishlistId] = useState([])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };


  
    let { AddToCart } = useContext(CartContext)
  
  async function AddProductToCart(productId) {
  
    let response = await AddToCart(productId)
    console.log(response);
    
    
  }
  
  

  let {id , category} = useParams()
  

  const [productDetails, setproductDetails] = useState({})
  const [inLoading, setinLoading] = useState(true)
  const [RelatedProducts, setRelatedProducts] = useState([])
  
  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data) => {
      console.log(data?.data.data.quantity);
      setproductDetails(data?.data.data)
      setinLoading(false)
    }
    ).catch((error) => {
      console.log(error);
      setinLoading(false)
    })
    
  }

  async function getRelatedProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data) => {
      let related = data?.data.data;
      related = related.filter((product)=> product.category.name === category)
      setRelatedProducts(related);
      // console.log(related);

      
    }
    ).catch((error) => {
      console.log(error);
      setinLoading(false)
    })
    
  }



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
    getProductDetails()
    getRelatedProducts()
  }, [])


  useEffect(() => {
    getProductDetails()
  }, [id])

  







  const getStarRating = (rating) => {
    const totalStars = 5; // Total number of stars
    const fullStars = Math.floor(rating); // Full stars
    const hasHalfStar = rating % 1 !== 0; // Check for half star
  
    // Create the star string
    const stars = '★'.repeat(fullStars) + (hasHalfStar ? '⯪' : '') + '☆'.repeat(totalStars - fullStars - (hasHalfStar ? 1 : 0));
  
    return stars;
  };
  
  // RatingStars component
  const RatingStars = ({ rating }) => {
    return (
      <div style={{ fontSize: '19px', color: '#FACA2C' }}>
        {getStarRating(rating)}
      </div>
    );
  };
  











  
  return (
    <>
    
    <div className='container mx-auto my-20'>

      {inLoading ? <Loader/> : null}


      <div className='flex justify-center px-5'>

        <div className="w-full md:w-1/2 relative rounded-xl">
        <Slider {...settings}>

          {productDetails.images?.map((src) => (<img key={src} src={src} className='rounded-2xl' alt="" />))}
      
        </Slider>

        <div className='absolute top-0 right-0'>
        <button className='bg-black m-2 px-4 py-3 rounded-full hover:bg-white hover:text-black text-white text-xs transition duration-500 dark:bg-gray-700'><i class="fa-solid fa-share-nodes"></i></button>
        </div>


        {productDetails.priceAfterDiscount ? 
            <div className='absolute top-0 left-0 w-[50px] h-[30px] bg-black rounded-br-xl rounded-tl-xl flex justify-center items-center dark:bg-gray-700'>
                <h3 className='text-white text-xs font-extrabold'>{ Math.round( ((productDetails.priceAfterDiscount - productDetails.price) / productDetails.price) * 100  )}%</h3>
            </div>:
            null} 

          
        </div>





        <div className="w-full md:w-1/2 p-10">

      
          
            <h2 className='text-black font-extrabold text-3xl dark:text-gray-200'>{productDetails.title}</h2>
            <p className="w-full flex items-center"><RatingStars rating={productDetails.ratingsAverage} /> <span className='px-2 font-bold text-sm text-gray-400'>{productDetails.ratingsQuantity} reviews</span></p>



            


            {productDetails.priceAfterDiscount ? 
                      <div  className='flex'>
                          <h1 className='text-5xl font-extrabold my-6 dark:text-gray-200'>£{productDetails.priceAfterDiscount}</h1>
                          <h1 className='text-2xl font-extrabold my-6 mx-3 self-end line-through text-gray-500 dark:text-gray-400'>£{productDetails.price}</h1>
                      </div>:
                
                        <h1 className='text-5xl font-extrabold my-6 dark:text-gray-200'>£{productDetails.price}</h1>
                      } 



            <hr />
            <h3 className='text-gray-500 font-medium px-2 pt-5 pb-3 dark:text-gray-300'>{productDetails.description}</h3>
            <p className='text-gray-500 font-semibold px-2 pb-5 dark:text-gray-200'>{productDetails.category?.name}</p>
            <hr />

            {(productDetails.category?.name === "Men's Fashion" || productDetails.category?.name === "Women's Fashion") ?
            
            <div className='flex my-5 gap-x-2 px-1'>

              <button className="cursor-default bg-transparent text-black border-2 border-gray-600 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold dark:text-gray-200  dark:border-gray-200  dark:hover:bg-gray-200 dark:hover:text-black">S</button>
              <button className="cursor-default bg-transparent text-black border-2 border-gray-600 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold dark:text-gray-200  dark:border-gray-200  dark:hover:bg-gray-200 dark:hover:text-black">M</button>
              <button className="cursor-default bg-transparent text-black border-2 border-gray-600 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold dark:text-gray-200  dark:border-gray-200  dark:hover:bg-gray-200 dark:hover:text-black">L</button>
              <button className="cursor-default bg-transparent text-black border-2 border-gray-600 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold dark:text-gray-200  dark:border-gray-200  dark:hover:bg-gray-200 dark:hover:text-black">XL</button>


            </div>
            
            
            :null}

            <hr />
            <div className='flex items-center pt-5 text-sm px-1'>
              <button onClick={()=>AddProductToCart(productDetails._id)} className='hover:bg-transparent w-[50%] hover:text-gray-600 border-2 hover:border-gray-400 px-3 py-3 rounded-full bg-black border-black text-white transition duration-500 text-sm font-extrabold  dark:text-black dark:bg-gray-200 dark:border-gray-200  dark:hover:bg-gray-800 dark:hover:text-gray-200'>Add to Cart</button>
              <button onClick={() => addToWishlists(productDetails._id)} className='bg-transparent mx-2 text-gray-600 border-2 border-gray-400 px-6 py-3 rounded-full hover:bg-black hover:border-black hover:text-white transition duration-500 text-sm font-bold dark:border-gray-200  dark:hover:bg-gray-200'>{wishlistId.includes(productDetails._id) ? <i className="fa-solid fa-heart text-red-500"></i> : <i className="fa-regular fa-heart text-red-500"></i>}</button>
            </div>
            <p className='py-3 ps-3 font-semibold text-gray-700 text-sm dark:text-gray-200'><i class="fa-solid fa-truck-fast"></i>  Free delivery on orders over £350</p>

        </div>








      </div>













    
    <div className='container py-10 mx-auto'>
      
        <h1 className='text-center mt-20 mb-7 font-extrabold text-xl dark:text-gray-200'>Related Products</h1>
         <div className='flex flex-wrap justify-center gap-8'>

        

          {RelatedProducts.map((product) => (
          
             
              <div key={product._id} className='w-1/2 md:w-1/4 lg:w-1/5 p-4 product rounded-xl overflow-hidden transition duration-500 shadow hover:shadow-2xl dark:shadow-gray-800 dark:hover:shadow-3xl relative'>
              
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
              
                                <button>
                                  <button onClick={() => addToWishlists(product._id)} className='btnH text-xl text-white px-2 rounded mx-auto absolute top-5 right-3'>{wishlistId.includes(product._id) ? <i className="fa-solid fa-heart text-red-500"></i> : <i className="fa-regular fa-heart text-red-500"></i>}</button>
                                </button>

                                {product.priceAfterDiscount ? 
                                  <div className='absolute top-0 left-0 w-[50px] h-[30px] bg-black rounded-br-xl flex justify-center items-center dark:bg-gray-700'>
                                      <h3 className='text-white text-xs font-extrabold dark:text-white'>{ Math.round( ((product.priceAfterDiscount - product.price) / product.price) * 100  )}%</h3>
                                  </div>:
                                  null} 
              
                              
                                <button onClick={() => AddProductToCart(product._id)} className='bg-transparent text-gray-600 border-2 border-gray-400 px-3 py-1 rounded-full hover:bg-black hover:border-black hover:text-white dark:text-white dark:border-gray-300 dark:hover:text-black dark:hover:bg-gray-200 dark:hover:border-gray-200 transition duration-500 text-sm font-bold mt-3'>Add to Cart</button>
                              
              
                            </div>
            
          ))}

        </div>

      

        

    </div>









    </div>




















    
    </>
  )
}
