import React from "react";
import "./App.css";
import { ButtonAppBar } from "../components/common/ButtonAppBar/ButtonAppBar";
import { TodoLists } from "../pages/todoLists/modules/TodoLists/TodoLists";

export const App = () => {
  return (
    <div className="App">
      <ButtonAppBar />
      <TodoLists />
    </div>
  );
};
