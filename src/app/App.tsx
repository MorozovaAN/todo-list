import React, { useEffect } from "react";
import "./App.css";
import { ButtonAppBar } from "../components/common/ButtonAppBar/ButtonAppBar";
import { TodoLists } from "../pages/todoLists/modules/TodoLists/TodoLists";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "../state/store";
import { RequestStatusType } from "../state/reducers/AppReducer";
import { ErrorSnackbar } from "../components/common/ErrorSnackbar/ErrorSnackbar";
import { Login } from "../pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { meTC } from "../state/reducers/AuthReducer";
import CircularProgress from "@mui/material/CircularProgress";

export const App = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isInitialized = useAppSelector<boolean>(
    (state) => state.app.isInitialized
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(meTC());
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
