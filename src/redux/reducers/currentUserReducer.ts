import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../../DB/_DATA";
import { User } from "../../types/User";
import { addError } from "./errorReducer";

export const login = createAsyncThunk(
  "LOGIN",
  async (id: string, { dispatch }) => {
    try {
      return await getUserById(id);
    } catch (error) {
      const castError = error as Error;
      dispatch(addError([castError.message]));
      throw error;
    }
  }
);

interface UserState extends User {
  error: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  avatarURL: "",
  answers: {},
  questions: [],
  error: "",
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export const { logout } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
