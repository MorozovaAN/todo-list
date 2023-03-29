import * as todoListsSelectors from "./todoListsSlice/todoListsSelectors";
import * as todoListsAsyncActions from "./todoListsSlice/todoListsThunk";
import { todoListsSlice } from "./todoListsSlice/todoListsSlice";
import { TodoLists } from "./todoLists/TodoLists/TodoLists";
import { TodoList } from "./todoLists/todoList/TodoList/TodoList";

const { todoListsSelector, updateTodoListIdSelector } = todoListsSelectors;
const todoListsReducer = todoListsSlice.reducer;
const todoListsActions = {
  ...todoListsSlice.actions,
  ...todoListsAsyncActions,
};

export {
  updateTodoListIdSelector,
  todoListsSelector,
  todoListsActions,
  todoListsReducer,
  TodoLists,
  TodoList,
};
