import { setError, setStatus } from "../../app/appSlice/appSlice";
import { AppDispatchType } from "../hooks/AppDispatch";

export const handelServerNetworkError = (
  dispatch: AppDispatchType,
  error: any //todo fix any
) => {
  dispatch(setStatus("failed"));
  dispatch(setError(error.message));
};

export const handelServerAppError = <T>(
  dispatch: AppDispatchType,
  data: any //todo fix any
) => {
  dispatch(setError(data.messages.length ? data.messages[0] : "Some error"));
  dispatch(setStatus("failed"));
};
