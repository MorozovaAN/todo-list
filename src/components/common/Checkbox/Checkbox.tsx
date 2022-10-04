import React, { ChangeEvent, FC } from "react";
import { Checkbox } from "@mui/material";

type CustomCheckboxType = {
  callBack: (isDone: boolean) => void;
  isDone: boolean;
};

export const CustomCheckbox: FC<CustomCheckboxType> = ({
  callBack,
  isDone,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked);
  };
  return <Checkbox onChange={onChangeHandler} checked={isDone} />;
};
