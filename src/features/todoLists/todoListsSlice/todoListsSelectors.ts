import { AppRootStateType } from "../../../store/store";

export const todoListsSelector = (state: AppRootStateType) => state.todoLists;
