import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatusType } from "../../../app/appSlice/appSlice";
import { TodoListType } from "../../../api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type TodoListsType = TodoListDomainType[];
const initialState = {
  todoLists: [] as TodoListsType,
  updateTodoListId: "",
};

export const todoListsSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    setTodoLists: (state, action: PayloadAction<TodoListType[]>) => {
      state.todoLists = action.payload.map((tl: any) => {
        return { ...tl, filter: "all", entityStatus: "idle" };
      });
    },

    createTodoList: (state, action: PayloadAction<TodoListType>) => {
      state.todoLists.unshift({
        ...action.payload,
        filter: "all",
        entityStatus: "idle",
      });
    },

    deleteTodoList: (state, action: PayloadAction<{ todoListId: string }>) => {
      const index = state.todoLists.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      state.todoLists.splice(index, 1);
    },

    updateTodoListTitle: (
      state,
      action: PayloadAction<{ todoListId: string; title: string }>
    ) => {
      state.todoLists.forEach((tl) => {
        if (tl.id === action.payload.todoListId) {
          tl.title = action.payload.title;
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
      state.todoLists.forEach((l) => {
        if (l.id === action.payload.todoListId) {
          l.entityStatus = action.payload.entityStatus;
        }
      });
    },

    updateFilter: (
      state,
      action: PayloadAction<{ todoListId: string; filter: FilterValuesType }>
    ) => {
      state.todoLists.forEach((l) => {
        if (l.id === action.payload.todoListId) {
          l.filter = action.payload.filter;
        }
      });
    },
    setUpdateTodoListId: (state, action: PayloadAction<string>) => {
      state.updateTodoListId = action.payload;
    },
  },
});

export const {
  setTodoLists,
  createTodoList,
  deleteTodoList,
  updateTodoListTitle,
  updateTodoListEntityStatus,
  setUpdateTodoListId,
} = todoListsSlice.actions;
