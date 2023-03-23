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
      setError(title.length > 80 ? "You can write 80 symbols or less" : "");
    };

    const changeTitleHandler = () => {
      if (newTitle !== title && !error) {
        callBack(newTitle.trim());
      }
      if (newTitle.length > 80) {
        setNewTitle(title);
      }
      setError("");
      setEditMode(false);
    };

    return editMode ? (
      <TextField
        onChange={inputOnChangeHandler}
        onKeyUp={(e) => e.key === "Enter" && changeTitleHandler()}
        onBlur={changeTitleHandler}
        label={error}
        value={newTitle}
        error={Boolean(error)}
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
