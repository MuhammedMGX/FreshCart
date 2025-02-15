import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'
import { Helmet } from 'react-helmet'


export default function Home() {
  return (
    <> 

            <Helmet>
                <title>Home</title>
            </Helmet>
      
        <MainSlider/>
        <CatSlider/>
        <FeatureProducts/>



    </>
  )
}
