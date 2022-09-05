import { combineReducers, createStore } from "redux";
import { todoListsReducer } from "./reducer/TodoListsReducer";
import { tasksReducer } from "./reducer/TasksReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});
export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;
