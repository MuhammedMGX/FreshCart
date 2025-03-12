import { useState } from 'react'

import './App.css'
import image from "./assets/wifi.png"
import Footer from './components/Footer/Footer'
import Layout from './components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import BrandsDetails from './components/BrandsDetails/BrandsDetails'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders'

import UserProfile from './components/UserProfile/UserProfile'
import Wishlist from './components/Wishlist/Wishlist'
import ChangePassword from './components/ChangePassword/ChangePassword'
import UpdateUserInfo from './components/UpdateUserInfo/UpdateUserInfo'
import { Offline } from 'react-detect-offline'
import Address from './components/Address/Address'
import UserInfo from './components/UserInfo/UserInfo'
import Settings from './components/Settings/Settings'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'





function App() {




  const queryClient = new QueryClient()

  
  let routes = createBrowserRouter([
    {path:"" , element:<Layout/> , children:[
      {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"products" , element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"brands" , element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"cart" , element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"wishlist" , element:<ProtectedRoutes><Wishlist/></ProtectedRoutes>},
      {path:"cat" , element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"checkout" , element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
      {path:"allorders" , element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
      {path:"userprofile" , element:<ProtectedRoutes><UserProfile/></ProtectedRoutes> , children:[
        {index:true , element:<ProtectedRoutes><UserInfo/></ProtectedRoutes>},
        {path:"settings" , element:<ProtectedRoutes><Settings/></ProtectedRoutes>},
      ]},


      {path:"changepassword" , element:<ProtectedRoutes><ChangePassword/></ProtectedRoutes>},
      {path:"updateuserinfo" , element:<ProtectedRoutes><UpdateUserInfo/></ProtectedRoutes>},
      {path:"address" , element:<ProtectedRoutes><Address/></ProtectedRoutes>},

      {path:"login" , element:<ProtectedAuth><Login/></ProtectedAuth>},
      {path:"register" , element:<ProtectedAuth><Register/></ProtectedAuth>},
      {path:"forgetpassword" , element:<ProtectedAuth><ForgetPassword/></ProtectedAuth>},
      {path:"verifycode" , element:<ProtectedAuth><VerifyCode/></ProtectedAuth>},
      {path:"resetpassword" , element:<ProtectedAuth><ResetPassword/></ProtectedAuth>},
      
      {path:"productdetails/:id/:category" , element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
      {path:"brandsDetails/:id" , element:<ProtectedRoutes><BrandsDetails/></ProtectedRoutes>},
      {path:"categoriesDetails/:id" , element:<ProtectedRoutes><CategoriesDetails/></ProtectedRoutes>},
      {path:"*" , element:<NotFound/>}

    ]}
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Toaster  position="top-center" reverseOrder={false}/>
        <RouterProvider router={routes}></RouterProvider>
          <Offline>
              <div className='w-full fixed flex justify-center'>
                <img src={image} className='w-[200px] h-[200px]' alt="" />
              </div>
          </Offline>
      </QueryClientProvider>
    </>
  )
}

export default App
