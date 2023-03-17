import React, { useEffect } from "react";
import "./App.css";
import { ButtonAppBar } from "../common/components/ButtonAppBar/ButtonAppBar";
import { TodoLists } from "../features/todoLists/modules/TodoLists/TodoLists";
import LinearProgress from "@mui/material/LinearProgress";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "../features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { me } from "../features/auth/authSlice/authThunk";
import { useAppSelector } from "../common/hooks/AppSelector";
import { useAppDispatch } from "../common/hooks/AppDispatch";
import { getTodoLists } from "../features/todoLists/todoListsSlice/todoListsThunk";
import { isInitializedSelector, statusSelector } from "./appSlice/appSelectors";

export const App = () => {
  const status = useAppSelector(statusSelector);
  const isInitialized = useAppSelector(isInitializedSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getTodoLists());
  }, []);

  return isInitialized ? (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color="inherit" />}

      <Routes>
        <Route path="/" element={<TodoLists />} />
        <Route path="/login" element={<Login />} />

        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
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
