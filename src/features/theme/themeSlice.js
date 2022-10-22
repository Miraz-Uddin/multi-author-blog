import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgWhite: "#fff",
  bgAdmin: "#1e283c",
  pureWhite: "#fff",
  bgSecondary: "#f7f7f7",
  textColor: "#212529",
  colorPrimary: "#1e283c",
  colorSecondery: "#818181",
  boxShadow: "1px 2px 10px rgb(0 0 0 / 18%)",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeChange: (state, action) => {
      state.bgWhite = action.payload.bgWhite;
      state.bgAdmin = action.payload.bgAdmin;
      state.bgSecondary = action.payload.bgSecondary;
      state.textColor = action.payload.textColor;
      state.colorPrimary = action.payload.colorPrimary;
      state.colorSecondery = action.payload.colorSecondery;
      state.boxShadow = action.payload.boxShadow;
      state.pureWhite = action.payload.pureWhite;
    },
  },
});

export const { themeChange } = themeSlice.actions;
export default themeSlice.reducer;
