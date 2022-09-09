import styles from "./TodoList.module.css";
import { CustomCheckbox } from "./Checkbox/Checkbox";
import { EditableSpan } from "./EditableSpan/EditabelSpan";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { memo } from "react";
import { TaskType } from "./TodoList";
import { useDispatch } from "react-redux";
import {
  changeTaskStatusAC,
  editTaskAC,
  removeTaskAC,
} from "../state/reducer/TasksReducer";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Task = memo(({ task, todoListId }: TaskPropsType) => {
  const { id, isDone, title } = { ...task };
  const dispatch = useDispatch();

  const changeTaskStatusHandler = (newStatus: boolean) => {
    dispatch(changeTaskStatusAC(todoListId, id, newStatus));
  };

  const editTaskHandler = (newTitle: string) => {
    dispatch(editTaskAC(todoListId, id, newTitle));
  };

  const removeTaskHandler = () => {
    dispatch(removeTaskAC(todoListId, id));
  };

  return (
    <li className={isDone ? styles.isDone : ""}>
      <CustomCheckbox callBack={changeTaskStatusHandler} isDone={isDone} />
      <EditableSpan title={title} callBack={editTaskHandler} />
      <IconButton
        onClick={removeTaskHandler}
        className={styles.btnDelete}
        aria-label="delete"
        size="small"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
});
