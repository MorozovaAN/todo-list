import React, { memo, useCallback } from "react";
import styles from "./TodoList.module.css";
import { AddItemForm } from "../common/AddItemForm/AddItemForm";
import { EditableSpan } from "../common/EditableSpan/EditabelSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterValuesType } from "../../state/reducer/TodoListsReducer";
import { Task } from "../Task/Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type TodoListType = {
  todoListId: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTodoList: (todoListId: string) => void;
  removeTask: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, filter: FilterValuesType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeTaskStatus: (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  editTask: (todoListId: string, taskId: string, newTitle: string) => void;
  editTodoListTitle: (todoListId: string, title: string) => void;
};

export const TodoList = memo((props: TodoListType) => {
  let taskForRender;
  switch (props.filter) {
    case "completed":
      taskForRender = props.tasks.filter((task) => task.isDone);
      break;
    case "active":
      taskForRender = props.tasks.filter((task) => !task.isDone);
      break;
    default:
      taskForRender = props.tasks;
  }

  const tasksItem = props.tasks.length ? (
    taskForRender.map((task) => {
      return <Task key={task.id} task={task} todoListId={props.todoListId} />;
    })
  ) : (
    <span>Your task list is empty</span>
  );

  const changeFilterHandler = (filter: FilterValuesType) => {
    return () => props.changeFilter(props.todoListId, filter);
  };

  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId);
  };

  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(props.todoListId, title);
    },
    [props.addTask, props.todoListId]
  );

  const editTodoListTitleHandler = (newTitle: string) => {
    props.editTodoListTitle(props.todoListId, newTitle);
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <EditableSpan callBack={editTodoListTitleHandler} title={props.title} />
        <IconButton
          onClick={removeTodoListHandler}
          className={styles.btnDeleteTodoList}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>

      <AddItemForm callBack={addTaskHandler} />

      <ul className={styles.tasksLists}>{tasksItem}</ul>
      <div>
        <Button
          onClick={changeFilterHandler("all")}
          variant={props.filter === "all" ? "contained" : "outlined"}
          size="small"
        >
          All
        </Button>
        <Button
          onClick={changeFilterHandler("active")}
          variant={props.filter === "active" ? "contained" : "outlined"}
          size="small"
        >
          Active
        </Button>
        <Button
          onClick={changeFilterHandler("completed")}
          variant={props.filter === "completed" ? "contained" : "outlined"}
          size="small"
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
