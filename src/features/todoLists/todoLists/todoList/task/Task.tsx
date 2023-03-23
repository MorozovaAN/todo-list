import { CustomCheckbox } from "../../../../../common/components/checkbox/Checkbox";
import { EditableSpan } from "../../../../../common/components/editableSpan/EditabelSpan";
import IconButton from "@mui/material/IconButton";
import React, { memo } from "react";
import { TaskStatuses, TaskType } from "../../../../../api/todolist-api";
import { useAction } from "../../../../../common/hooks/useActions";
import { tasksActions } from "./index";
import ClearIcon from "@mui/icons-material/Clear";
import "./Task.css";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Task = memo(({ task, todoListId }: TaskPropsType) => {
  const { id, title, status, ...restTaskProps } = task;
  const checkedTask = status === TaskStatuses.Completed;
  const { updateTasksTC, deleteTasksTC } = useAction(tasksActions);

  const changeTaskStatusHandler = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;

    updateTasksTC({
      todoListId,
      taskId: id,
      domainModel: { status: newStatus },
    });
  };

  const changeTaskTitleHandler = (newTitle: string) => {
    updateTasksTC({
      todoListId,
      taskId: id,
      domainModel: { title: newTitle },
    });
  };

  return (
    <li
      className={
        status === TaskStatuses.Completed ? "task task--isDone" : "task"
      }
    >
      <CustomCheckbox
        callBack={changeTaskStatusHandler}
        checked={checkedTask}
      />

      <EditableSpan title={title} callBack={changeTaskTitleHandler} />

      <IconButton
        onClick={() => deleteTasksTC({ todoListId, taskId: id })}
        className="task__btn-delete"
        aria-label="delete"
        size="small"
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </li>
  );
});
