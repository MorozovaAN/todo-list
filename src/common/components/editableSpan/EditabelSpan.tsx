import React, { useState, ChangeEvent, memo } from "react";
import "./EditableSpan.css";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  callBack: (newTitle: string) => void;
  title: string;
};

export const EditableSpan = memo(
  ({ title, callBack }: EditableSpanPropsType) => {
    const [newTitle, setNewTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.currentTarget.value;
      setNewTitle(title);
      if (title.length > 100) {
        setError("You can write 100 symbols or less");
      } else if (!title.trim()) {
        setError("Field cannot be empty");
      } else {
        setError("");
      }
    };

    const changeTitleHandler = () => {
      if (newTitle !== title && !error) {
        callBack(newTitle.trim());
        setEditMode(false);
      }
      if (!newTitle.trim()) {
        setEditMode(false);
        setNewTitle(title);
        setError("");
      }
    };

    const inputOnKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && e.shiftKey && !error) {
        newTitle !== title && callBack(newTitle.trim());
        setEditMode(false);
      }
    };

    return editMode ? (
      <TextField
        onChange={inputOnChangeHandler}
        onKeyDown={inputOnKeyDownHandler}
        onBlur={changeTitleHandler}
        label={error}
        value={newTitle}
        error={Boolean(error)}
        maxRows={3}
        multiline
        autoFocus
        id="standard-basic"
        variant="standard"
        classes={{ root: "editable-span__input" }}
      />
    ) : (
      <span
        className="editable-span__title"
        onDoubleClick={() => setEditMode(!editMode)}
      >
        {title}
      </span>
    );
  }
);
