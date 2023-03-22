import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../app/appSlice/appSlice";
import { authReducer } from "../features/auth/authSlice/authSlice";
import { todoListsReducer } from "../features/todoLists/todoListsSlice/todoListsSlicer";
import { tasksReducer } from "../features/todoLists/todoLists/todoList/task/tasksSlice/tasksSlice";
import thunkMiddleware from "redux-thunk";

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
