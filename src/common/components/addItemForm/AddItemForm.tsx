import React, { ChangeEvent, memo, useState } from "react";
import "./AddItemForm.css";
import { Button, TextField } from "@mui/material";

type AddItemFormPropsType = {
  callback: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = memo(
  ({ callback: callback, disabled }: AddItemFormPropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      error && setError(false);
      setTitle(e.currentTarget.value);
    };

    const addItemHandler = () => {
      const newTitle = title.trim();

      if (newTitle) {
        callback(newTitle);
        setTitle("");
      } else {
        setError(true);
      }
    };

    return (
      <div className="add-item-form">
        <TextField
          onChange={inputOnChangeHandler}
          onKeyDown={(e) => e.key === "Enter" && addItemHandler()}
          onBlur={() => setError(false)}
          label={error ? "Title is required" : ""}
          classes={{ root: "add-item-form__input" }}
          disabled={disabled}
          value={title}
          error={error}
          placeholder="write your task"
          id="standard-basic"
          variant="standard"
        />

        <Button
          onClick={addItemHandler}
          disabled={disabled || !title.trim()}
          classes={{
            root: "add-item-form__button",
          }}
          color="success"
          variant="contained"
        >
          +
        </Button>
      </div>
    );
  }
);
