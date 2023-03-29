import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
} from "../../../../../api/types";

export type TasksType = {
  [key: string]: TaskType[];
};

export type UpdateTaskDomainModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
