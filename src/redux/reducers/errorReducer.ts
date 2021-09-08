import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const ErrorSlice = createSlice({
  name: "Errors",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<string[]>) => [
      ...state,
      ...action.payload,
    ],
    clearErrors: () => initialState,
  },
});

export const { addError, clearErrors } = ErrorSlice.actions;

export const errorReducer = ErrorSlice.reducer;
