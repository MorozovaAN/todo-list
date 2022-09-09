import React, { useCallback } from "react";
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

  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const editTodoListTitle = useCallback(
    (todoListId: string, title: string) => {
      dispatch(editTodoListTitleAC(todoListId, title));
    },
    [dispatch]
  );

  const removeTodoList = useCallback(
    (todoListId: string) => {
      const action = removeTodoListAC(todoListId);
      dispatch(action);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (todoListId: string, title: string) => {
      dispatch(addTaskAC(todoListId, title));
    },
    [dispatch]
  );

  const editTask = useCallback(
    (todoListId: string, taskId: string, newTitle: string) => {
      dispatch(editTaskAC(todoListId, taskId, newTitle));
    },
    [dispatch]
  );

  const removeTask = useCallback(
    (todoListId: string, taskId: string) => {
      dispatch(removeTaskAC(todoListId, taskId));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (todoListId: string, taskId: string, isDone: boolean) => {
      dispatch(changeTaskStatusAC(todoListId, taskId, isDone));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterValuesType) => {
      dispatch(changeFilterAC(todoListId, filter));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <ButtonAppBar />

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((list: TodoListType) => {
            return (
              <Grid item key={list.id}>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    todoListId={list.id}
                    title={list.title}
                    filter={list.filter}
                    tasks={tasks[list.id]}
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
