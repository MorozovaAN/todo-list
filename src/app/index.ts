import * as appSelectors from "./appSlice/appSelectors";
import { appSlice } from "./appSlice/appSlice";

const appReducer = appSlice.reducer;
const { setStatus, setError, setInitialized } = appSlice.actions;
const { errorSelector, isInitializedSelector, statusSelector } = appSelectors;

export {
  appReducer,
  setStatus,
  setError,
  setInitialized,
  errorSelector,
  isInitializedSelector,
  statusSelector,
};
