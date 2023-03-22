import React, { useEffect } from "react";
import "./App.css";
import { ButtonAppBar } from "../common/components/buttonAppBar/ButtonAppBar";
import { TodoLists } from "../features/todoLists/todoLists/TodoLists";
import { ErrorSnackbar } from "../common/components/errorSnackbar/ErrorSnackbar";
import { Login } from "../features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { me } from "../features/auth/authSlice/authThunk";
import { useTypedSelector } from "../common/hooks/useTypedSelector";
import { useTypedDispatch } from "../common/hooks/useTypedDispatch";
import { getTodoLists } from "../features/todoLists/todoListsSlice/todoListsThunk";
import { appSelectors } from ".";
import { LinearLoading } from "../common/components/linearLoading/LinearLoading";
import { CircularLoading } from "../common/components/сircularLoading/CircularLoading";

export const App = () => {
  const status = useTypedSelector(appSelectors.statusSelector);
  const isInitialized = useTypedSelector(appSelectors.isInitializedSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(me());
    dispatch(getTodoLists());
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
