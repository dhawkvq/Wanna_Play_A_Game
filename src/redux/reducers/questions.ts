import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questions, QuestionsDb, _saveQuestionAnswer } from "../../DB/_DATA";
import { addError } from "./errorReducer";
import { setLoadingState } from "./loading";

const initialState: QuestionsDb = { ...questions };

type SaveAnswersArgs = {
  userId: string;
  questionId: string;
  option: "optionOne" | "optionTwo";
};

export const saveAnswer = createAsyncThunk(
  "SAVE_ANSWER",
  async (args: SaveAnswersArgs, { dispatch }) => {
    const { userId, questionId, option } = args;
    dispatch(setLoadingState(true));
    try {
      await _saveQuestionAnswer({ userId, qid: questionId, option });
      return args;
    } catch (error) {
      const castError = error as Error;
      dispatch(addError([castError.message]));
      throw error;
    } finally {
      dispatch(setLoadingState(false));
    }
  }
);

const questionsSlice = createSlice({
  name: "allQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      saveAnswer.fulfilled,
      (state, action: PayloadAction<SaveAnswersArgs>) => {
        const { userId, questionId, option } = action.payload;
        const existingQuestion = state[questionId];
        const existingOption = state[questionId][option];
        return {
          ...state,
          [questionId]: {
            ...existingQuestion,
            [option]: {
              ...existingOption,
              votes: [...existingOption.votes, userId],
            },
          },
        };
      }
    );
  },
});

export const questionsReducer = questionsSlice.reducer;
