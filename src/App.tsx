import React, { useState } from "react";
import { TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { ButtonAppBar } from "./components/ButtonAppBar/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";

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

  const addTodoList = (title: string) => {
    const newTodoListId = v1();
    setTodolists([{ id: newTodoListId, title, filter: "all" }, ...todolists]);
    setTasks({ ...tasks, [newTodoListId]: [] });
  };

  const editTodoListTitle = (todoListId: string, title: string) => {
    setTodolists(
      todolists.map((l) => (l.id === todoListId ? { ...l, title } : l))
    );
  };

  const addTask = (todoListId: string, title: string) => {
    setTasks({
      ...tasks,
      [todoListId]: [{ id: v1(), title, isDone: false }, ...tasks[todoListId]],
    });
  };

  const editTask = (todoListId: string, taskId: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      ),
    });
  };

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
      <ButtonAppBar />

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
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
              <Grid item>
                <Paper style={{ padding: "10px" }}>
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
                    editTask={editTask}
                    editTodoListTitle={editTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
