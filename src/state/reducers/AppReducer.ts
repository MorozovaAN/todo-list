export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
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
    case "SET-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return state;
  }
};

// actions
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

export const setInitializedAC = (value: boolean) => {
  return {
    type: "SET-INITIALIZED",
    value,
  } as const;
};

// types
type setStatusACType = ReturnType<typeof setStatusAC>;
type setErrorACType = ReturnType<typeof setErrorAC>;
type setInitializedACType = ReturnType<typeof setInitializedAC>;

export type AppActionsType =
  | setStatusACType
  | setErrorACType
  | setInitializedACType;
