import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    cartItems: [],
    isLoadng: false
}

export const addToCart = createAsyncThunk("cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/api/shop/cart/add`, {
            userId,
            productId,
            quantity
        })
        return response.data;
    }
)
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems",
    async (userId ) => {
        const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`)
        return response.data;
    }
)
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem",
    async ({ userId, productId }) => {
        const response = await axios.delete(`http://${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`, {})
        return response.data;
    }
)
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(`http://${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`, {
            userId,
            productId,
            quantity
        })
        return response.data;
    }
)

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoadng = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoadng = false,
                state.cartItems = action.payload?.data
        }).addCase(addToCart.rejected, (state,) => {
            state.isLoadng = false,
                state.cartItems = []
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoadng = true
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoadng = false,
                state.cartItems = action.payload?.data
        }).addCase(fetchCartItems.rejected, (state,) => {
            state.isLoadng = false,
                state.cartItems = []
        }).addCase(updateCartQuantity.pending, (state) => {
            state.isLoadng = true
        }).addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoadng = false,
                state.cartItems = action.payload?.data
        }).addCase(updateCartQuantity.rejected, (state,) => {
            state.isLoadng = false,
                state.cartItems = []
        }).addCase(deleteCartItem.pending, (state) => {
            state.isLoadng = true
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoadng = false,
                state.cartItems = action.payload?.data
        }).addCase(deleteCartItem.rejected, (state,) => {
            state.isLoadng = false,
                state.cartItems = []
        })
    }
})

export default shoppingCartSlice.reducer;