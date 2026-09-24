import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPage: 1,
        totalUsers: 0,
        usersPerPage: 6
    },
    reducers: {
        setUsers: (state, action) => {
            state.data = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },

        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        },

        setTotalUsers: (state, action) => {
            state.totalUsers = action.payload
        },

        setPagination: (state, action) => {
            if (action.payload) {
                state.currentPage = action.payload.currentPage ?? state.currentPage
                state.totalPage = action.payload.totalPage ?? state.totalPage
                state.totalUsers = action.payload.totalUsers ?? state.totalUsers
                if (action.payload.limit) state.usersPerPage = action.payload.limit
            }
        },
    },
});

export const {
    setUsers,
    setLoading,
    setError,
    setCurrentPage,
    setTotalPage,
    setTotalUsers,
    setPagination
} = usersSlice.actions

export default usersSlice.reducer