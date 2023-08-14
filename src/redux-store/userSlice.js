import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import userService from "../services/user.service";


export const login = createAsyncThunk("users/login", async ({username, password}) => {
    return await authService.login(username, password);
});

export const updateUser = createAsyncThunk("users/updateUser", async ({
                                                                                            id,
                                                                                            value
                                                                                        }, {rejectWithValue}) => {
    try {
        return await userService.updateUser(id, value);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});
export const getUser = createAsyncThunk("users/getUser", async ({id}) => {
    return await userService.getUser(id);
});
export const changePassword = createAsyncThunk("users/changePassword", async ({
                                                                          id,
                                                                          value
                                                                      }, {rejectWithValue}) => {
    try {
        return await userService.changePassword(id, value);
    } catch (err) {
        return rejectWithValue("Error while updating model. Please try later.");
    }
});

const logoutAction = (state) => {
    state.authenticated = false;
    state.loading = false;
    state.user = null;
    authService.logout();
}

const userSlice = createSlice({
    name:'users',
    initialState: {
        user: null,
        authenticated:false,
        authenticatedFailed:false
    },
    reducers: {
        logout: logoutAction,
        setUser: (state,action) => {
            state.user=action.payload;
            state.loading=false;
        },
        clearUser: (state,action) => {
            state.user=null;
            state.loading=false;
        }
    },
    extraReducers: {
        [login.fulfilled]: (state,action) =>
        {
            state.loading=false;
            state.error=null;
        },
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.rejected]: (state) => {
            state.authenticatedFailed = true;
            state.loading = false;
        },
        [getUser.fulfilled]: (state,action) => {
            state.loading=false;
            state.error=null;
            state.authenticated=true;
            state.user=action.payload;
        },
        [getUser.pending]: (state,action) => {
            state.loading = true;
        },
        [getUser.rejected]: (state,action) => {
            state.loading = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.error=null;
            state.user = action.payload;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.error=null;
            state.user = action.payload;
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true;
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
        },

    }

});
export const {logout,setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;