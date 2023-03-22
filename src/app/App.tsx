import React, { useEffect } from "react";
import "./App.css";
import { ButtonAppBar } from "../common/components/buttonAppBar/ButtonAppBar";
import { TodoLists } from "../features/todoLists/todoLists/TodoLists";
import { ErrorSnackbar } from "../common/components/errorSnackbar/ErrorSnackbar";
import { Login } from "../features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { me } from "../features/auth/authSlice/authThunk";
import { useTypedSelector } from "../common/hooks/useTypedSelector";
import { appSelectors } from ".";
import { LinearLoading } from "../common/components/linearLoading/LinearLoading";
import { CircularLoading } from "../common/components/сircularLoading/CircularLoading";
import { useAction } from "../common/hooks/useActions";
import { authActions } from "../features/auth";

export const App = () => {
  const status = useTypedSelector(appSelectors.statusSelector);
  const isInitialized = useTypedSelector(appSelectors.isInitializedSelector);
  const { me } = useAction(authActions);

  useEffect(() => {
    me();
  }, []);

  return isInitialized ? (
    <div>
      <ErrorSnackbar />
      <ButtonAppBar />

      {status === "loading" && <LinearLoading />}

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
    <CircularLoading />
  );
};
