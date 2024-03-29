import React, { useState, ChangeEvent, memo, useEffect } from "react";
import "./EditableSpan.css";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
  callBack: (newTitle: string) => void;
  title: string;
  loading: boolean;
  classes?: string;
};

export const EditableSpan = memo(
  ({ loading, title, callBack, classes }: EditableSpanPropsType) => {
    const [newTitle, setNewTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      setNewTitle(title);
    }, [title]);

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.currentTarget.value;
      setNewTitle(title);
      if (title.length > 100) {
        setError("Возможно не более 100 символов");
      } else if (!title.trim()) {
        setError("Поле не может быть пустым");
      } else {
        setError("");
      }
    };

    const changeTitleHandler = () => {
      if (newTitle !== title && !error) {
        callBack(newTitle.trim());
      }
      if (!newTitle.trim()) {
        setNewTitle(title);
        setError("");
      }
      setEditMode(false);
    };

    const inputOnKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && e.shiftKey && !error) {
        if (newTitle !== title) callBack(newTitle.trim());
        else setNewTitle(title.trim());
        setEditMode(false);
      }
    };

    const text = loading ? (
      <div className="editable-span__skeleton-wrapper">
        <Skeleton className="editable-span__skeleton" variant="rectangular" />
      </div>
    ) : (
      <span
        className="editable-span__title"
        onDoubleClick={() => setEditMode(!editMode)}
      >
        {title}
      </span>
    );
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
      text
    );
  }
);
