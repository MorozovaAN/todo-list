import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import {
  TodoListsActionsType,
  todoListsReducer,
} from "./reducers/TodoListsReducer";
import { TasksActionsType, tasksReducer } from "./reducers/TasksReducer";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppActionsType, appReducer } from "./reducers/AppReducer";
import { ActionsType, authReducer } from "./reducers/AuthReducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type ThunkAppDispatchType = ThunkDispatch<
  AppRootStateType,
  any,
  AnyAction
>;

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export type AppRootActionsType =
  | TodoListsActionsType
  | TasksActionsType
  | AppActionsType
  | ActionsType;
