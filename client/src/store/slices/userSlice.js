import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkSession = createAsyncThunk('user/checkSession', async () => {
    const response = await fetch('/check_session');
    if (!response.ok) {
        throw new Error('Failed to fetch user session');
    }
    const data = await response.json();
    return data;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
    const response = await fetch('/logout', { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return null;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSession.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(checkSession.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;