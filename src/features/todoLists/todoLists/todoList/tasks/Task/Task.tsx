import { CustomCheckbox } from "../../../../../../common/components/checkbox/Checkbox";
import { EditableSpan } from "../../../../../../common/components/editableSpan/EditabelSpan";
import IconButton from "@mui/material/IconButton";
import React, { memo, useCallback } from "react";
import { TaskStatuses, TaskType } from "../../../../../../api/types";
import { useAction } from "../../../../../../common/hooks/useActions";
import ClearIcon from "@mui/icons-material/Clear";
import "./Task.css";
import { tasksActions, updateTaskIdSelector } from "../index";
import { useTypedSelector } from "../../../../../../common/hooks/useTypedSelector";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
};

export const Task = memo(({ task, todoListId }: TaskPropsType) => {
  const { id, title, status } = task;
  const checkedTask = status === TaskStatuses.Completed;
  const updateTaskId = useTypedSelector(updateTaskIdSelector);
  const { updateTasksTC, deleteTasks } = useAction(tasksActions);

  const changeTaskStatusHandler = (checked: boolean) => {
    updateTasksTC({
      todoListId,
      taskId: id,
      domainModel: {
        status: checked ? TaskStatuses.Completed : TaskStatuses.New,
      },
    });
  };

  const changeTaskTitleHandler = useCallback((newTitle: string) => {
    updateTasksTC({
      todoListId,
      taskId: id,
      domainModel: { title: newTitle },
    });
  }, []);

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

      {status === TaskStatuses.New ? (
        <EditableSpan
          title={title}
          callBack={changeTaskTitleHandler}
          loading={id === updateTaskId}
        />
      ) : (
        <p>{title}</p>
      )}

      <IconButton
        onClick={() => deleteTasks({ todoListId, taskId: id })}
        className="task__btn-delete"
        aria-label="delete"
        size="small"
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </li>
  );
});
