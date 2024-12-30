import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading: false,
    addressList: []
}


export const addNewAddress = createAsyncThunk(
    '/address/addNewAddress',
    async (formData) => {
        const response = await axios.post(
            `http://${import.meta.env.VITE_API_URL}/api/shop/address/add`,
            formData
        )

        return response.data
    })

export const fetchAllAddresses = createAsyncThunk(
    '/address/fetchAllAddresses',
    async (userId) => {
        const response = await axios.get(
            `http://${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
        )

        return response.data
    })

export const editAddress = createAsyncThunk(
    '/address/editAddress',
    async ({userId,addressId,formData}) => {
        console.log(formData,"fuck uuu")
        const response = await axios.put(
            `http://${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
            formData
        )
        return response.data
    })

export const deleteAddress = createAsyncThunk(
    '/address/deleteAddress',
    async ({userId,addressId}) => {
        console.log(userId,addressId)
        const response = await axios.delete(
            `http://${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
            {}
        )

        return response.data
    })

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(addNewAddress.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(addNewAddress.rejected,(state)=>{
            state.isLoading=false
            state.addressList=[]
        }).addCase(fetchAllAddresses.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchAllAddresses.fulfilled,(state,action)=>{
            state.isLoading=false
            state.addressList=action.payload?.data
        }).addCase(fetchAllAddresses.rejected,(state)=>{
            state.isLoading=false
            state.addressList=[]
        })
    }
})


export default addressSlice.reducer