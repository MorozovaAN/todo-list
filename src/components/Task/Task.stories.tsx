import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "../../stories/decorator/ReduxStoreProviderDecorator";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { TaskType } from "../../state/reducer/TasksReducer";

export default {
  title: "TODOLIST/Task",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  argTypes: {},
} as ComponentMeta<typeof Task>;

const TaskWithRedux = () => {
  const task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks["todolistId1"][0]
  );
  return <Task task={task} todoListId={"todolistId1"} />;
};

const Template: ComponentStory<typeof TaskWithRedux> = () => <TaskWithRedux />;

export const TaskWithReduxStory = Template.bind({});
TaskWithReduxStory.args = {};
