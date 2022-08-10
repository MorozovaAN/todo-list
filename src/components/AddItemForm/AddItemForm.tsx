import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styles from "../TodoList.module.css";

type AddItemFormType = {
  callBack: (title: string) => void;
};
export const AddItemForm: FC<AddItemFormType> = ({ callBack }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setTitle(e.currentTarget.value);
  };

  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickAddTask();
  };

  const onClickAddTask = () => {
    if (title.trim() !== "") {
      callBack(title.trim());
      setTitle("");
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <input
        className={error ? styles.inputError : ""}
        value={title}
        onChange={inputOnChange}
        onKeyDown={onKeyDownAddTask}
      />
      <button onClick={onClickAddTask}>+</button>
      {error && <div className={styles.textError}>Error. Enter task text</div>}
    </div>
  );
};
