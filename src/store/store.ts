import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { filterReducer } from "./filterSlice";
import { themeReducer } from "./themeSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterReducer,
        theme: themeReducer
    }
})