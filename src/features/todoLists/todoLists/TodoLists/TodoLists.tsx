import Paper from "@mui/material/Paper";
import { AddItemForm } from "../../../../common/components/addItemForm/AddItemForm";
import React, { useCallback, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../../common/hooks/useTypedSelector";
import { tasksSelector } from "../todoList/tasks";
import { TodoList, todoListsActions, todoListsSelector } from "../../index";
import { useAction } from "../../../../common/hooks/useActions";
import "./TodoLists.css";
import { isLoggedInSelector } from "../../../auth";

export const TodoLists = () => {
  const isLoggedIn = useTypedSelector(isLoggedInSelector);
  const todoLists = useTypedSelector(todoListsSelector);
  const tasks = useTypedSelector(tasksSelector);
  const { fetchTodoLists, createTodoList } = useAction(todoListsActions);

  useEffect(() => {
    isLoggedIn && fetchTodoLists();
  }, []);

  const createTodoListHandler = useCallback((title: string) => {
    createTodoList(title);
  }, []);

  return isLoggedIn ? (
    <div className="todoLists">
      <Paper classes={{ root: "todoLists__add-item" }}>
        <AddItemForm
          callback={createTodoListHandler}
          placeholder="название нового списка задач"
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
