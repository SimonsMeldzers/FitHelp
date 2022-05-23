import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events:  [],
  },
  reducers: {
    setCalendarData: (state, action) => {
      state.events = action.payload;
    },
    updateCalendarData: (state, action) => {
      state.events = [...state.events, action.payload];
    },
  },
});

export const { setCalendarData,updateCalendarData } = calendarSlice.actions;

export default calendarSlice.reducer;
