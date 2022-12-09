import {
  createTodoListACType,
  deleteTodoListACType,
  setTodoListsACType,
} from "./TodoListsReducer";
import { Dispatch } from "redux";
import {
  tasksAPI,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
} from "../../api/todolist-api";
import { AppRootStateType } from "../store";

export type TasksType = {
  [key: string]: TaskType[];
};
const todoListsInitialState: TasksType = {};

export const tasksReducer = (
  state = todoListsInitialState,
  action: ActionsType
): TasksType => {
  let copyState: any;
  switch (action.type) {
    case "SET-TODO-LISTS":
      copyState = { ...state };
      action.todoLists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
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
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.newTitle } : t
        ),
      };
    case "DELETE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, status: action.newStatus } : t
        ),
      };
    case "CREATE-TODOLIST":
      return {
        [action.todoListId]: [],
        ...state,
      };

    default:
      return state;
  }
};

type ActionsType =
  | createTaskACType
  | editTaskACType
  | deleteTaskACType
  | changeTaskStatusACType
  | createTodoListACType
  | deleteTodoListACType
  | setTodoListsACType
  | setTasksACType;
type createTaskACType = ReturnType<typeof addTaskAC>;
type editTaskACType = ReturnType<typeof changeTaskTitleAC>;
type deleteTaskACType = ReturnType<typeof deleteTaskAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type setTasksACType = ReturnType<typeof setTasksAC>;

export const addTaskAC = (task: TaskType) => {
  return {
    type: "CREATE-TASK",
    task,
  } as const;
};

export const changeTaskTitleAC = (
  todoListId: string,
  taskId: string,
  newTitle: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    todoListId,
    taskId,
    newTitle,
  } as const;
};

export const deleteTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "DELETE-TASK",
    todoListId,
    taskId,
  } as const;
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  newStatus: TaskStatuses
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    todoListId,
    taskId,
    newStatus,
  } as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: "SET-TASKS",
    todolistId,
    tasks,
  } as const;
};
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  tasksAPI.getTasks(todolistId).then((res) => {
    dispatch(setTasksAC(todolistId, res.data.items));
  });
};
export const deleteTasksTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(deleteTaskAC(todolistId, taskId));
    });
  };

export const createTasksTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title).then((res) => {
      dispatch(addTaskAC(res.data.data.item));
    });
  };

export const updateTasksTC =
  (todolistId: string, taskId: string, newStatus: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: newStatus,
      };
      tasksAPI.updateTask(todolistId, taskId, model).then((res) => {
        dispatch(
          changeTaskStatusAC(todolistId, taskId, res.data.data.item.status)
        );
      });
    }
  };
