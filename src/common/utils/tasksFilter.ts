import { FilterValuesType } from "../../features/todoLists/types";
import { TaskStatuses, TaskType } from "../../api/types";

export const tasksFilter = (tasks: TaskType[], filter: FilterValuesType) => {
  switch (filter) {
    case "completed":
      return tasks.filter((t) => t.status === TaskStatuses.New);
    case "active":
      return tasks.filter((t) => t.status === TaskStatuses.Completed);
    default:
      return tasks;
  }
};
