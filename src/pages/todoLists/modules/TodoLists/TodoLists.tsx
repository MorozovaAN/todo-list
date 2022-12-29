import { Container, Grid, Paper } from "@mui/material";
import { AddItemForm } from "../../../../components/common/AddItemForm/AddItemForm";
import { TodoList } from "./TodoList/TodoList";
import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../state/store";
import {
  changeTodoListTitleTC,
  createTodoListTC,
  deleteTodoListTC,
  getTodoListsTC,
  TodoListsType,
} from "../../../../state/reducers/TodoListsReducer";
import { TasksType } from "../../../../state/reducers/TasksReducer";
import { Navigate } from "react-router-dom";

export const TodoLists = () => {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const todoLists = useAppSelector<TodoListsType>((state) => state.todoLists);
  const tasks = useAppSelector<TasksType>((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTodoListsTC());
    } else {
      return;
    }
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Container fixed>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm callBack={createTodoList} />
      </Grid>

      <Grid container spacing={3}>
        {todoLists.map((l) => {
          return (
            <Grid item key={l.id}>
              <Paper style={{ padding: "10px" }}>
                <TodoList
                  todoListId={l.id}
                  title={l.title}
                  tasks={tasks[l.id]}
                  filter={l.filter}
                  entityStatus={l.entityStatus}
                  changeTodoListTitle={changeTodoListTitle}
                  deleteTodoList={deleteTodoList}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
