import React from 'react'
import Styles from './Loader.module.css'
import { ColorRing } from 'react-loader-spinner'

export default function Loader() {
  return (
    <><ColorRing
    visible={true}
    height="80"
    width="80"
    ariaLabel="color-ring-loading"
    wrapperStyle={{}}
    wrapperClass="color-ring-wrapper h-screen flex justify-center items-center mx-auto"
    colors={['#0EA5E9', '#0EA5E9', '#0EA5E9', '#0EA5E9', '#0EA5E9']}
    /></>
  )
}
