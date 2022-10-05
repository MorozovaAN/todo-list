import React from "react";
import { Provider } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "../../state/reducer/TasksReducer";
import { todoListsReducer } from "../../state/reducer/TodoListsReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});

const initialGlobalState = {
  todoLists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "JS", isDone: true },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: false },
    ],
  },
};

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => (
  <Provider store={storyBookStore}>{storyFn()}</Provider>
);
