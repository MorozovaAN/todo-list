import React, { FC } from "react";
import styles from "./TodoList.module.css";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};
type TodoListType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: number) => void;
  changeFilter: (filter: FilterValuesType) => void;
};

export const TodoList: FC<TodoListType> = (props) => {
  const tasksItem = props.tasks.map((task) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button
          className={styles.btnDelete}
          type="button"
          onClick={() => {
            props.removeTask(task.id);
          }}
        >
          x
        </button>
      </li>
    );
  });

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>{tasksItem}</ul>
      <div>
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
