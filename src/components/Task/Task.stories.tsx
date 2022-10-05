import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Task } from "./Task";
import { ReduxStoreProviderDecorator } from "../../stories/decorator/ReduxStoreProviderDecorator";

export default {
  title: "TODOLIST/Task",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  argTypes: {},
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  task: { id: "1", title: "task is done", isDone: true },
  todoListId: "todoList1",
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  task: { id: "2", title: "task is not done", isDone: false },
  todoListId: "todoList2",
};
