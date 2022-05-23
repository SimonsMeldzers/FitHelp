import { createSlice } from "@reduxjs/toolkit";

export const recommendedSlice = createSlice({
    name: "recommended",
    initialState: {
        recommendedData: null,
    },
    reducers: {
        setRecommended: (state, action) => {
            state.recommendedData = action.payload;
        },
    },
});

export const { setRecommended } = recommendedSlice.actions;

export default recommendedSlice.reducer;