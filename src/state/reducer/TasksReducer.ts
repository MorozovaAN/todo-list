import {
  createTodoListACType,
  deleteTodoListACType,
  setTodoListsACType,
} from "./TodoListsReducer";
import { Dispatch } from "redux";
import {
  TaskPriorities,
  tasksAPI,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "../../api/todolist-api";
import { AppActionsType, AppRootStateType } from "../store";

export type TasksType = {
  [key: string]: TaskType[];
};
const todoListsInitialState: TasksType = {};

export const tasksReducer = (
  state = todoListsInitialState,
  action: AppActionsType
): TasksType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      let copyState = { ...state };
      action.todoLists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    }
    case "SET-TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks,
      };

    case "CREATE-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    case "DELETE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case "UPDATE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    case "CREATE-TODOLIST":
      return {
        [action.todoList.id]: [],
        ...state,
      };

    default:
      return state;
  }
};

export type TasksActionsType =
  | createTaskACType
  | deleteTaskACType
  | createTodoListACType
  | deleteTodoListACType
  | setTodoListsACType
  | setTasksACType
  | updateTaskACType;
type createTaskACType = ReturnType<typeof addTaskAC>;
type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type setTasksACType = ReturnType<typeof setTasksAC>;
type updateTaskACType = ReturnType<typeof updateTaskAC>;

export const addTaskAC = (task: TaskType) => {
  return {
    type: "CREATE-TASK",
    task,
  } as const;
};

export const deleteTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "DELETE-TASK",
    todoListId,
    taskId,
  } as const;
};

export const updateTaskAC = (
  todoListId: string,
  taskId: string,
  model: UpdateTaskModelType
) => {
  return {
    type: "UPDATE-TASK",
    todoListId,
    taskId,
    model,
  } as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: "SET-TASKS",
    todolistId,
    tasks,
  } as const;
};
export const getTasksTC =
  (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    tasksAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(todolistId, res.data.items));
    });
  };
export const deleteTasksTC =
  (todolistId: string, taskId: string) =>
  (dispatch: Dispatch<AppActionsType>) => {
    tasksAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(deleteTaskAC(todolistId, taskId));
    });
  };

export const createTasksTC =
  (todolistId: string, title: string) =>
  (dispatch: Dispatch<AppActionsType>) => {
    tasksAPI.createTask(todolistId, title).then((res) => {
      dispatch(addTaskAC(res.data.data.item));
    });
  };

type UpdateTaskDomainModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export const updateTasksTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateTaskDomainModelType
  ) =>
  (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      };
      tasksAPI.updateTask(todolistId, taskId, model).then((res) => {
        dispatch(updateTaskAC(todolistId, taskId, res.data.data.item));
      });
    }
  };
