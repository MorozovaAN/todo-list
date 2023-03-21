import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";

export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;
