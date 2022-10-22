import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgWhite: "#fff",
  bgSecondary: "#f7f7f7",
  textColor: "#212529",
  colorPrimary: "#1e283c",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeChange: (state, action) => {
      state.bgWhite = action.payload.bgWhite;
      state.bgSecondary = action.payload.bgSecondary;
      state.textColor = action.payload.textColor;
      state.colorPrimary = action.payload.colorPrimary;
    },
  },
});

export const { themeChange } = themeSlice.actions;
export default themeSlice.reducer;
