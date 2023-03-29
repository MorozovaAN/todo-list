export type TodoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsError?: string[];
  data: T;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type UpdateTaskModelType = {
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export enum ResultStatus {
  OK = 0,
  ERROR = 1,
  CAPTCHA = 10,
}

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: boolean;
};

export type UserType = {
  id: number;

  email: string;

  login: string;
};
