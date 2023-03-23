import React, { FC } from "react";
import Button from "@mui/material/Button";
import {
  FilterValuesType,
  updateFilter,
} from "../../../features/todoLists/todoListsSlice/todoListsSlice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";

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
  const dispatch = useTypedDispatch();

  return (
    <Button
      onClick={() => dispatch(updateFilter({ todoListId, filter: label }))}
      variant={label === filter ? "contained" : "outlined"}
      classes={{ root: "todoList__buttons-btn" }}
      color="secondary"
      size="small"
    >
      {label}
    </Button>
  );
};
