import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

let initialState = {
    wishlist: []
}

export let addWishlist = createAsyncThunk(
    "Wishlist/addWishlist",
    async function (productId) {
        return await axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            )
            .then((response) => {
                console.log(response.data.message);
                toast.success(response.data.message);
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
                return err.response.data;
            });
    }
)

export let getWishlist = createAsyncThunk(
    "Wishlist/getWishlist",
    async function () {
        return await axios
            .get(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.log(err.response.data);
                return err.response.data;
            });
    }
)



export let DelWishlist = createAsyncThunk(
    "Wishlist/DelWishlist",
    async function (productId) {
        return await axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            )
            .then((response) => {
                toast.success(response.data.message);
                return response.data;
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.message);
                return err.response.data;
            });
    }
)





export let wishlistSlice = createSlice({
    name: "Wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addWishlist.fulfilled, (state, action) => {
            
        })
        builder.addCase(getWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload.data
        })
        builder.addCase(DelWishlist.fulfilled, (state, action) => {

        })
    }
})

export let {} = wishlistSlice.actions
export let wishlistReducer = wishlistSlice.reducer