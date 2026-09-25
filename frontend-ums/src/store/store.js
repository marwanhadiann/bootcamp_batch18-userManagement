import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import counterReducer from "./counterSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        counter: counterReducer,
    },
})