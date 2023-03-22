import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useActions";
import { authActions, authSelectors } from "../../../features/auth";

export const Header = () => {
  const isLoggedIn = useTypedSelector(authSelectors.isLoggedInSelector);
  const { logout } = useAction(authActions);

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
            <Button color="inherit" onClick={() => logout()}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
