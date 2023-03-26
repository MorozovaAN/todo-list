import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "../../../../common/components/addItemForm/AddItemForm";
import { EditableSpan } from "../../../../common/components/editableSpan/EditabelSpan";
import { createTasksTC, fetchTasks } from "./tasks/tasksSlice/tasksThunk";
import { TaskType } from "../../../../api/todolist-api";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { RequestStatusType } from "../../../../app/appSlice/appSlice";
import { FilterValuesType } from "../../todoListsSlice/todoListsSlice";
import {
  deleteTodoListTC,
  updateTodoListTitleTC,
} from "../../todoListsSlice/todoListsThunk";
import { useAction } from "../../../../common/hooks/useActions";
import { todoListsActions } from "../../index";
import { Task, TasksActions } from "./tasks";
import { tasksFilter } from "../../../../common/utils/tasksFilter";
import "./TodoList.css";
import { TasksFilterButton } from "../../../../common/components/tasksFilterButton/TasksFilterButton";
import { getInfoSubtitler } from "../../../../common/utils/getInfoSubtitler";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const TodoList = memo<TodoListPropsType>(
  ({ todoListId, title, tasks, filter, entityStatus }) => {
    const { deleteTodoListTC, updateTodoListTitleTC, updateFilter } =
      useAction(todoListsActions);
    const { fetchTasks, createTasksTC } = useAction(TasksActions);
    const tasksForRender = tasksFilter(tasks, filter);

    useEffect(() => {
      fetchTasks(todoListId);
    }, []);

    const changeTodoListTitle = useCallback((newTitle: string) => {
      updateTodoListTitleTC({ todoListId, title: newTitle });
    }, []);

    const setTaskFilterHandler = useCallback((filter: FilterValuesType) => {
      updateFilter({ todoListId, filter });
    }, []);

    return (
      <div>
        <div className="todoList__title-wrapper">
          <EditableSpan callBack={changeTodoListTitle} title={title} />

          <IconButton
            onClick={() => deleteTodoListTC(todoListId)}
            disabled={entityStatus === "loading"}
            className="todoList__btn--delete"
            aria-label="delete"
            size="small"
          >
            <Delete fontSize="medium" />
          </IconButton>
        </div>

        <AddItemForm
          callback={(title: string) => createTasksTC({ todoListId, title })}
          disabled={entityStatus === "loading"}
          placeholder="write your task"
        />

        <ul className="todoList__tasks">
          {tasksForRender.length ? (
            tasksForRender.map((t) => (
              <Task key={t.id} todoListId={todoListId} task={t} />
            ))
          ) : (
            <p className="todoList__info-subtitle">
              {getInfoSubtitler(filter)}
            </p>
          )}
        </ul>

        <div className="todoList__buttons-wrapper">
          <TasksFilterButton
            label="all"
            variant={filter === "all"}
            callback={setTaskFilterHandler}
          />
          <TasksFilterButton
            label="active"
            variant={filter === "active"}
            callback={setTaskFilterHandler}
          />
          <TasksFilterButton
            label="completed"
            variant={filter === "completed"}
            callback={setTaskFilterHandler}
          />
        </div>
      </div>
    );
  }
);