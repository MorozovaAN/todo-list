import { Paper } from "@mui/material";
import { AddItemForm } from "../../../common/components/addItemForm/AddItemForm";
import { TodoList } from "./todoList/TodoList";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../common/hooks/useTypedSelector";
import { useTypedDispatch } from "../../../common/hooks/useTypedDispatch";

import {
  createTodoListTC,
  deleteTodoListTC,
  getTodoLists,
  updateTodoListTitleTC,
} from "../todoListsSlice/todoListsThunk";
import "./TodoLists.css";
import { authSelectors } from "../../auth";

export const TodoLists = () => {
  const isLoggedIn = useTypedSelector(authSelectors.isLoggedInSelector);
  const todoLists = useTypedSelector((state) => state.todoLists);
  const tasks = useTypedSelector((state) => state.tasks);
  const dispatch = useTypedDispatch();

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
      deleteTodoListTC(todoListId);
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
    <div className="todoListsContainer">
      <Paper classes={{ root: "addItem" }}>
        <AddItemForm callBack={createTodoList} />
      </Paper>

      {todoLists.map((l) => {
        return (
          <div key={l.id}>
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
          </div>
        );
      })}
    </div>
  );
};
