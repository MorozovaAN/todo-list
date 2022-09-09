import { combineReducers, compose, createStore } from "redux";
import { todoListsReducer } from "./reducer/TodoListsReducer";
import { tasksReducer } from "./reducer/TasksReducer";

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

export const store = createStore(rootReducer, composeEnhancer());

export type AppRootStateType = ReturnType<typeof rootReducer>;
