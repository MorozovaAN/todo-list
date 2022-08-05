import React, { useState } from "react";
import { TaskType, TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import "./App.css";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = { id: string; title: string; filter: FilterValuesType };

export const App = () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodoListsType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });
  const removeTodoList = (todoListId: string) => {
    setTodolists(todolists.filter((l) => l.id !== todoListId));
    delete tasks[todoListId];
  };

  const changeFilter = (todoListId: string, filter: FilterValuesType) => {
    setTodolists(
      todolists.map((list) =>
        list.id === todoListId ? { ...list, filter } : list
      )
    );
  };
  const addTask = (todoListId: string, title: string) => {
    setTasks({
      ...tasks,
      [todoListId]: [{ id: v1(), title, isDone: false }, ...tasks[todoListId]],
    });
  };
  const removeTask = (todoListId: string, id: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((task) => task.id !== id),
    });
  };
  const changeTaskStatus = (
    todoListId: string,
    id: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === id ? { ...t, isDone } : t
      ),
    });
  };

  return (
    <div className="App">
      {todolists.map((list) => {
        let taskForRender = tasks[list.id];
        switch (list.filter) {
          case "completed":
            taskForRender = tasks[list.id].filter((task) => task.isDone);
            break;
          case "active":
            taskForRender = tasks[list.id].filter((task) => !task.isDone);
            break;
        }

        return (
          <TodoList
            key={list.id}
            todoListId={list.id}
            title={list.title}
            filter={list.filter}
            tasks={taskForRender}
            changeFilter={changeFilter}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
};

export default App;
