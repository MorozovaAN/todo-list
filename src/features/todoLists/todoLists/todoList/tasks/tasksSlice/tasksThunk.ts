import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatchType } from "../../../../../../common/hooks/useTypedDispatch";
import {
  ResultStatus,
  TaskType,
  UpdateTaskModelType,
} from "../../../../../../api/types";
import {
  handelServerAppError,
  handelServerNetworkError,
} from "../../../../../../common/utils/errorUtils";
import axios, { AxiosError } from "axios";
import { AppRootStateType } from "../../../../../../store/store";
import { setError, setStatus } from "../../../../../../app";
import { tasksActions } from "../index";
import { UpdateTaskDomainModelType } from "../types";
import { tasksAPI } from "../../../../../../api/todolist-api";

export const fetchTasks = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatchType }
>("tasks/fetchTasks", async (todoListId, { dispatch }) => {
  try {
    const res = await tasksAPI.getTasks(todoListId);

    if (res.data.error === null) {
      dispatch(tasksActions.setTasks({ todoListId, tasks: res.data.items }));
      dispatch(setStatus("succeeded"));
    } else {
      dispatch(setError(res.data.error));
      dispatch(setStatus("failed"));
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});

export const deleteTasks = createAsyncThunk<
  void,
  { todoListId: string; taskId: string },
  { dispatch: AppDispatchType }
>("tasks/deleteTask", async ({ todoListId, taskId }, { dispatch }) => {
  dispatch(setStatus("loading"));

  try {
    await tasksAPI.deleteTask(todoListId, taskId);
    dispatch(tasksActions.removeTask({ todoListId, taskId }));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});

export const createTasks = createAsyncThunk<
  void,
  { todoListId: string; title: string },
  { dispatch: AppDispatchType }
>("tasks/createTask", async ({ todoListId, title }, { dispatch }) => {
  dispatch(setStatus("loading"));

  try {
    const res = await tasksAPI.createTask(todoListId, title);
    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(tasksActions.addTask({ todoListId, task: res.data.data.item }));
      dispatch(setStatus("succeeded"));
    } else {
      handelServerAppError<{ item: TaskType }>(dispatch, res.data);
    }
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response?.data.error : err.message;
      handelServerNetworkError(dispatch, error);
    }
  }
});

export const updateTasksTC = createAsyncThunk<
  void,
  {
    todoListId: string;
    taskId: string;
    domainModel: UpdateTaskDomainModelType;
  },
  { dispatch: AppDispatchType; state: AppRootStateType }
>(
  "tasks/updateTask",
  async ({ todoListId, taskId, domainModel }, { dispatch, getState }) => {
    dispatch(
      domainModel.title
        ? tasksActions.setUpdateTaskId(taskId)
        : setStatus("loading")
    );

    const task = getState().tasks.tasks[todoListId].find(
      (t) => t.id === taskId
    ) as TaskType;

    const model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    };

    try {
      const res = await tasksAPI.updateTask(todoListId, taskId, model);

      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(
          tasksActions.changeTask({
            todoListId,
            taskId,
            domainModel: res.data.data.item,
          })
        );
        dispatch(setStatus("succeeded"));
      } else {
        handelServerAppError<{ item: TaskType }>(dispatch, res.data);
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>;
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? err.response?.data.error
          : err.message;
        handelServerNetworkError(dispatch, error);
      }
    } finally {
      dispatch(tasksActions.setUpdateTaskId(""));
    }
  }
);
