import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "../../../../../components/common/AddItemForm/AddItemForm";
import { EditableSpan } from "../../../../../components/common/EditableSpan/EditabelSpan";
import { Task } from "./Task/Task";
import { useAppDispatch } from "../../../../../state/store";
import {
  createTasksTC,
  getTasksTC,
} from "../../../../../state/reducers/TasksReducer";
import { TaskStatuses, TaskType } from "../../../../../api/todolist-api";
import {
  changeTasksFilterAC,
  FilterValuesType,
} from "../../../../../state/reducers/TodoListsReducer";
import styles from "./TodoList.module.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RequestStatusType } from "../../../../../state/reducers/AppReducer";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(todoListId));
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

  const tasksItem = tasks.length ? (
    tasksForRender.map((t) => {
      return <Task key={t.id} todoListId={todoListId} task={t} />;
    })
  ) : (
    <span>Your task list is empty</span>
  );

  const changeTasksFilterHandler = (filter: FilterValuesType) => {
    return () => dispatch(changeTasksFilterAC(todoListId, filter));
  };

  const deleteTodoListHandler = useCallback(() => {
    deleteTodoList(todoListId);
  }, [deleteTodoList, todoListId]);

  const createTask = useCallback(
    (title: string) => {
      dispatch(createTasksTC(todoListId, title));
    },
    [dispatch]
  );

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

      <ul className={styles.tasksLists}>{tasksItem}</ul>
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
