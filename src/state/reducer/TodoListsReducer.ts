import { todolistAPI, TodoListType } from "../../api/todolist-api";
import { Dispatch } from "redux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
};
export type TodoListsType = TodoListDomainType[];
const initialState: TodoListsType = [];

export const todoListsReducer = (
  state = initialState,
  action: ActionsType
): TodoListsType => {
  switch (action.type) {
    case "SET-TODO-LISTS": {
      return action.todoLists.map((tl: TodoListType) => ({
        ...tl,
        filter: "all",
      }));
    }
    case "CREATE-TODOLIST":
      return [
        {
          id: action.todoListId,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 0,
        },
        ...state,
      ];

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

type ActionsType =
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

export const createTodoListAC = (todoListId: string, title: string) => {
  return {
    type: "CREATE-TODOLIST",
    todoListId,
    title,
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
    type: "SET-TODO-LISTS",
    todoLists,
  } as const;
};

export const getTodoListsTC = () => (dispatch: Dispatch) => {
  todolistAPI.getTodoLists().then((res) => {
    dispatch(setTodoListsAC(res.data));
  });
};

export const createTodoListTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodoList(title).then((res) => {
    dispatch(createTodoListAC(res.data.data.item.id, res.data.data.item.title));
  });
};

export const deleteTodoListTC =
  (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodoList(todoListId).then((res) => {
      dispatch(deleteTodoListAC(todoListId));
    });
  };

export const changeTodoListTitleTC =
  (todoListId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.changeTodoListTitle(todoListId, newTitle).then((res) => {
      dispatch(changeTodoListTitleAC(todoListId, newTitle));
    });
  };
