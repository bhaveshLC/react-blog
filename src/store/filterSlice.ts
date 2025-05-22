import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    sortBy: "latest",
    limit: 6,
    page: 1,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setTitle(state, action) {
            state.title = action.payload;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setLimit(state, action) {
            state.limit = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload
        }
    }
})

export const { setTitle, setSortBy, setLimit, setPage } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;