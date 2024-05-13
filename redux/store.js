import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profileTest";

export default configureStore({
    reducer: {
        profile: profileReducer
    }

})