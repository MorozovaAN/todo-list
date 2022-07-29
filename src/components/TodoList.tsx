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
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const TodoList: FC<TodoListType> = (props) => {
  const [title, setTitle] = useState("");

  const tasksItem = props.tasks.length ? (
    props.tasks.map((task) => {
      const removeTask = () => props.removeTask(task.id);

      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone} />
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
    props.addTask(title);
    setTitle("");
  };
  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickAddTask();
  };
  const changeFilterHandler = (filter: FilterValuesType) => {
    return () => props.changeFilter(filter);
  };
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={inputOnChange}
          onKeyDown={onKeyDownAddTask}
        />
        <button onClick={onClickAddTask}>+</button>
      </div>
      <ul>{tasksItem}</ul>
      <div>
        <button onClick={changeFilterHandler("all")}>All</button>
        <button onClick={changeFilterHandler("active")}>Active</button>
        <button onClick={changeFilterHandler("completed")}>Completed</button>
      </div>
    </div>
  );
};
