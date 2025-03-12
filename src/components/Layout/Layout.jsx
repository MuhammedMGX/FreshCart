import React from 'react'
import Styles from './Layout.module.css'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import NavbarReact from '../NavbarReact/NavbarReact'

export default function Layout() {
  return (
    <>
    
    
    <NavbarReact/>
    <Outlet/>
    <Footer/>
    
    </>
  )
}
