import * as todoListsSelectors from "./todoListsSlice/todoListsSelectors";
import * as todoListsAsyncActions from "./todoListsSlice/todoListsThunk";
import { todoListsSlice } from "./todoListsSlice/todoListsSlice";
import { TodoLists } from "./todoLists/TodoLists";
import { TodoList } from "./todoLists/todoList/TodoList";

const { todoListsSelector } = todoListsSelectors;
const todoListsReducer = todoListsSlice.reducer;
const todoListsActions = {
  ...todoListsSlice.actions,
  ...todoListsAsyncActions,
};

export {
  todoListsSelector,
  todoListsActions,
  todoListsReducer,
  TodoLists,
  TodoList,
};
