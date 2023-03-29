import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../../api/todolist-api";
import {
  handelServerAppError,
  handelServerNetworkError,
} from "../../../common/utils/errorUtils";
import { AppDispatchType } from "../../../common/hooks/useTypedDispatch";
import { setInitialized, setStatus } from "../../../app";
import { authActions } from "../index";
import { LoginDataType, ResultStatus } from "../../../api/types";

export const me = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatchType }
>("auth/me", async (_, { dispatch }) => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(authActions.setIsLoggedIn(true));
      dispatch(setStatus("succeeded"));
    }
  } finally {
    dispatch(setInitialized(true));
  }
});

export const login = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginDataType,
  { dispatch: AppDispatchType }
>("auth/login", async (data: LoginDataType, { dispatch }) => {
  dispatch(setStatus("loading"));

  try {
    const res = await authAPI.login(data);

    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(setStatus("succeeded"));
      return { isLoggedIn: true };
    } else {
      handelServerAppError(dispatch, res.data);
      return { isLoggedIn: false };
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
    return { isLoggedIn: false };
  }
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatchType }
>("auth/logout", async function (data, { dispatch }) {
  dispatch(setStatus("loading"));

  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(authActions.setIsLoggedIn(false));
      dispatch(setStatus("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
});
