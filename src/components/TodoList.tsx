import React, { FC, ChangeEvent } from "react";
import styles from "./TodoList.module.css";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm/AddItemForm";
import { EditableSpan } from "./EditableSpan/EditabelSpan";

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
  editTask: (todoListId: string, taskId: string, newTitle: string) => void;
  editTodoListTitle: (todoListId: string, title: string) => void;
};

export const TodoList: FC<TodoListType> = (props) => {
  const editTaskHandler = (taskId: string, newTitle: string) => {
    props.editTask(props.todoListId, taskId, newTitle);
  };

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

          <EditableSpan
            title={task.title}
            callBack={(newTitle) => editTaskHandler(task.id, newTitle)}
          />

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

  const changeFilterHandler = (filter: FilterValuesType) => {
    return () => props.changeFilter(props.todoListId, filter);
  };

  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId);
  };
  const addTaskHandler = (title: string) => {
    props.addTask(props.todoListId, title);
  };
  const editTodoListTitleHandler = (newTitle: string) => {
    props.editTodoListTitle(props.todoListId, newTitle);
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <EditableSpan callBack={editTodoListTitleHandler} title={props.title} />
        <button
          className={styles.btnDeleteTodoList}
          onClick={removeTodoListHandler}
          type="button"
        >
          x
        </button>
      </div>

      <AddItemForm callBack={addTaskHandler} />

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
