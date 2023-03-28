import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useActions";
import { authActions, isLoggedInSelector } from "../../../features/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.css";

export const Header = () => {
  const isLoggedIn = useTypedSelector(isLoggedInSelector);
  const { logout } = useAction(authActions);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar classes={{ root: "header__toolbar" }}>
          {isLoggedIn && (
            <Button
              variant="text"
              color="inherit"
              classes={{ root: "header__logout-btn" }}
              onClick={() => logout()}
            >
              выйти <LogoutIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
