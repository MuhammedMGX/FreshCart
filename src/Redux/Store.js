import { configureStore } from '@reduxjs/toolkit'
import { brandReducer } from './BrandSlice'
import { categoriesReducer } from './Categories'
import { wishlistReducer } from './WishlistSlice'

export let store = configureStore({
  reducer: {
    brandReducer: brandReducer,
    categoriesReducer: categoriesReducer,
    wishlistReducer: wishlistReducer
  },
})