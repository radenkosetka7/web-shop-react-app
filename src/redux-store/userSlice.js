import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const updateUser = createAsyncThunk("users/updateUser", async ({value}) => {
    return await userService.updateUser(value);
});
export const login = createAsyncThunk("users/login", async ({username, password}) => {
    return await authService.login(username, password);
});

export const changePassword = createAsyncThunk("users/changePassword", async ({value}) => {
    return await userService.changePassword(value);
});


const userSlice = createSlice({
    name:'users',

});

export default userSlice.reducer;