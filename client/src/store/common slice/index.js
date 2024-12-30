import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading: false,
    featureImageList: []
}


export const getFeatureImage = createAsyncThunk(
    '/address/getFeatureImage',
    async () => {
        const response = await axios.get(
            `http://${import.meta.env.VITE_API_URL}/api/common/feature/get`
        )

        return response.data
    })

export const addFeatureImage = createAsyncThunk(
    '/address/addFeatureImage',
    async (image) => {
        console.log('imageefgewfwef')
        const response = await axios.post(
            `http://${import.meta.env.VITE_API_URL}/api/common/feature/add`,
            image
        )

        return response.data
    })



const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeatureImage.pending,(state)=>{
            state.isLoading=true
        }).addCase(getFeatureImage.fulfilled,(state,action)=>{
            state.isLoading=false
            state.featureImageList=action?.payload?.data
        }).addCase(getFeatureImage.rejected,(state)=>{
            state.isLoading=false
            state.featureImageList=[]
        })
    }
})


export default commonSlice.reducer