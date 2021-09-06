import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  errors: Error[];
}

const initialState: ErrorState = {
  errors: [],
};

export const ErrorSlice = createSlice({
  name: "Errors",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Error[]>) => ({
      ...state,
      errors: [...state.errors, ...action.payload],
    }),
  },
});

export const { addError } = ErrorSlice.actions;

export const errorReducer = ErrorSlice.reducer;
