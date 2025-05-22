import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isDarkMode: localStorage.getItem('theme') === 'dark',
}
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
            if (state.isDarkMode) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;