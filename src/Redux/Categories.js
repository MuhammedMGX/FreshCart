import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    let initialState = {
        categories : []
    }


export let getCategories = createAsyncThunk(
    "Categories/getCategories" ,
    async function () {
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        return data
    }
)
export let categoriesSlice = createSlice({
    name: "Categories",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getCategories.fulfilled , (state , action)=>{
            state.categories = action.payload.data
        })
    }
})

export let {categories} = categoriesSlice.actions
export let categoriesReducer = categoriesSlice.reducer