import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import s from "./AddItemForm.module.css";
import { Button, TextField } from "@mui/material";

type AddItemFormType = {
  callBack: (title: string) => void;
  disabled?: boolean;
};
export const AddItemForm = memo(({ callBack, disabled }: AddItemFormType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setTitle(e.currentTarget.value);
  };

  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") buttonClickHandler();
  };

  const buttonClickHandler = () => {
    if (title.trim() !== "") {
      callBack(title.trim());
      setTitle("");
    } else {
      setError(true);
    }
  };

  return (
    <div className={s.container}>
      <TextField
        onChange={inputOnChange}
        onKeyDown={onKeyDownAddTask}
        disabled={disabled}
        value={title}
        error={error}
        label={error ? "Title is required" : ""}
        id="standard-basic"
        variant="standard"
      />

      <Button
        onClick={buttonClickHandler}
        disabled={disabled}
        className={s.button}
        style={{
          maxWidth: "25px",
          maxHeight: "25px",
          minWidth: "25px",
          minHeight: "25px",
          marginLeft: "10px",
        }}
        color="success"
        variant="contained"
      >
        +
      </Button>
    </div>
  );
});
