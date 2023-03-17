import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";

type EditableSpanType = {
  callBack: (newTitle: string) => void;
  title: string;
};
export const EditableSpan: FC<EditableSpanType> = ({ title, callBack }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [edit, setEdit] = useState(false);

  const editHandler = () => {
    setEdit(!edit);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNewTitle(value);
  };

  const KeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTaskTitle();
    }
  };
  const addNewTaskTitle = () => {
    if (newTitle !== "") {
      editHandler();
      callBack(newTitle);
    }
  };

  return edit ? (
    <input
      type="text"
      value={newTitle}
      onChange={onChangeHandle}
      onKeyUp={KeyPressHandler}
      onBlur={addNewTaskTitle}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editHandler}>{title}</span>
  );
};
