import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import { Helmet, HelmetProvider } from 'react-helmet-async';



export default function Products() {
  return (
<HelmetProvider>
    <>


        
<Helmet>
<title>Products</title>
</Helmet>  
    
   
    <FeatureProducts/>
    </>
</HelmetProvider>
  )
}
