import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../../../../../../api/types";
import { todoListsActions } from "../../../../index";
import { TasksType, UpdateTaskDomainModelType } from "../types";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: {} as TasksType,
    updateTaskId: "",
  },
  reducers: {
    setTasks: (
      state,
      action: PayloadAction<{ todoListId: string; tasks: TaskType[] }>
    ) => {
      state.tasks[action.payload.todoListId] = action.payload.tasks;
    },

    addTask: (
      state,
      action: PayloadAction<{ todoListId: string; task: TaskType }>
    ) => {
      state.tasks[action.payload.todoListId].unshift(action.payload.task);
    },

    removeTask: (
      state,
      action: PayloadAction<{ todoListId: string; taskId: string }>
    ) => {
      const tasks = state.tasks[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      tasks.splice(index, 1);
    },

    changeTask: (
      state,
      action: PayloadAction<{
        todoListId: string;
        taskId: string;
        domainModel: UpdateTaskDomainModelType;
      }>
    ) => {
      const tasks = state.tasks[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      tasks[index] = { ...tasks[index], ...action.payload.domainModel };
    },

    setUpdateTaskId: (state, action: PayloadAction<string>) => {
      state.updateTaskId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(todoListsActions.setTodoLists, (state, action) => {
        action.payload.forEach((tl) => (state.tasks[tl.id] = []));
      })
      .addCase(todoListsActions.addTodoList, (state, action) => {
        state.tasks[action.payload.id] = [];
      })
      .addCase(todoListsActions.removeTodoList, (state, action) => {
        delete state.tasks[action.payload.todoListId];
      });
  },
});
