import * as tasksSelectors from "./tasksSlice/tasksSelectors";
import * as tasksAsyncActions from "./tasksSlice/tasksThunk";
import { tasksSlice } from "./tasksSlice/tasksSlice";
import { Task } from "./Task";

const { tasksSelector, updateTaskIdSelector } = tasksSelectors;
const tasksReducer = tasksSlice.reducer;
const TasksActions = {
  ...tasksAsyncActions,
  ...tasksSlice.actions,
};

export {
  TasksActions,
  tasksSelector,
  updateTaskIdSelector,
  tasksReducer,
  Task,
};
