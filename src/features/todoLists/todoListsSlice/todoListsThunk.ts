import { createAsyncThunk } from "@reduxjs/toolkit";
import { todolistAPI } from "../../../api/todolist-api";
import { AppDispatchType } from "../../../common/hooks/useTypedDispatch";
import {
  handelServerAppError,
  handelServerNetworkError,
} from "../../../common/utils/errorUtils";
import { setStatus } from "../../../app";
import { todoListsActions } from "../index";
import { ResultStatus } from "../../../api/types";

export const fetchTodoLists = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatchType }
>("todoLists/fetchTodoLists", async function (_, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await todolistAPI.getTodoLists();

    if (res.data) {
      dispatch(todoListsActions.setTodoLists(res.data));
      dispatch(setStatus("succeeded"));
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});

export const createTodoList = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatchType }
>("todoLists/getTodoLists", async function (title, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await todolistAPI.createTodoList(title);

    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(todoListsActions.addTodoList(res.data.data.item));
      dispatch(setStatus("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});

export const deleteTodoList = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatchType }
>("todoLists/getTodoLists", async function (todoListId, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await todolistAPI.deleteTodoList(todoListId);

    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(todoListsActions.removeTodoList({ todoListId: todoListId }));
      dispatch(setStatus("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
    dispatch(
      todoListsActions.changeTodoListEntityStatus({
        todoListId: todoListId,
        entityStatus: "failed",
      })
    );
  }
});

export const updateTodoListTitle = createAsyncThunk<
  void,
  { todoListId: string; title: string },
  { dispatch: AppDispatchType }
>(
  "todoLists/getTodoLists",
  async function ({ todoListId, title }, { dispatch }) {
    dispatch(todoListsActions.setUpdateTodoListId(todoListId));

    try {
      const res = await todolistAPI.changeTodoListTitle(todoListId, title);

      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(todoListsActions.changeTodoListTitle({ todoListId, title }));
      } else {
        handelServerAppError(dispatch, res.data);
      }
    } catch (error) {
      handelServerNetworkError(dispatch, error);
    } finally {
      dispatch(todoListsActions.setUpdateTodoListId(""));
    }
  }
);
