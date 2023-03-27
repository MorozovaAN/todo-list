import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
} from "../../../../../../api/todolist-api";
import { fetchTasks } from "./tasksThunk";
import { todoListsActions } from "../../../../index";

type TasksType = {
  [key: string]: TaskType[];
};
const initialState = {
  tasks: {} as TasksType,
  updateTaskId: "",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (
      state,
      action: PayloadAction<{ todoListId: string; task: TaskType }>
    ) => {
      state.tasks[action.payload.todoListId].unshift(action.payload.task);
    },

    deleteTask: (
      state,
      action: PayloadAction<{ todoListId: string; taskId: string }>
    ) => {
      const tasks = state.tasks[action.payload.todoListId];
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
      const tasks = state.tasks[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      tasks[index] = { ...tasks[index], ...action.payload.domainModel };
    },

    setUpdateTaskId: (state, action: PayloadAction<string>) => {
      state.updateTaskId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(todoListsActions.setTodoLists, (state, action) => {
      action.payload.forEach((tl) => (state.tasks[tl.id] = []));
    });

    builder.addCase(todoListsActions.createTodoList, (state, action) => {
      state.tasks[action.payload.id] = [];
    });

    builder.addCase(todoListsActions.deleteTodoList, (state, action) => {
      delete state.tasks[action.payload.todoListId];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks[action.payload.todolistId] = action.payload.tasks;
    });
  },
});

export const { createTask, deleteTask, updateTask, setUpdateTaskId } =
  tasksSlice.actions;

export type UpdateTaskDomainModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
