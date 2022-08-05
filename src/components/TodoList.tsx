import React, { FC, useState, KeyboardEvent, ChangeEvent } from "react";
import styles from "./TodoList.module.css";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type TodoListType = {
  todoListId: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTodoList: (todoListId: string) => void;
  removeTask: (todoListId: string, id: string) => void;
  changeFilter: (todoListId: string, filter: FilterValuesType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void;
};

export const TodoList: FC<TodoListType> = (props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const tasksItem = props.tasks.length ? (
    props.tasks.map((task) => {
      const removeTask = () => props.removeTask(props.todoListId, task.id);
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(
          props.todoListId,
          task.id,
          e.currentTarget.checked
        );
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
      props.addTask(props.todoListId, title.trim());
      setTitle("");
    } else {
      setError(true);
    }
  };
  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickAddTask();
  };
  const changeFilterHandler = (filter: FilterValuesType) => {
    return () => props.changeFilter(props.todoListId, filter);
  };
  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setTitle(e.currentTarget.value);
  };
  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId);
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h3>{props.title}</h3>
        <button
          className={styles.btnDeleteTodoList}
          onClick={removeTodoListHandler}
          type="button"
        >
          x
        </button>
      </div>
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
