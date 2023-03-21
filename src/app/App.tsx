import React, { useEffect } from "react";
import "./App.css";
import { ButtonAppBar } from "../common/components/ButtonAppBar/ButtonAppBar";
import { TodoLists } from "../features/todoLists/TodoLists/TodoLists";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "../features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { me } from "../features/auth/authSlice/authThunk";
import { useTypedSelector } from "../common/hooks/useTypedSelector";
import { useTypedDispatch } from "../common/hooks/useTypedDispatch";
import { getTodoLists } from "../features/todoLists/todoListsSlice/todoListsThunk";
import { isInitializedSelector, statusSelector } from "./appSlice/appSelectors";

export const App = () => {
  const status = useTypedSelector(statusSelector);
  const isInitialized = useTypedSelector(isInitializedSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getTodoLists());
  }, []);

  return isInitialized ? (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />
      {status === "loading" && (
        <div className="linearProgress">
          <LinearProgress />
        </div>
      )}
      <section className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/todo-lists-app" />} />
          <Route path="/todo-lists-app" element={<TodoLists />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </section>
    </div>
  ) : (
    <div
      style={{
        position: "fixed",
        top: "30%",
        textAlign: "center",
        width: "100%",
      }}
    >
      <CircularProgress />
    </div>
  );
};
