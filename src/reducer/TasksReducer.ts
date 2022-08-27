import { v1 } from "uuid";
import { addTodoListACType, removeTodoListACType } from "./TodoListsReducer";

export type TaskType = { id: string; title: string; isDone: boolean };
export type TasksType = {
  [key: string]: TaskType[];
};

export const tasksReducer = (
  state: TasksType,
  action: ActionsType
): TasksType => {
  switch (action.type) {
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todoListId]: [
          { id: v1(), title: action.payload.title, isDone: false },
          ...state[action.payload.todoListId],
        ],
      };
    case "EDIT-TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, title: action.payload.newTitle }
            : t
        ),
      };
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter(
          (task) => task.id !== action.payload.taskId
        ),
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, isDone: action.payload.isDone }
            : t
        ),
      };
    case "ADD-TODOLIST":
      return {
        [action.payload.todoListId]: [],
        ...state,
      };
    case "REMOVE-TODOLIST":
      const copyState = { ...state };
      delete copyState[action.payload.todoListId];
      return copyState;

    default:
      return state;
  }
};

type ActionsType =
  | addTaskACType
  | editTaskACType
  | removeTaskACType
  | changeTaskStatusACType
  | addTodoListACType
  | removeTodoListACType;
type addTaskACType = ReturnType<typeof addTaskAC>;
type editTaskACType = ReturnType<typeof editTaskAC>;
type removeTaskACType = ReturnType<typeof removeTaskAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;

export const addTaskAC = (todoListId: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todoListId,
      title,
    },
  } as const;
};

export const editTaskAC = (
  todoListId: string,
  taskId: string,
  newTitle: string
) => {
  return {
    type: "EDIT-TASK",
    payload: {
      todoListId,
      taskId,
      newTitle,
    },
  } as const;
};

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todoListId,
      taskId,
    },
  } as const;
};

export const changeTaskStatusAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      todoListId,
      taskId,
      isDone,
    },
  } as const;
};
