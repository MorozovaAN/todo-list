import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { todoListsReducer } from "./reducer/TodoListsReducer";
import { tasksReducer } from "./reducer/TasksReducer";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
