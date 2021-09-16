import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  questions,
  QuestionsDb,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../DB/_DATA";
import { addError } from "./errorReducer";
import { setLoadingState } from "./loading";
import { NewQuestion } from "../../utils";
import { Question } from "../../types/Question";
import { addQuestionToUser, saveUserAnswer } from "./allAppUsers";

const initialState: QuestionsDb = { ...questions };

export type SaveAnswersArgs = {
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
      dispatch(saveUserAnswer(args));
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

export const createQuestion = createAsyncThunk(
  "CREATE_QUESTION",
  async (args: NewQuestion, { dispatch }) => {
    dispatch(setLoadingState(true));
    try {
      const savedQuestion = await _saveQuestion(args);
      dispatch(addQuestionToUser(savedQuestion));
      return savedQuestion;
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
    builder
      .addCase(
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
      )
      .addCase(
        createQuestion.fulfilled,
        (state, action: PayloadAction<Question>) => ({
          ...state,
          [action.payload.id]: action.payload,
        })
      );
  },
});

export const questionsReducer = questionsSlice.reducer;
