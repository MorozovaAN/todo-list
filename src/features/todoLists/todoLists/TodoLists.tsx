import { Paper } from "@mui/material";
import { AddItemForm } from "../../../common/components/addItemForm/AddItemForm";
import { TodoList } from "./todoList/TodoList";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../common/hooks/useTypedSelector";

import {
  createTodoListTC,
  getTodoLists,
} from "../todoListsSlice/todoListsThunk";
import "./TodoLists.css";
import { authSelectors } from "../../auth";
import { tasksSelectors } from "./todoList/task";
import { todoListsActions, todoListsSelectors } from "../index";
import { useAction } from "../../../common/hooks/useActions";

export const TodoLists = () => {
  const isLoggedIn = useTypedSelector(authSelectors.isLoggedInSelector);
  const todoLists = useTypedSelector(todoListsSelectors.todoListsSelector);
  const tasks = useTypedSelector(tasksSelectors.tasksSelector);
  const { getTodoLists, createTodoListTC } = useAction(todoListsActions);

  useEffect(() => {
    isLoggedIn && getTodoLists();
  }, []);

  const createTodoList = useCallback((title: string) => {
    createTodoListTC(title);
  }, []);

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
              />
            </Paper>
          </div>
        );
      })}
    </div>
  );
};
