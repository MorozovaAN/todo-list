import { AppRootStateType } from "../../../store/store";

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
