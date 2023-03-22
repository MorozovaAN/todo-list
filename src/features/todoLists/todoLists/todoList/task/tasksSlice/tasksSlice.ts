import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
} from "../../../../../../api/todolist-api";
import {
  createTodoList,
  deleteTodoList,
  setTodoLists,
} from "../../../../todoListsSlice/todoListsSlicer";
import { fetchTasks } from "./tasksThunk";

type TasksType = {
  [key: string]: TaskType[];
};
const initialState: TasksType = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (
      state,
      action: PayloadAction<{ todoListId: string; task: TaskType }>
    ) => {
      state[action.payload.todoListId].unshift(action.payload.task);
    },

    deleteTask: (
      state,
      action: PayloadAction<{ todoListId: string; taskId: string }>
    ) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      tasks.splice(index, 1);
    },

    updateTask: (
      state,
      action: PayloadAction<{
        todoListId: string;
        taskId: string;
        domainModel: UpdateTaskDomainModelType;
      }>
    ) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      tasks[index] = { ...tasks[index], ...action.payload.domainModel };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(setTodoLists, (state, action) => {
      action.payload.forEach((tl) => (state[tl.id] = []));
    });

    builder.addCase(createTodoList, (state, action) => {
      state[action.payload.id] = [];
    });

    builder.addCase(deleteTodoList, (state, action) => {
      delete state[action.payload.todoListId];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    });
  },
});

export const { createTask, deleteTask, updateTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export type UpdateTaskDomainModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
