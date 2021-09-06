import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  error?: Error;
}

const initialState: ErrorState = {
  error: undefined,
};

export const ErrorSlice = createSlice({
  name: "Errors",
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<Error>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const { addError } = ErrorSlice.actions;

export const errorReducer = ErrorSlice.reducer;
