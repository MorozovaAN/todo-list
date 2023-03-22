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
} from "../../todoListsSlice/todoListsSlicer";
import { useTypedDispatch } from "../../../../common/hooks/useTypedDispatch";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
  deleteTodoList: (todoListId: string) => void;
};

export const TodoList = memo((props: TodoListPropsType) => {
  const {
    todoListId,
    title,
    tasks,
    filter,
    entityStatus,
    changeTodoListTitle,
    deleteTodoList,
  } = props;
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchTasks(todoListId));
  }, []);

  let tasksForRender;
  switch (filter) {
    case "completed":
      tasksForRender = tasks.filter((t) => t.status === TaskStatuses.New);
      break;
    case "active":
      tasksForRender = tasks.filter((t) => t.status === TaskStatuses.Completed);
      break;
    default:
      tasksForRender = tasks;
  }

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    return () => dispatch(updateFilter({ todoListId, filter }));
  };

  const deleteTodoListHandler = useCallback(() => {
    deleteTodoList(todoListId);
  }, [deleteTodoList, todoListId]);

  const createTask = (title: string) => {
    dispatch(createTasksTC({ todoListId, title }));
  };

  const changeTodoListTitleHandler = useCallback(
    (newTitle: string) => {
      changeTodoListTitle(todoListId, newTitle);
    },
    [changeTodoListTitle, todoListId]
  );

  return (
    <div>
      <div className={styles.titleContainer}>
        <EditableSpan callBack={changeTodoListTitleHandler} title={title} />
        <IconButton
          onClick={deleteTodoListHandler}
          disabled={entityStatus === "loading"}
          className={styles.btnDeleteTodoList}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>

      <AddItemForm
        callBack={createTask}
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
});
