import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "../../../../common/components/addItemForm/AddItemForm";
import { EditableSpan } from "../../../../common/components/editableSpan/EditabelSpan";
import { Task } from "./task/Task";
import { createTasksTC, fetchTasks } from "./task/tasksSlice/tasksThunk";
import { TaskStatuses, TaskType } from "../../../../api/todolist-api";
import styles from "./TodoList.module.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
    const dispatch = useTypedDispatch();
    let tasksForRender;

    switch (filter) {
      case "completed":
        tasksForRender = tasks.filter((t) => t.status === TaskStatuses.New);
        break;
      case "active":
        tasksForRender = tasks.filter(
          (t) => t.status === TaskStatuses.Completed
        );
        break;
      default:
        tasksForRender = tasks;
    }

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
        <div className={styles.titleContainer}>
          <EditableSpan callBack={changeTodoListTitle} title={title} />

          <IconButton
            onClick={deleteTodoList}
            disabled={entityStatus === "loading"}
            className={styles.btnDeleteTodoList}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>

        <AddItemForm
          callBack={(title: string) => createTasksTC({ todoListId, title })}
          disabled={entityStatus === "loading"}
        />

        <ul className={styles.tasksLists}>
          {tasks.length ? (
            tasksForRender.map((t) => (
              <Task key={t.id} todoListId={todoListId} task={t} />
            ))
          ) : (
            <span>Your task list is empty</span>
          )}
        </ul>

        <div className={styles.buttons}>
          <Button
            onClick={changeTasksFilterHandler("all")}
            variant={filter === "all" ? "contained" : "outlined"}
            size="small"
          >
            All
          </Button>

          <Button
            onClick={changeTasksFilterHandler("active")}
            variant={filter === "active" ? "contained" : "outlined"}
            size="small"
          >
            Active
          </Button>

          <Button
            onClick={changeTasksFilterHandler("completed")}
            variant={filter === "completed" ? "contained" : "outlined"}
            size="small"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
);
