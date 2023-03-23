import Paper from "@mui/material/Paper";
import { AddItemForm } from "../../../common/components/addItemForm/AddItemForm";
import { TodoList } from "./todoList/TodoList";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../common/hooks/useTypedSelector";
import { authSelectors } from "../../auth";
import { tasksSelectors } from "./todoList/task";
import { todoListsActions, todoListsSelector } from "../index";
import { useAction } from "../../../common/hooks/useActions";
import "./TodoLists.css";

export const TodoLists = () => {
  const isLoggedIn = useTypedSelector(authSelectors.isLoggedInSelector);
  const todoLists = useTypedSelector(todoListsSelector);
  const tasks = useTypedSelector(tasksSelectors.tasksSelector);
  const { getTodoLists, createTodoListTC } = useAction(todoListsActions);

  useEffect(() => {
    isLoggedIn && getTodoLists();
  }, []);

  const createTodoList = useCallback((title: string) => {
    createTodoListTC(title);
  }, []);

  return isLoggedIn ? (
    <div className="todoLists">
      <Paper classes={{ root: "todoLists__add-item" }}>
        <AddItemForm
          callback={createTodoList}
          placeholder="write title for new todo list"
        />
      </Paper>

      {todoLists.map((l) => {
        return (
          <div key={l.id}>
            <Paper className="todoLists__todoList-wrapper">
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
  ) : (
    <Navigate to="/login" />
  );
};
