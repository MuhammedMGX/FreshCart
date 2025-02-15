import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    let initialState = {
        brands : []
    }


export let getBrands = createAsyncThunk(
    "Brand/getBrands" ,
    async function () {
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        return data
    }
)
export let brandSlice = createSlice({
    name: "Brand",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getBrands.fulfilled , (state , action)=>{
            state.brands = action.payload.data
        })
    }
})

export let {} = brandSlice.actions
export let brandReducer = brandSlice.reducer