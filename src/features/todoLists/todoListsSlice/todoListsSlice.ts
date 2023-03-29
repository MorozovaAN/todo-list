import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListType } from "../../../api/types";
import { RequestStatusType } from "../../../app/appSlice/appSlice";
import { FilterValuesType, TodoListsType } from "../types";

export const todoListsSlice = createSlice({
  name: "todoLists",
  initialState: {
    todoLists: [] as TodoListsType,
    updateTodoListId: "",
  },
  reducers: {
    setTodoLists: (state, action: PayloadAction<TodoListType[]>) => {
      state.todoLists = action.payload.map((tl: any) => {
        return { ...tl, filter: "all", entityStatus: "idle" };
      });
    },

    addTodoList: (state, action: PayloadAction<TodoListType>) => {
      state.todoLists.unshift({
        ...action.payload,
        filter: "all",
        entityStatus: "idle",
      });
    },

    removeTodoList: (state, action: PayloadAction<{ todoListId: string }>) => {
      const index = state.todoLists.findIndex(
        (tl) => tl.id === action.payload.todoListId
      );
      state.todoLists.splice(index, 1);
    },

    changeTodoListTitle: (
      state,
      action: PayloadAction<{ todoListId: string; title: string }>
    ) => {
      state.todoLists.forEach((tl) => {
        if (tl.id === action.payload.todoListId) {
          tl.title = action.payload.title;
        }
      });
    },

    changeTodoListEntityStatus: (
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

    changeFilter: (
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
