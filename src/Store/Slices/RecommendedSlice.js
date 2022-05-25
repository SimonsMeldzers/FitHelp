import { createSlice } from "@reduxjs/toolkit";

export const recommendedSlice = createSlice({
    name: "recommended",
    initialState: {
        recommendedData: null,
    },
    // Funkcija rekomendāciju datu uzstādīšanai (images, title, description, steps, recommended)
    reducers: {
        setRecommended: (state, action) => {
            state.recommendedData = action.payload;
        },
    },
});

export const { setRecommended } = recommendedSlice.actions;

export default recommendedSlice.reducer;