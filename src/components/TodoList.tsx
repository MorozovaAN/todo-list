import React, { FC, useState, KeyboardEvent, ChangeEvent } from "react";
import styles from "./TodoList.module.css";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type TodoListType = {
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
};

export const TodoList: FC<TodoListType> = (props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const tasksItem = props.tasks.length ? (
    props.tasks.map((task) => {
      const removeTask = () => props.removeTask(task.id);
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(task.id, e.currentTarget.checked);
      };

      return (
        <li className={task.isDone ? styles.isDone : ""} key={task.id}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={changeTaskStatus}
          />
          <span>{task.title}</span>
          <button
            className={styles.btnDelete}
            onClick={removeTask}
            type="button"
          >
            x
          </button>
        </li>
      );
    })
  ) : (
    <span>Your task list is empty</span>
  );

  const onClickAddTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim());
      setTitle("");
    } else {
      setError(true);
    }
  };
  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickAddTask();
  };
  const changeFilterHandler = (filter: FilterValuesType) => {
    return () => props.changeFilter(filter);
  };
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? styles.inputError : ""}
          value={title}
          onChange={inputOnChange}
          onKeyDown={onKeyDownAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
        {error && (
          <div className={styles.textError}>Error. Enter task text</div>
        )}
      </div>
      <ul>{tasksItem}</ul>
      <div>
        <button
          className={props.filter === "all" ? styles.btnActive : ""}
          onClick={changeFilterHandler("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? styles.btnActive : ""}
          onClick={changeFilterHandler("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? styles.btnActive : ""}
          onClick={changeFilterHandler("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
