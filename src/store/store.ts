import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../app/appSlice/appSlice";
import { authReducer } from "../features/auth/authSlice/authSlice";
import { todoListsReducer } from "../features/todoLists/todoListsSlice/todoListsSlicer";
// @ts-ignore
import { tasksReducer } from "../features/todoLists/modules/TodoLists/TodoList/Task/tasksSlice/tasksSlice";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

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
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppRootStateType,
//   unknown,
//   any
// >;
