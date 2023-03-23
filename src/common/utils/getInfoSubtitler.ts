import { FilterValuesType } from "../../features/todoLists/todoListsSlice/todoListsSlice";

export const getInfoSubtitler = (filter: FilterValuesType): string => {
  switch (filter) {
    case "active":
      return "No active tasks";
    case "completed":
      return "No completed tasks";
    default:
      return "Todo list is empty";
  }
};
