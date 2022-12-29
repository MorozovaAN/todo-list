import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c1452ba1-bc90-491b-9609-a361313ad1cf",
  },
});
export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<
      LoginDataType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >("auth/login", data);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
  me() {
    return instance.get<ResponseType<UserType>>("/auth/me");
  },
};

export const todolistAPI = {
  getTodoLists() {
    return instance.get<TodoListType[]>("todo-lists");
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {
      title,
    });
  },
  changeTodoListTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
  },
};

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
};

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

type GetTasksResponse = {
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
