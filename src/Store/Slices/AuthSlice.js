import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Pēc noklusējuma lietotājs nav autorizēts
    isAuthenticated: false,
  },
  // Funkcija, kas paņemot iepriekšējo stāvokli (initialState), atgriež jauno stāvokli
  reducers: {
    // Tiek pārbaudīts vai lietotājs ir autorizēts
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
