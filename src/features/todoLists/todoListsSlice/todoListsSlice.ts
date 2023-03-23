import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatusType } from "../../../app/appSlice/appSlice";
import { TodoListType } from "../../../api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type TodoListsType = TodoListDomainType[];
const initialState: TodoListsType = [];

export const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    setTodoLists: (state, action: PayloadAction<TodoListType[]>) => {
      return action.payload.map((l: any) => {
        return { ...l, filter: "all", entityStatus: "idle" };
      });
    },

    createTodoList: (state, action: PayloadAction<TodoListType>) => {
      state.unshift({
        ...action.payload,
        filter: "all",
        entityStatus: "idle",
      });
    },

    deleteTodoList: (state, action: PayloadAction<{ todoListId: string }>) => {
      return state.filter((l) => l.id !== action.payload.todoListId);
    },

    updateTodoListTitle: (
      state,
      action: PayloadAction<{ todoListId: string; title: string }>
    ) => {
      state.forEach((l) => {
        if (l.id === action.payload.todoListId) {
          l.title = action.payload.title;
        }
      });
    },

    updateTodoListEntityStatus: (
      state,
      action: PayloadAction<{
        todoListId: string;
        entityStatus: RequestStatusType;
      }>
    ) => {
      state.forEach((l) => {
        if (l.id === action.payload.todoListId) {
          l.entityStatus = action.payload.entityStatus;
        }
      });
    },

    updateFilter: (
      state,
      action: PayloadAction<{ todoListId: string; filter: FilterValuesType }>
    ) => {
      state.forEach((l) => {
        if (l.id === action.payload.todoListId) {
          l.filter = action.payload.filter;
        }
      });
    },
  },
});

export const {
  setTodoLists,
  createTodoList,
  deleteTodoList,
  updateTodoListTitle,
  updateTodoListEntityStatus,
} = todoListsSlice.actions;
