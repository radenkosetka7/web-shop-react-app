import {configureStore} from "@reduxjs/toolkit";
import messageSlice from "./messageSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";


export const store = configureStore({
    reducer:{
        messages:messageSlice,
        users:userSlice,
        categories:categorySlice,
        products:productSlice,
    }
})