import {
  createTodoListACType,
  deleteTodoListACType,
  setTodoListsACType,
} from "./TodoListsReducer";
import { Dispatch } from "redux";
import {
  ResultStatus,
  TaskPriorities,
  tasksAPI,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "../../api/todolist-api";
import { AppRootActionsType, AppRootStateType } from "../store";
import { AppActionsType, setStatusAC } from "./AppReducer";
import {
  handelServerAppError,
  handelServerNetworkError,
} from "../../utils/errorUtils";
import axios, { AxiosError } from "axios";

export type TasksType = {
  [key: string]: TaskType[];
};
const todoListsInitialState: TasksType = {};

export const tasksReducer = (
  state = todoListsInitialState,
  action: TasksActionsType
): TasksType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const copyState = { ...state };
      action.todoLists.forEach((l) => {
        copyState[l.id] = [];
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
  (todolistId: string) => (dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setStatusAC("loading"));
    tasksAPI.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(todolistId, res.data.items));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const deleteTasksTC =
  (todolistId: string, taskId: string) =>
  (dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setStatusAC("loading"));
    tasksAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(deleteTaskAC(todolistId, taskId));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const createTasksTC =
  (todolistId: string, title: string) =>
  async (dispatch: Dispatch<AppRootActionsType>) => {
    dispatch(setStatusAC("loading"));

    try {
      const res = await tasksAPI.createTask(todolistId, title);

      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setStatusAC("succeeded"));
      } else {
        handelServerAppError<{ item: TaskType }>(dispatch, res.data);
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? err.response?.data.error
          : err.message;
        handelServerNetworkError(dispatch, error);
      }
    }
  };

export const updateTasksTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateTaskDomainModelType
  ) =>
  (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
    dispatch(setStatusAC("loading"));
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
      tasksAPI
        .updateTask(todolistId, taskId, model)
        .then((res) => {
          if (res.data.resultCode === ResultStatus.OK) {
            dispatch(updateTaskAC(todolistId, taskId, res.data.data.item));
            dispatch(setStatusAC("succeeded"));
          } else {
            handelServerAppError<{ item: TaskType }>(dispatch, res.data);
          }
        })
        .catch((e: AxiosError) => {
          const error = e.response
            ? (e.response.data as { error: string }).error
            : e.message;
          handelServerNetworkError(dispatch, error);
        });
    }
  };

export type TasksActionsType =
  | createTaskACType
  | deleteTaskACType
  | createTodoListACType
  | deleteTodoListACType
  | setTodoListsACType
  | setTasksACType
  | updateTaskACType
  | AppActionsType;

type createTaskACType = ReturnType<typeof addTaskAC>;
type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type setTasksACType = ReturnType<typeof setTasksAC>;
type updateTaskACType = ReturnType<typeof updateTaskAC>;

type UpdateTaskDomainModelType = {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
