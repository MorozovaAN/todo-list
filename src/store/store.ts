import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "../app";
import { authReducer } from "../features/auth";
import { todoListsReducer } from "../features/todoLists";
import { tasksReducer } from "../features/todoLists/todoLists/todoList/tasks";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof store.getState>;
