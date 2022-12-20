import { setErrorAC, setStatusAC } from "../state/reducers/AppReducer";
import { ThunkAppDispatchType } from "../state/store";
import { ResponseType } from "../api/todolist-api";

export const handelServerNetworkError = (
  dispatch: ThunkAppDispatchType,
  e: string
) => {
  dispatch(setStatusAC("failed"));
  dispatch(setErrorAC(e));
};

export const handelServerAppError = <T>(
  dispatch: ThunkAppDispatchType,
  data: ResponseType<T>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC("Some error"));
  }
  dispatch(setStatusAC("failed"));
};
