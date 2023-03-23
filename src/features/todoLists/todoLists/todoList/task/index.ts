import * as tasksSelectors from "./tasksSlice/tasksSelectors";
import * as tasksAsyncActions from "./tasksSlice/tasksThunk";
import { tasksSlice } from "./tasksSlice/tasksSlice";

const tasksReducer = tasksSlice.reducer;
const TasksActions = {
  ...tasksAsyncActions,
  ...tasksSlice.actions,
};

export { TasksActions, tasksSelectors, tasksReducer };
