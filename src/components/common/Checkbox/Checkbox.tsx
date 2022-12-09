import React, { ChangeEvent, FC } from "react";
import { Checkbox } from "@mui/material";

type CustomCheckboxType = {
  callBack: (checked: boolean) => void;
  checked: boolean;
};

export const CustomCheckbox: FC<CustomCheckboxType> = ({
  callBack,
  checked,
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked);
  };
  return <Checkbox onChange={onChangeHandler} checked={checked} />;
};
