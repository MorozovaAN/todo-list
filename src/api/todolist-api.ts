import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c1452ba1-bc90-491b-9609-a361313ad1cf",
  },
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodoListType[]>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {
      title,
    });
  },

  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title,
    });
  },
  deleteTodolist(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
  },
};

type TodoListType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsError: string[];
  data: T;
};
