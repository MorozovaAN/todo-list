import React, { FC } from "react";
import Button from "@mui/material/Button";
import { FilterValuesType } from "../../../features/todoLists/todoListsSlice/todoListsSlice";
import "./TasksFilterButton.css";
import { useAction } from "../../hooks/useActions";
import { todoListsActions } from "../../../features/todoLists";

type TasksFilterButtonPropsType = {
  todoListId: string;
  filter: FilterValuesType;
  label: FilterValuesType;
};

export const TasksFilterButton: FC<TasksFilterButtonPropsType> = ({
  filter,
  label,
  todoListId,
}) => {
  const { updateFilter } = useAction(todoListsActions);

  return (
    <Button
      onClick={() => updateFilter({ todoListId, filter: label })}
      variant={label === filter ? "contained" : "outlined"}
      classes={{ root: "todoList__buttons-btn" }}
      size="small"
    >
      {label}
    </Button>
  );
};
