import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "./authThunk";

export const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    });
  },
});
