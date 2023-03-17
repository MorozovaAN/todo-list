import { AppRootStateType } from "../../store/store";

export const statusSelector = (state: AppRootStateType) => state.app.status;
export const errorSelector = (state: AppRootStateType) => state.app.error;
export const isInitializedSelector = (state: AppRootStateType) =>
  state.app.isInitialized;
