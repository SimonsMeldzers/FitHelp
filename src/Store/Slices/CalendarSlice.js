import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  // Pēc noklusējuma, kalendārā nav piezīmju
  initialState: {
    events:  [],
  },
  // Funkcija, kas paņemot iepriekšējo stāvokli (initialState), atgriež jauno stāvokli
  reducers: {
    // Uzstāda kalendāra piezīmju datus
    setCalendarData: (state, action) => {
      state.events = action.payload;
    },
    // Atjaunina kalendāra piezīmju datus
    updateCalendarData: (state, action) => {
      state.events = [...state.events, action.payload];
    },
  },
});

export const { setCalendarData,updateCalendarData } = calendarSlice.actions;

export default calendarSlice.reducer;
