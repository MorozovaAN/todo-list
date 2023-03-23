import * as authSelectors from "./authSlice/authSelectors";
import * as authAsyncActions from "./authSlice/authThunk";
import { authSlice } from "./authSlice/authSlice";
import { Login } from "./Login";

const { isLoggedInSelector } = authSelectors;
const authReducer = authSlice.reducer;
const authActions = {
  ...authAsyncActions,
  ...authSlice.actions,
};

export { isLoggedInSelector, authActions, authReducer, Login };
