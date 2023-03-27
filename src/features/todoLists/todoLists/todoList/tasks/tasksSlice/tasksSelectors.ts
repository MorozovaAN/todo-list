import { AppRootStateType } from "../../../../../../store/store";

export const tasksSelector = (state: AppRootStateType) => state.tasks.tasks;
export const updateTaskIdSelector = (state: AppRootStateType) =>
  state.tasks.updateTaskId;
