import { useTypedDispatch } from "./useTypedDispatch";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { ActionsMap } from "@storybook/addon-actions";

export function useAction<T extends ActionsMap>(actions: T) {
  const dispatch = useTypedDispatch();

  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, []);
}
