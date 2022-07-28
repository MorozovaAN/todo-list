import React, { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./components/TodoList";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "JSX", isDone: true },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={taskForRender}
        changeFilter={changeFilter}
        removeTask={removeTask}
      />
    </div>
  );
};

export default App;
