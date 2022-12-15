import { todolistAPI, TodoListType } from "../../api/todolist-api";
import { Dispatch } from "redux";
import { AppActionsType } from "../store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
};
export type TodoListsType = TodoListDomainType[];
const initialState: TodoListsType = [];

export const todoListsReducer = (
  state = initialState,
  action: AppActionsType
): TodoListsType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todoLists.map((tl: TodoListType) => ({
        ...tl,
        filter: "all",
      }));
    }
    case "CREATE-TODOLIST":
      return [{ ...action.todoList, filter: "all" }, ...state];

    case "CHANGE-TODOLIST-TITLE":
      return state.map((l) =>
        l.id === action.todoListId ? { ...l, title: action.title } : l
      );

    case "DELETE-TODOLIST":
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

export type TodoListsActionsType =
  | createTodoListACType
  | editTodoListTitleACType
  | deleteTodoListACType
  | changeFilterACType
  | setTodoListsACType;

export type setTodoListsACType = ReturnType<typeof setTodoListsAC>;
export type createTodoListACType = ReturnType<typeof createTodoListAC>;
export type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>;
type editTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
type changeFilterACType = ReturnType<typeof changeTasksFilterAC>;

export const createTodoListAC = (todoList: TodoListType) => {
  return {
    type: "CREATE-TODOLIST",
    todoList,
  } as const;
};
export const changeTodoListTitleAC = (todoListId: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todoListId,
    title,
  } as const;
};
export const deleteTodoListAC = (todoListId: string) => {
  return {
    type: "DELETE-TODOLIST",
    payload: {
      todoListId,
    },
  } as const;
};
export const changeTasksFilterAC = (
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

export const setTodoListsAC = (todoLists: TodoListType[]) => {
  return {
    type: "SET-TODOLISTS",
    todoLists,
  } as const;
};

export const getTodoListsTC =
  () => (dispatch: Dispatch<TodoListsActionsType>) => {
    todolistAPI.getTodoLists().then((res) => {
      dispatch(setTodoListsAC(res.data));
    });
  };

export const createTodoListTC =
  (title: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
    todolistAPI.createTodoList(title).then((res) => {
      dispatch(createTodoListAC(res.data.data.item));
    });
  };

export const deleteTodoListTC =
  (todoListId: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
    todolistAPI.deleteTodoList(todoListId).then((res) => {
      dispatch(deleteTodoListAC(todoListId));
    });
  };

export const changeTodoListTitleTC =
  (todoListId: string, newTitle: string) =>
  (dispatch: Dispatch<TodoListsActionsType>) => {
    todolistAPI.changeTodoListTitle(todoListId, newTitle).then((res) => {
      dispatch(changeTodoListTitleAC(todoListId, newTitle));
    });
  };
