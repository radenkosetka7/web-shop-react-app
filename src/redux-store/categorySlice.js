import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import categoryService from "../services/category.service";


export const getCategories = createAsyncThunk("categories/getCategories", async ({rejectWithValue}) => {
    try {
        return await categoryService.getAllCategories();
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});

export const getCategory = createAsyncThunk("categories/getCategory", async ({value}, {rejectWithValue}) => {
    try {
        return await categoryService.getCategory(value);
    } catch (err) {
        return rejectWithValue("There is some problem with getting data. Please try later.");
    }
});



const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        selectedCategory: null
    },
    reducers: {},
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [getCategories.pending]: (state,action) => {
            state.loading=true;
        },
        [getCategories.rejected]: (state,action) => {
            state.loading=false;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.selectedCategory = action.payload;
        },
        [getCategory.pending]: (state,action) => {
            state.loading=true;
        },
        [getCategory.rejected]: (state,action) => {
            state.loading=false;
        }

    }

});

export default categorySlice.reducer;