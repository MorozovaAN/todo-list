import {
  ResultStatus,
  todolistAPI,
  TodoListType,
} from "../../api/todolist-api";
import { Dispatch } from "redux";
import { AppActionsType, RequestStatusType, setStatusAC } from "./AppReducer";
import { handelServerAppError } from "../../utils/errorUtils";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type TodoListsType = TodoListDomainType[];
const initialState: TodoListsType = [];

export const todoListsReducer = (
  state = initialState,
  action: TodoListsActionsType
): TodoListsType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todoLists.map((l: TodoListType) => ({
        ...l,
        filter: "all",
        entityStatus: "idle",
      }));
    }
    case "CREATE-TODOLIST":
      return [
        { ...action.todoList, filter: "all", entityStatus: "idle" },
        ...state,
      ];

    case "CHANGE-TODOLIST-TITLE":
      return state.map((l) =>
        l.id === action.todoListId ? { ...l, title: action.title } : l
      );

    case "DELETE-TODOLIST":
      return state.filter((l) => l.id !== action.todoListId);

    case "CHANGE-FILTER":
      return state.map((l) =>
        l.id === action.todoListId ? { ...l, filter: action.filter } : l
      );
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((l) =>
        l.id === action.todoListId
          ? { ...l, entityStatus: action.entityStatus }
          : l
      );
    default:
      return state;
  }
};

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
    todoListId,
  } as const;
};
export const changeTasksFilterAC = (
  todoListId: string,
  filter: FilterValuesType
) => {
  return {
    type: "CHANGE-FILTER",

    todoListId,
    filter,
  } as const;
};

export const setTodoListsAC = (todoLists: TodoListType[]) => {
  return {
    type: "SET-TODOLISTS",
    todoLists,
  } as const;
};

export const changeTodoListEntityStatusAC = (
  todoListId: string,
  entityStatus: RequestStatusType
) => {
  return {
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    todoListId,
    entityStatus,
  } as const;
};

export const getTodoListsTC =
  () => (dispatch: Dispatch<TodoListsActionsType>) => {
    dispatch(setStatusAC("loading"));
    todolistAPI.getTodoLists().then((res) => {
      dispatch(setTodoListsAC(res.data));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const createTodoListTC =
  (title: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
    dispatch(setStatusAC("loading"));
    todolistAPI.createTodoList(title).then((res) => {
      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(createTodoListAC(res.data.data.item));
        dispatch(setStatusAC("succeeded"));
      } else {
        handelServerAppError<{ item: TodoListType }>(dispatch, res.data);
      }
    });
  };

export const deleteTodoListTC =
  (todoListId: string) => (dispatch: Dispatch<TodoListsActionsType>) => {
    dispatch(setStatusAC("loading"));
    dispatch(changeTodoListEntityStatusAC(todoListId, "loading"));
    todolistAPI
      .deleteTodoList(todoListId)
      .then((res) => {
        if (res.data.resultCode === ResultStatus.OK) {
          dispatch(deleteTodoListAC(todoListId));
          dispatch(setStatusAC("succeeded"));
        } else {
          handelServerAppError(dispatch, res.data);
        }
      })
      .catch((e) => {
        dispatch(setStatusAC("failed"));
        dispatch(changeTodoListEntityStatusAC(todoListId, "failed"));
      });
  };

export const changeTodoListTitleTC =
  (todoListId: string, newTitle: string) =>
  (dispatch: Dispatch<TodoListsActionsType>) => {
    dispatch(setStatusAC("loading"));
    todolistAPI.changeTodoListTitle(todoListId, newTitle).then((res) => {
      dispatch(changeTodoListTitleAC(todoListId, newTitle));
      dispatch(setStatusAC("succeeded"));
    });
  };

export type TodoListsActionsType =
  | createTodoListACType
  | editTodoListTitleACType
  | deleteTodoListACType
  | changeFilterACType
  | setTodoListsACType
  | AppActionsType
  | changeTodoListEntityStatusACType;

export type setTodoListsACType = ReturnType<typeof setTodoListsAC>;
export type createTodoListACType = ReturnType<typeof createTodoListAC>;
export type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>;
type editTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>;
type changeFilterACType = ReturnType<typeof changeTasksFilterAC>;
type changeTodoListEntityStatusACType = ReturnType<
  typeof changeTodoListEntityStatusAC
>;
