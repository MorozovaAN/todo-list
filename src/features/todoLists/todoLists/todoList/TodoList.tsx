import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "../../../../common/components/addItemForm/AddItemForm";
import { EditableSpan } from "../../../../common/components/editableSpan/EditabelSpan";
import { Task } from "./task/Task";
import { createTasksTC, fetchTasks } from "./task/tasksSlice/tasksThunk";
import { TaskType } from "../../../../api/todolist-api";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { RequestStatusType } from "../../../../app/appSlice/appSlice";
import {
  FilterValuesType,
  updateFilter,
} from "../../todoListsSlice/todoListsSlice";
import {
  deleteTodoListTC,
  updateTodoListTitleTC,
} from "../../todoListsSlice/todoListsThunk";
import { useAction } from "../../../../common/hooks/useActions";
import { todoListsActions } from "../../index";
import { tasksActions } from "./task";
import { useTypedDispatch } from "../../../../common/hooks/useTypedDispatch";
import { tasksFilter } from "../../../../common/utils/tasksFilter";
import "./TodoList.css";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const TodoList = memo<TodoListPropsType>(
  ({ todoListId, title, tasks, filter, entityStatus }) => {
    const { deleteTodoListTC, updateTodoListTitleTC } =
      useAction(todoListsActions);
    const { fetchTasks, createTasksTC } = useAction(tasksActions);
    const tasksForRender = tasksFilter(tasks, filter);
    const dispatch = useTypedDispatch();

    useEffect(() => {
      fetchTasks(todoListId);
    }, []);

    const changeTasksFilterHandler = (filter: FilterValuesType) => {
      return () => dispatch(updateFilter({ todoListId, filter }));
    };

    const deleteTodoList = useCallback(() => {
      deleteTodoListTC(todoListId);
    }, [todoListId]);

    const changeTodoListTitle = useCallback(
      (newTitle: string) => {
        updateTodoListTitleTC({ todoListId, title: newTitle });
      },
      [todoListId]
    );

    return (
      <div>
        <div className="todoList__title-wrapper">
          <EditableSpan callBack={changeTodoListTitle} title={title} />

          <IconButton
            onClick={deleteTodoList}
            disabled={entityStatus === "loading"}
            className="todoList__btn--delete"
            aria-label="delete"
            size="small"
          >
            <Delete fontSize="medium" />
          </IconButton>
        </div>

        <AddItemForm
          callback={(title: string) => createTasksTC({ todoListId, title })}
          disabled={entityStatus === "loading"}
          placeholder="write your task"
        />

        <ul className="todoList__tasks">
          {tasksForRender.length ? (
            tasksForRender.map((t) => (
              <Task key={t.id} todoListId={todoListId} task={t} />
            ))
          ) : (
            <p className="todoList__empty-list-title">
              {filter === "all" && "Todo list is empty"}
              {filter === "active" && "No active tasks"}
              {filter === "completed" && "No completed tasks"}
            </p>
          )}
        </ul>

        <div className="todoList__buttons-wrapper">
          <Button
            onClick={changeTasksFilterHandler("all")}
            variant={filter === "all" ? "contained" : "outlined"}
            classes={{ root: "todoList__buttons-btn" }}
            color="secondary"
            size="small"
          >
            All
          </Button>

          <Button
            onClick={changeTasksFilterHandler("active")}
            variant={filter === "active" ? "contained" : "outlined"}
            classes={{ root: "todoList__buttons-btn" }}
            color="secondary"
            size="small"
          >
            Active
          </Button>

          <Button
            onClick={changeTasksFilterHandler("completed")}
            variant={filter === "completed" ? "contained" : "outlined"}
            classes={{ root: "todoList__buttons-btn" }}
            color="secondary"
            size="small"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
);
