import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("users", JSON.stringify(state.users.users));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
