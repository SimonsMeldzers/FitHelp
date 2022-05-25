import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  // Funkcijas definēšana jaunu saišu veidošanai
  initialState: {
      url:''
  },
  reducers: {
    setLocation: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
