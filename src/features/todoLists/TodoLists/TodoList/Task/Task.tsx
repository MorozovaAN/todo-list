import styles from "../TodoList.module.css";
import { CustomCheckbox } from "../../../../../common/components/Checkbox/Checkbox";
import { EditableSpan } from "../../../../../common/components/EditableSpan/EditabelSpan";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { memo } from "react";
import { TaskStatuses, TaskType } from "../../../../../api/todolist-api";
// @ts-ignore
import { deleteTasksTC, updateTasksTC } from "./tasksSlice/tasksThunk";
import { useTypedDispatch } from "../../../../../common/hooks/useTypedDispatch";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Task = memo(({ task, todoListId }: TaskPropsType) => {
  const { id, title, status, ...restTaskProps } = task;
  const checkedTask = status === TaskStatuses.Completed;
  const dispatch = useTypedDispatch();

  const changeTaskStatusHandler = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(
      updateTasksTC({
        todoListId,
        taskId: id,
        domainModel: { status: newStatus },
      })
    );
  };

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(
      updateTasksTC({
        todoListId,
        taskId: id,
        domainModel: { title: newTitle },
      })
    );
  };

  const deleteTask = () => {
    dispatch(deleteTasksTC({ todoListId, taskId: id }));
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
