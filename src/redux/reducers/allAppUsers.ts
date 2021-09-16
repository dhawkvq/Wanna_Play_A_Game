import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDb, users } from "../../DB/_DATA";
import { Question } from "../../types/Question";
import { SaveAnswersArgs } from "./questions";

const initialState: UserDb = { ...users };

const AllUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    addQuestionToUser: (state, action: PayloadAction<Question>) => {
      const { authorId, id } = action.payload;
      const userToUpdate = state[authorId];
      return {
        ...state,
        [authorId]: {
          ...userToUpdate,
          questions: [...(userToUpdate.questions ?? []), id],
        },
      };
    },
    saveUserAnswer: (state, action: PayloadAction<SaveAnswersArgs>) => {
      const { userId, questionId, option } = action.payload;
      const userToUpdate = state[userId];
      return {
        ...state,
        [userId]: {
          ...userToUpdate,
          answers: {
            ...userToUpdate.answers,
            [questionId]: option,
          },
        },
      };
    },
  },
});

export const { addQuestionToUser, saveUserAnswer } = AllUsersSlice.actions;

export const AllUsersReducer = AllUsersSlice.reducer;
