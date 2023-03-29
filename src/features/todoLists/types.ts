import { RequestStatusType } from "../../app/appSlice/appSlice";
import { TodoListType } from "../../api/types";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type TodoListsType = TodoListDomainType[];
