import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResultStatus, todolistAPI } from "../../../api/todolist-api";
import { setStatus } from "../../../app/appSlice/appSlice";
import { AppDispatchType } from "../../../common/hooks/useTypedDispatch";
import {
  createTodoList,
  deleteTodoList,
  setTodoLists,
  updateTodoListEntityStatus,
  updateTodoListTitle,
} from "./todoListsSlice";
import {
  handelServerAppError,
  handelServerNetworkError,
} from "../../../common/utils/errorUtils";

export const getTodoLists = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatchType }
>("todoLists/getTodoLists", async function (_, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await todolistAPI.getTodoLists();

    if (res.data) {
      dispatch(setTodoLists(res.data));
      dispatch(setStatus("succeeded"));
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});

export const createTodoListTC = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatchType }
>("todoLists/getTodoLists", async function (title, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await todolistAPI.createTodoList(title);

    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(createTodoList(res.data.data.item));
      dispatch(setStatus("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});

export const deleteTodoListTC = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatchType }
>("todoLists/getTodoLists", async function (todoListId, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await todolistAPI.deleteTodoList(todoListId);

    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(deleteTodoList({ todoListId: todoListId }));
      dispatch(setStatus("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
    dispatch(
      updateTodoListEntityStatus({
        todoListId: todoListId,
        entityStatus: "failed",
      })
    );
  }
});

export const updateTodoListTitleTC = createAsyncThunk<
  void,
  { todoListId: string; title: string },
  { dispatch: AppDispatchType }
>(
  "todoLists/getTodoLists",
  async function ({ todoListId, title }, { dispatch }) {
    dispatch(setStatus("loading"));

    try {
      const res = await todolistAPI.changeTodoListTitle(todoListId, title);

      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(updateTodoListTitle({ todoListId, title }));
        dispatch(setStatus("succeeded"));
      } else {
        handelServerAppError(dispatch, res.data);
      }
    } catch (error) {
      handelServerNetworkError(dispatch, error);
    }
  }
);
