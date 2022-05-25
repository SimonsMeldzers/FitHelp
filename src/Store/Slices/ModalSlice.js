import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  // Pēc noklusējuma autorizācijas logs (Modal) netiek rādīts
  initialState: {
      showModal:false
  },
  // Funkcija kas atver, vai paslēp autorizācijas logu(Modal), pēc nepieciešamības
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = modalSlice.actions;

export default modalSlice.reducer;
