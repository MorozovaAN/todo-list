import React from "react";
import { TodoList } from "./components/TodoList";
import "./App.css";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { ButtonAppBar } from "./components/ButtonAppBar/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTaskAC,
  changeTaskStatusAC,
  editTaskAC,
  removeTaskAC,
  TasksType,
} from "./state/reducer/TasksReducer";
import {
  addTodoListAC,
  editTodoListTitleAC,
  removeTodoListAC,
  changeFilterAC,
  TodoListType,
  FilterValuesType,
} from "./state/reducer/TodoListsReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

export const App = () => {
  let todoLists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todoLists
  );
  let tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);
  const dispatch = useDispatch();

  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

  const editTodoListTitle = (todoListId: string, title: string) => {
    dispatch(editTodoListTitleAC(todoListId, title));
  };

  const removeTodoList = (todoListId: string) => {
    const action = removeTodoListAC(todoListId);
    dispatch(action);
  };

  const addTask = (todoListId: string, title: string) => {
    dispatch(addTaskAC(todoListId, title));
  };

  const editTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatch(editTaskAC(todoListId, taskId, newTitle));
  };
  const removeTask = (todoListId: string, taskId: string) => {
    dispatch(removeTaskAC(todoListId, taskId));
  };

  const changeTaskStatus = (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusAC(todoListId, taskId, isDone));
  };

  const changeFilter = (todoListId: string, filter: FilterValuesType) => {
    dispatch(changeFilterAC(todoListId, filter));
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
