import { Dispatch } from "redux";
import { AppActionsType, setInitializedAC, setStatusAC } from "./AppReducer";
import { authAPI, LoginDataType, ResultStatus } from "../../api/todolist-api";
import {
  handelServerAppError,
  handelServerNetworkError,
} from "../../utils/errorUtils";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

// thunks
export const loginTC =
  (data: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === ResultStatus.OK) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setStatusAC("succeeded"));
        } else {
          handelServerAppError<{ userId: number }>(dispatch, res.data);
        }
      })
      .catch((error) => {
        handelServerNetworkError(dispatch, error);
      });
  };

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setStatusAC("loading"));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setStatusAC("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  } finally {
    dispatch(setInitializedAC(true));
  }
};

export const LogOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setStatusAC("loading"));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultStatus.OK) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setStatusAC("succeeded"));
    } else {
      handelServerAppError(dispatch, res.data);
    }
  } catch (error) {
    handelServerNetworkError(dispatch, error);
  }
};

// types
export type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType;
