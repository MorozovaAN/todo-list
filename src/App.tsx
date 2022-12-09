import React, { useCallback, useEffect } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";
import { AddItemForm } from "./components/common/AddItemForm/AddItemForm";
import { ButtonAppBar } from "./components/ButtonAppBar/ButtonAppBar";
import { Container, Grid, Paper } from "@mui/material";
import { TasksType } from "./state/reducer/TasksReducer";
import {
  createTodoListTC,
  deleteTodoListTC,
  getTodoListsTC,
  TodoListsType,
  changeTodoListTitleTC,
} from "./state/reducer/TodoListsReducer";
import { useAppDispatch, useAppSelector } from "./state/store";

export const App = () => {
  const todoLists = useAppSelector<TodoListsType>((state) => state.todoLists);
  const tasks = useAppSelector<TasksType>((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodoListsTC());
  }, []);

  const createTodoList = useCallback(
    (title: string) => {
      dispatch(createTodoListTC(title));
    },
    [dispatch]
  );

  const deleteTodoList = useCallback(
    (todoListId: string) => {
      dispatch(deleteTodoListTC(todoListId));
    },
    [dispatch]
  );

  const changeTodoListTitle = useCallback(
    (todoListId: string, newTitle: string) => {
      dispatch(changeTodoListTitleTC(todoListId, newTitle));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <ButtonAppBar />

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={createTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((list) => {
            return (
              <Grid item key={list.id}>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    todoListId={list.id}
                    title={list.title}
                    tasks={tasks[list.id]}
                    filter={list.filter}
                    changeTodoListTitle={changeTodoListTitle}
                    deleteTodoList={deleteTodoList}
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
