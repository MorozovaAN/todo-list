import * as tasksSelectors from "./tasksSlice/tasksSelectors";
import * as tasksAsyncActions from "./tasksSlice/tasksThunk";
import { tasksSlice } from "./tasksSlice/tasksSlice";
import { Task } from "./Task/Task";

const { tasksSelector, updateTaskIdSelector } = tasksSelectors;
const tasksReducer = tasksSlice.reducer;
const tasksActions = {
  ...tasksAsyncActions,
  ...tasksSlice.actions,
};

export {
  tasksActions,
  tasksSelector,
  updateTaskIdSelector,
  tasksReducer,
  Task,
};
