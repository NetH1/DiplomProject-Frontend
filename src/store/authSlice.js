import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosUrl } from "../API";


export const fetchAuthLogin = createAsyncThunk(
    'auth/fetchAuthLogin', async (params) => {
        const { data } = await axiosUrl.post('/auth/login', params);
        return data;
    }
)

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe', async () => {
        const { data } = await axiosUrl.get('/auth/me');
        return data;
    }
)

export const fetchAuthRegister = createAsyncThunk(
    'auth/fetchAuthRegister', async (params) => {
        const { data } = await axiosUrl.post('/auth/register', params);
        return data;
    }
)

const initialState = {
    user: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        LogOut: (state) => {
            state.user = null;
        }
    },
    extraReducers: {
        [fetchAuthLogin.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchAuthLogin.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
        [fetchAuthLogin.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.user = action.payload;
        },

        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.user = action.payload;
        },

        [fetchAuthRegister.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchAuthRegister.rejected]: (state) => {
            state.status = 'error';
            state.user = null;
        },
        [fetchAuthRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.user = action.payload;
        },
    }
});

export const { LogOut } = authSlice.actions;

export default authSlice.reducer;