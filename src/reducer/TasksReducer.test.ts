import {
  addTaskAC,
  changeTaskStatusAC,
  editTaskAC,
  removeTaskAC,
  tasksReducer,
} from "./TasksReducer";
import { TasksType } from "./TasksReducer";
import { addTodoListAC, removeTodoListAC } from "./TodoListsReducer";

test("correct task should be added to correct array", () => {
  const startState: TasksType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const action = addTaskAC("todolistId1", "TS");
  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1.length).toBe(4);
  expect(endState.todolistId2.length).toBe(3);
  expect(endState.todolistId1[0].id).toBeDefined();
  expect(endState.todolistId1[0].title).toBe("TS");
  expect(endState.todolistId1[0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const startState: TasksType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: true },
      { id: "2", title: "milk", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const action = changeTaskStatusAC("todolistId1", "1", true);
  const endState = tasksReducer(startState, action);

  expect(startState.todolistId1[0].isDone).toBe(false);
  expect(endState.todolistId2[0].isDone).toBe(true);
  expect(endState.todolistId1[0].isDone).toBe(true);
});

test("title of specified task should be changed", () => {
  const startState: TasksType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: true },
      { id: "2", title: "milk", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const action = editTaskAC("todolistId1", "1", "HTML");
  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[0].title).toBe("HTML");
  expect(endState.todolistId2[0].title).toBe("bread");
});

test("correct task should be deleted from correct array", () => {
  const startState: TasksType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const action = removeTaskAC("todolistId2", "2");
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  });
});

test("new array should be added when new todolist is added", () => {
  const startState: TasksType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = addTodoListAC("new todolist");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const startState: TasksType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = removeTodoListAC("todolistId2");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
