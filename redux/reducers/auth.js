
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    },
    reducers: {
        SET_NAME(state, action){
            state.name = action.payload
        }
    }
})

export const {SET_NAME} = authSlice.actions;

export function (state = initialState, action){
    const {type, payload} = action;
    
    if (type == REGISTER_SUCCESS){
        localStorage.setItem('token', payload.token);
        return {
            ...state, 
            ...payload,
            isAuthenticated: true,
            loading: false
        }
    } 
    else if(type == REGISTER_FAIL){
        localStorage.removeItem('token');
        return {
            ...state, 
            token: null,
            isAuthenticated: false,
            loading: false
        }
    }
    else{
        return state;
    }
}

export default authSlice.reducer;