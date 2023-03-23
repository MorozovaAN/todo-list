import * as authSelectors from "./authSlice/authSelectors";
import * as authAsyncActions from "./authSlice/authThunk";
import { authSlice } from "./authSlice/authSlice";

const authReducer = authSlice.reducer;
const authActions = {
  ...authAsyncActions,
  ...authSlice.actions,
};

export { authSelectors, authActions, authReducer };
