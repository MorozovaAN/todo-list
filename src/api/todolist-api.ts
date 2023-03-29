import axios, { AxiosResponse } from "axios";
import {
  GetTasksResponse,
  LoginDataType,
  TaskType,
  TodoListType,
  UpdateTaskModelType,
  UserType,
  ResponseType,
} from "./types";

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
