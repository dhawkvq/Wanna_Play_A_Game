import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) =>
      (state = action.payload),
  },
});

export const { setLoadingState } = loadingSlice.actions;

export const loadingReducer = loadingSlice.reducer;
