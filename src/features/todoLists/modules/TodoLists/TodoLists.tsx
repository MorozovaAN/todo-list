import { Container, Grid, Paper } from "@mui/material";
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm";
import { TodoList } from "./TodoList/TodoList";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../../common/hooks/AppSelector";
import { useAppDispatch } from "../../../../common/hooks/AppDispatch";

import {
  updateTodoListTitleTC,
  createTodoListTC,
  deleteTodoListTC,
  getTodoLists,
} from "../../todoListsSlice/todoListsThunk";

export const TodoLists = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const todoLists = useAppSelector((state) => state.todoLists);
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isLoggedIn && dispatch(getTodoLists());
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
      dispatch(updateTodoListTitleTC({ todoListId, title: newTitle }));
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
