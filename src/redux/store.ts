import { configureStore } from "@reduxjs/toolkit";
import { currentUserReducer } from "./reducers/currentUserReducer";
import { errorReducer } from "./reducers/errorReducer";

export const reduxStore = configureStore({
  reducer: {
    error: errorReducer,
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
