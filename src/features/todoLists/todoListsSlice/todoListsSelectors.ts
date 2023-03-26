import { AppRootStateType } from "../../../store/store";

export const todoListsSelector = (state: AppRootStateType) =>
  state.todoLists.todoLists;
export const updateTodoListIdSelector = (state: AppRootStateType) =>
  state.todoLists.updateTodoListId;
