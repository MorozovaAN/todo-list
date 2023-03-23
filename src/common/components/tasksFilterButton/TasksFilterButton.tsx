import React, { memo } from "react";
import Button from "@mui/material/Button";
import { FilterValuesType } from "../../../features/todoLists/todoListsSlice/todoListsSlice";
import "./TasksFilterButton.css";

type TasksFilterButtonPropsType = {
  callback: (filter: FilterValuesType) => void;
  variant: boolean;
  label: FilterValuesType;
};

export const TasksFilterButton = memo(
  ({ variant, label, callback }: TasksFilterButtonPropsType) => {
    return (
      <Button
        onClick={() => callback(label)}
        variant={variant ? "contained" : "outlined"}
        classes={{ root: "todoList__buttons-btn" }}
        size="small"
      >
        {label}
      </Button>
    );
  }
);
