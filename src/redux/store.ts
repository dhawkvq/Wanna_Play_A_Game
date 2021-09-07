import { configureStore } from "@reduxjs/toolkit";
import { AllUsersReducer } from "./reducers/allAppUsers";
import { currentUserReducer } from "./reducers/currentUserReducer";
import { errorReducer } from "./reducers/errorReducer";
import { loadingReducer } from "./reducers/loading";
import { questionsReducer } from "./reducers/questions";

export const reduxStore = configureStore({
  reducer: {
    error: errorReducer,
    currentUser: currentUserReducer,
    allUsers: AllUsersReducer,
    allQuestions: questionsReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
