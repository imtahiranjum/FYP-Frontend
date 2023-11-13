import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "",
    
    
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setUser: (state, userId) => {
            state.userId = userId.payload;
        }
    }
})

export const {setMode} = globalSlice.actions;
export default globalSlice.reducer;