import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import "./LinearLoading.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { isLoggedInSelector } from "../../../features/auth";

export const LinearLoading = () => {
  const isLoggedIn = useTypedSelector(isLoggedInSelector);

  return (
    <div
      className={isLoggedIn ? "linear-loading" : "linear-loading--secondary"}
    >
      <LinearProgress />
    </div>
  );
};
