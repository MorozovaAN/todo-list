import React, { FC, useState } from "react";
import "./EditableSpan.css";

type EditableSpanPropsType = {
  callBack: (newTitle: string) => void;
  title: string;
};

export const EditableSpan: FC<EditableSpanPropsType> = ({
  title,
  callBack,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [editMode, setEditMode] = useState(false);

  const changeTitleHandler = () => {
    newTitle !== title && callBack(newTitle.trim());
    setEditMode(false);
  };

  return editMode ? (
    <input
      type="text"
      className="editable-span__input"
      value={newTitle}
      onChange={(e) => setNewTitle(e.currentTarget.value)}
      onKeyUp={(e) => e.key === "Enter" && changeTitleHandler()}
      onBlur={changeTitleHandler}
      autoFocus
    />
  ) : (
    <span
      className="editable-span__title"
      onDoubleClick={() => setEditMode(!editMode)}
    >
      {title}
    </span>
  );
};
