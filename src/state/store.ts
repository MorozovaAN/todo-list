import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import {
  TodoListsActionsType,
  todoListsReducer,
} from "./reducer/TodoListsReducer";
import { TasksActionsType, tasksReducer } from "./reducer/TasksReducer";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
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

export type AppActionsType = TodoListsActionsType | TasksActionsType;
