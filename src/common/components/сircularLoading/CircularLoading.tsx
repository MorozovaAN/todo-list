import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./CircularLoading.css";

export const CircularLoading = () => {
  return (
    <div className="circularLoading">
      <CircularProgress />
    </div>
  );
};
