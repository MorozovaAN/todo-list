import React from "react";
import "./App.css";
import { ButtonAppBar } from "../components/common/ButtonAppBar/ButtonAppBar";
import { TodoLists } from "../pages/todoLists/modules/TodoLists/TodoLists";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "../state/store";
import { RequestStatusType } from "../state/reducers/AppReducer";
import { ErrorSnackbar } from "../components/common/ErrorSnackbar/ErrorSnackbar";

export const App = () => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);

  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color="inherit" />}

      <TodoLists />
    </div>
  );
};
