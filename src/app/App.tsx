import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../common/components/header/Header";
import { ErrorSnackbar } from "../common/components/errorSnackbar/ErrorSnackbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { me } from "../features/auth/authSlice/authThunk";
import { useTypedSelector } from "../common/hooks/useTypedSelector";
import { isInitializedSelector, statusSelector } from ".";
import { LinearLoading } from "../common/components/linearLoading/LinearLoading";
import { CircularLoading } from "../common/components/сircularLoading/CircularLoading";
import { useAction } from "../common/hooks/useActions";
import { authActions, isLoggedInSelector, Login } from "../features/auth";
import { TodoLists } from "../features/todoLists";

export const App = () => {
  const status = useTypedSelector(statusSelector);
  const isLoggedIn = useTypedSelector(isLoggedInSelector);
  const isInitialized = useTypedSelector(isInitializedSelector);
  const { me } = useAction(authActions);

  useEffect(() => {
    me();
  }, []);

  return isInitialized ? (
    <>
      <ErrorSnackbar />
      {isLoggedIn && <Header />}

      {status === "loading" && <LinearLoading />}

      <section className={isLoggedIn ? "content" : "content--secondary"}>
        <Routes>
          <Route path="/" element={<Navigate to="/todo-lists-app" />} />
          <Route path="/todo-lists-app" element={<TodoLists />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </section>
    </>
  ) : (
    <CircularLoading />
  );
};
