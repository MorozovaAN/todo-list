import React, { useReducer } from "react";
import { TodoList } from "./components/TodoList";
import { v1 } from "uuid";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { ButtonAppBar } from "./components/ButtonAppBar/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTaskAC,
  changeTaskStatusAC,
  editTaskAC,
  removeTaskAC,
  tasksReducer,
} from "./reducer/TasksReducer";
import {
  todoListsReducer,
  addTodoListAC,
  editTodoListTitleAC,
  removeTodoListAC,
  changeFilterAC,
  TodoListType,
} from "./reducer/TodoListsReducer";

export type FilterValuesType = "all" | "active" | "completed";

export const App = () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    const action = addTodoListAC(title);
    dispatchTodoLists(action);
    dispatchTasks(action);
  };

  const editTodoListTitle = (todoListId: string, title: string) => {
    dispatchTodoLists(editTodoListTitleAC(todoListId, title));
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC(todoListId);
    dispatchTodoLists(action);
    dispatchTasks(action);
  };

  const addTask = (todoListId: string, title: string) => {
    dispatchTasks(addTaskAC(todoListId, title));
  };

  const editTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatchTasks(editTaskAC(todoListId, taskId, newTitle));
  };
  const removeTask = (todoListId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todoListId, taskId));
  };

  const changeTaskStatus = (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatchTasks(changeTaskStatusAC(todoListId, taskId, isDone));
  };

  const changeFilter = (todoListId: string, filter: FilterValuesType) => {
    dispatchTodoLists(changeFilterAC(todoListId, filter));
  };

  return (
    <div className="App">
      <ButtonAppBar />

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((list: TodoListType) => {
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
