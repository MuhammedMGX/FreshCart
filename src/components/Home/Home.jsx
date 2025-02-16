import React, { useEffect } from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Home() {

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <MainSlider />
        <CatSlider />
        <FeatureProducts />
      </>
    </HelmetProvider>
  )
}
