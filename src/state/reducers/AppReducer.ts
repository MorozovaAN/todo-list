export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
};

export type AppStateType = typeof initialState;

export const appReducer = (
  state: AppStateType = initialState,
  action: AppActionsType
): AppStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    status,
  } as const;
};

export const setErrorAC = (error: string | null) => {
  return {
    type: "APP/SET-ERROR",
    error,
  } as const;
};

type setStatusACType = ReturnType<typeof setStatusAC>;
type setErrorACType = ReturnType<typeof setErrorAC>;

export type AppActionsType = setStatusACType | setErrorACType;
