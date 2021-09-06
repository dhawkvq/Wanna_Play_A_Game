import { createSlice } from "@reduxjs/toolkit";
import { UserDb, users } from "../../DB/_DATA";

const initialState: UserDb = { ...users };

const AllUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
});

export const AllUsersReducer = AllUsersSlice.reducer;
