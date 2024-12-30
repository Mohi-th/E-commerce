import axios from "axios";
import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProducts = createAsyncThunk(
    '/products/addnewproducts',
    async (formdata) => {
        console.log(formdata)
        const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/api/admin/products/add`, formdata, {
            headers: {
                "Content-Type": 'application/json',
            },
        });
        return response?.data
    }
)
export const fetchAllproducts = createAsyncThunk(
    '/products/fetchAllproducts',
    async () => {
        const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/api/admin/products/get`);
        return response?.data
    }
)
export const editProduct = createAsyncThunk(
    '/products/editproduct',
    async ({id,formData}) => {
        const response = await axios.put(`http://${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData, {
            headers: {
                "Content-Type": 'application/json',
            },
        });
        return response?.data
    }
)
export const deleteProduct = createAsyncThunk(
    '/products/deleteproduct',
    async (id) => {
        const response = await axios.put(`http://${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,{
            headers:{
                "Content-Type": 'application/json',
            }
        });
        return response?.data
    }
)

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllproducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchAllproducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.productList=action.payload.data
        }).addCase(fetchAllproducts.rejected,(state)=>{
            state.isLoading=false
            state.productList=[]
        })
    }
});

export default AdminProductsSlice.reducer;