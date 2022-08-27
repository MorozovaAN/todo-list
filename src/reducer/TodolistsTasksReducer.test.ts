import {
  addTodoListAC,
  todoListsReducer,
  TodoListsType,
} from "./TodoListsReducer";
import { tasksReducer, TasksType } from "./TasksReducer";

test("ids should be equals", () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: TodoListsType = [];

  const action = addTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todoListsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todoListId);
  expect(idFromTodolists).toBe(action.payload.todoListId);
});
