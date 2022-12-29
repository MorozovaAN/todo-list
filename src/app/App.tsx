import React from "react";
import "./App.css";
import { ButtonAppBar } from "../components/common/ButtonAppBar/ButtonAppBar";
import { TodoLists } from "../pages/todoLists/modules/TodoLists/TodoLists";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "../state/store";
import { RequestStatusType } from "../state/reducers/AppReducer";
import { ErrorSnackbar } from "../components/common/ErrorSnackbar/ErrorSnackbar";
import { Login } from "../pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";

export const App = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);

  return (
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
  );
};
