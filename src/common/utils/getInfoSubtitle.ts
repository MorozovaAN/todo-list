import { FilterValuesType } from "../../features/todoLists/todoListsSlice/todoListsSlice";

export const getInfoSubtitle = (filter: FilterValuesType): string => {
  switch (filter) {
    case "active":
      return "Нет активных задач";
    case "completed":
      return "Нет завершенных задач";
    default:
      return "Этот список задач пуст";
  }
};
