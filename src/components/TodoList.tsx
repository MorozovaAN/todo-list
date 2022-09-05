import React, { FC } from "react";
import styles from "./TodoList.module.css";
import { AddItemForm } from "./AddItemForm/AddItemForm";
import { EditableSpan } from "./EditableSpan/EditabelSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomCheckbox } from "./Checkbox/Checkbox";
import { FilterValuesType } from "../state/reducer/TodoListsReducer";

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

export const TodoList: FC<TodoListType> = (props) => {
  const editTaskHandler = (taskId: string, newTitle: string) => {
    props.editTask(props.todoListId, taskId, newTitle);
  };
  const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
    props.changeTaskStatus(props.todoListId, taskId, isDone);
  };

  const tasksItem = props.tasks.length ? (
    props.tasks.map((task) => {
      const removeTask = () => props.removeTask(props.todoListId, task.id);

      return (
        <li className={task.isDone ? styles.isDone : ""} key={task.id}>
          <CustomCheckbox
            callBack={(isDone) => changeTaskStatusHandler(task.id, isDone)}
            isDone={task.isDone}
          />
          <EditableSpan
            title={task.title}
            callBack={(newTitle) => editTaskHandler(task.id, newTitle)}
          />
          <IconButton
            onClick={removeTask}
            className={styles.btnDelete}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </li>
      );
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
  const addTaskHandler = (title: string) => {
    props.addTask(props.todoListId, title);
  };
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
};
