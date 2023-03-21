import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "./authThunk";

const authSlice = createSlice({
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

export const { setIsLoggedIn } = authSlice.actions;
export const authReducer = authSlice.reducer;
