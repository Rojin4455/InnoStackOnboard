import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user_id:null,
    email:null,
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user_id = action.payload.user_id;
            state.email = action.payload.email;

        },
        clearUser: (state, action) => {
            state.user_id = null;
            state.email = null;

        }
    }
})




export const {setUser, clearUser, updateAccessToken} = userSlice.actions

export default userSlice.reducer