import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        plus: (state) => {
            state.value += 1
        },

        minus: (state) => {
            state.value -= 1
        },

        reset: (state) => {
            state.value = 0
        }
    }
})

export const { plus, minus, reset } = counterSlice.actions
export default counterSlice.reducer