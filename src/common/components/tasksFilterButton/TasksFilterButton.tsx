import React, { memo } from "react";
import Button from "@mui/material/Button";
import { FilterValuesType } from "../../../features/todoLists/todoListsSlice/todoListsSlice";
import "./TasksFilterButton.css";

type TasksFilterButtonPropsType = {
  callback: (filter: FilterValuesType) => void;
  variant: boolean;
  label: "сделанные" | "активные" | "все";
};

export const TasksFilterButton = memo(
  ({ variant, label, callback }: TasksFilterButtonPropsType) => {
    const onClickHandler = () => {
      let value = "all" as FilterValuesType;
      switch (label) {
        case "активные":
          value = "active";
          break;
        case "сделанные":
          value = "completed";
      }
      callback(value);
    };
    return (
      <Button
        onClick={onClickHandler}
        variant={variant ? "contained" : "outlined"}
        classes={{ root: "todoList__buttons-btn" }}
        size="small"
      >
        {label}
      </Button>
    );
  }
);
