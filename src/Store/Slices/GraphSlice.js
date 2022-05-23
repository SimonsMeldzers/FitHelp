import { createSlice } from "@reduxjs/toolkit";

export const graphSlice = createSlice({
  name: "graph",
  initialState: {},
  reducers: {
    setGraphData: (state, action) => {
      state.graphData = action.payload;
    },
    updateWeight: (state, action) => {
      state.graphData.weight = [...state.graphData.weight, action.payload];
    },
    updateBMI: (state, action) => {
      state.graphData.BMI = [...state.graphData.BMI, action.payload];
    },
    updateCalories: (state, action) => {
      state.graphData.calories = [...state.graphData.calories, action.payload];
    },
    updateProtein: (state, action) => {
      state.graphData.protein = [...state.graphData.protein, action.payload];
    },
  },
});

export const {
  setGraphData,
  updateWeight,
  updateBMI,
  updateCalories,
  updateProtein,
} = graphSlice.actions;

export default graphSlice.reducer;
