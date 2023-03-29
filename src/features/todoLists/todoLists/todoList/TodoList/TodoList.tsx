import React, { memo, useCallback, useEffect } from "react";
import { AddItemForm } from "../../../../../common/components/addItemForm/AddItemForm";
import { EditableSpan } from "../../../../../common/components/editableSpan/EditabelSpan";
import { createTasks, fetchTasks } from "../tasks/tasksSlice/tasksThunk";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import { RequestStatusType } from "../../../../../app/appSlice/appSlice";
import {
  deleteTodoList,
  updateTodoListTitle,
} from "../../../todoListsSlice/todoListsThunk";
import { useAction } from "../../../../../common/hooks/useActions";
import { todoListsActions, updateTodoListIdSelector } from "../../../index";
import { Task, tasksActions } from "../tasks";
import { tasksFilter } from "../../../../../common/utils/tasksFilter";
import "./TodoList.css";
import { TasksFilterButton } from "../../../../../common/components/tasksFilterButton/TasksFilterButton";
import { getInfoSubtitle } from "../../../../../common/utils/getInfoSubtitle";
import { useTypedSelector } from "../../../../../common/hooks/useTypedSelector";
import { TaskType } from "../../../../../api/types";
import { FilterValuesType } from "../../../types";

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export const TodoList = memo<TodoListPropsType>(
  ({ todoListId, title, tasks, filter, entityStatus }) => {
    const { deleteTodoList, updateTodoListTitle, changeFilter } =
      useAction(todoListsActions);
    const { fetchTasks, createTasks } = useAction(tasksActions);
    const updateTodoListId = useTypedSelector(updateTodoListIdSelector);
    const tasksForRender = tasksFilter(tasks, filter);

    useEffect(() => {
      fetchTasks(todoListId);
    }, []);

    const changeTodoListTitle = useCallback((newTitle: string) => {
      updateTodoListTitle({ todoListId, title: newTitle });
    }, []);

    const setTaskFilterHandler = useCallback((filter: FilterValuesType) => {
      changeFilter({ todoListId, filter });
    }, []);

    return (
      <div>
        <div className="todoList__title-wrapper">
          <EditableSpan
            callBack={changeTodoListTitle}
            title={title}
            classes="todoList__title"
            loading={updateTodoListId === todoListId}
          />

          <IconButton
            onClick={() => deleteTodoList(todoListId)}
            disabled={entityStatus === "loading"}
            className="todoList__btn--delete"
            aria-label="delete"
            size="small"
          >
            <Delete fontSize="medium" />
          </IconButton>
        </div>

        <AddItemForm
          callback={(title: string) => createTasks({ todoListId, title })}
          disabled={entityStatus === "loading"}
          placeholder="новая задача"
        />

        <ul className="todoList__tasks">
          {tasksForRender.length ? (
            tasksForRender.map((t) => (
              <Task key={t.id} todoListId={todoListId} task={t} />
            ))
          ) : (
            <p className="todoList__info-subtitle">{getInfoSubtitle(filter)}</p>
          )}
        </ul>

        <div className="todoList__buttons-wrapper">
          <TasksFilterButton
            label="все"
            variant={filter === "all"}
            callback={setTaskFilterHandler}
          />
          <TasksFilterButton
            label="активные"
            variant={filter === "active"}
            callback={setTaskFilterHandler}
          />
          <TasksFilterButton
            label="сделанные"
            variant={filter === "completed"}
            callback={setTaskFilterHandler}
          />
        </div>
      </div>
    );
  }
);
