import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TodoListsType = TodoListType[];

const initialState: TodoListsType = [];

export const todoListsReducer = (
  state = initialState,
  action: ActionsType
): TodoListsType => {
  switch (action.type) {
    case "ADD-TODOLIST":
      return [
        {
          id: action.payload.todoListId,
          title: action.payload.title,
          filter: "all",
        },
        ...state,
      ];

    case "EDIT-TODOLIST-TITLE":
      return state.map((l) =>
        l.id === action.payload.todoListId
          ? { ...l, title: action.payload.title }
          : l
      );

    case "REMOVE-TODOLIST":
      return state.filter((l) => l.id !== action.payload.todoListId);

    case "CHANGE-FILTER":
      return state.map((l) =>
        l.id === action.payload.todoListId
          ? { ...l, filter: action.payload.filter }
          : l
      );
    default:
      return state;
  }
};

type ActionsType =
  | addTodoListACType
  | editTodoListTitleACType
  | removeTodoListACType
  | changeFilterACType;
export type addTodoListACType = ReturnType<typeof addTodoListAC>;
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>;
type editTodoListTitleACType = ReturnType<typeof editTodoListTitleAC>;
type changeFilterACType = ReturnType<typeof changeFilterAC>;

export const addTodoListAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title, todoListId: v1() },
  } as const;
};
export const editTodoListTitleAC = (todoListId: string, title: string) => {
  return {
    type: "EDIT-TODOLIST-TITLE",
    payload: {
      todoListId,
      title,
    },
  } as const;
};
export const removeTodoListAC = (todoListId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      todoListId,
    },
  } as const;
};
export const changeFilterAC = (
  todoListId: string,
  filter: FilterValuesType
) => {
  return {
    type: "CHANGE-FILTER",
    payload: {
      todoListId,
      filter,
    },
  } as const;
};
