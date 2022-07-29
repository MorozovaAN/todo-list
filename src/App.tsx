import React, { useState } from "react";
import { TaskType, TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import "./App.css";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "JSX", isDone: true },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };
  let taskForRender;
  switch (filter) {
    case "completed":
      taskForRender = tasks.filter((task) => task.isDone);
      break;
    case "active":
      taskForRender = tasks.filter((task) => !task.isDone);
      break;
    default:
      taskForRender = tasks;
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const addTask = (title: string) => {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks]);
  };

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={taskForRender}
        changeFilter={changeFilter}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
};

export default App;
