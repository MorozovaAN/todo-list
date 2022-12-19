import styles from "../TodoList.module.css";
import { CustomCheckbox } from "../../../../../../components/common/Checkbox/Checkbox";
import { EditableSpan } from "../../../../../../components/common/EditableSpan/EditabelSpan";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { memo } from "react";
import {
  deleteTasksTC,
  updateTasksTC,
} from "../../../../../../state/reducer/TasksReducer";
import { useAppDispatch } from "../../../../../../state/store";
import { TaskStatuses, TaskType } from "../../../../../../api/todolist-api";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Task = memo(({ task, todoListId }: TaskPropsType) => {
  const { id, title, status, ...restTaskProps } = task;
  const checkedTask = status === TaskStatuses.Completed;
  const dispatch = useAppDispatch();

  const changeTaskStatusHandler = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTasksTC(todoListId, id, { status: newStatus }));
  };

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTasksTC(todoListId, id, { title: newTitle }));
  };

  const deleteTask = () => {
    dispatch(deleteTasksTC(todoListId, id));
  };

  return (
    <li className={status === TaskStatuses.Completed ? styles.isDone : ""}>
      <CustomCheckbox
        callBack={changeTaskStatusHandler}
        checked={checkedTask}
      />
      <EditableSpan title={title} callBack={changeTaskTitleHandler} />
      <IconButton
        onClick={deleteTask}
        className={styles.btnDelete}
        aria-label="delete"
        size="small"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
});
