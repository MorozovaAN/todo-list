import React, { ChangeEvent, memo, useState } from "react";
import "./AddItemForm.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
  callback: (title: string) => void;
  disabled?: boolean;
  placeholder: string;
};

export const AddItemForm = memo(
  ({ callback, disabled, placeholder }: AddItemFormPropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.currentTarget.value;
      error && setError("");
      setTitle(title);
      title.trim().length > 100 && setError("Возможно не более 100 символов");
    };

    const addItemHandler = () => {
      const newTitle = title.trim();

      !newTitle && setError("Поле не может быть пустым");

      if (newTitle && !error) {
        callback(newTitle);
        setTitle("");
      }
    };

    return (
      <div className="add-item-form">
        <TextField
          onChange={inputOnChangeHandler}
          onKeyUp={(e) => e.key === "Enter" && e.shiftKey && addItemHandler()}
          onBlur={() => setError("")}
          label={error}
          classes={{ root: "add-item-form__input" }}
          disabled={disabled}
          value={title}
          error={Boolean(error)}
          placeholder={placeholder}
          maxRows={3}
          multiline
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
          <span className="add-item-form__button-icon">&#43;</span>
        </Button>

        <Button
          onClick={() => setTitle("")}
          disabled={disabled || !title.trim()}
          classes={{
            root: "add-item-form__button",
          }}
          color="error"
          variant="contained"
        >
          <span className="add-item-form__button-icon">&times;</span>
        </Button>
      </div>
    );
  }
);
