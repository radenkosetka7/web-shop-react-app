import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import messageService from "../services/message.service";


export const createMessage= createAsyncThunk("messages/createMessage", async ({value}, {rejectWithValue}) => {
    try {
        return await messageService.createMessage(value);
    } catch (err) {
        return rejectWithValue("Error while adding new message. Please try later.");
    }
});


const messageSlice = createSlice({
    name:'messages',
    initialState: {},
    reducers: {},
    extraReducers: {
        [createMessage.fulfilled]: (state,action) => {
            state.loading=false;
            state.error=null;
        },
        [createMessage.pending]: (state,action) => {
            state.loading=true;
        },
        [createMessage.rejected]: (state,action) => {
            state.loading=false;
        }
    }


})

export default messageSlice.reducer;