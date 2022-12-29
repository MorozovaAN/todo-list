import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { LogOutTC } from "../../../state/reducers/AuthReducer";

export const ButtonAppBar = () => {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(LogOutTC());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logOut}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
