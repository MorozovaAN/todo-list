import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.status = action.payload;
    },

    setError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload;
    },

    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});
