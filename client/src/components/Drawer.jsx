import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import theme from "../theme";

export default function PersistentDrawerLeft() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleBack = () => {
    navigate("/home");
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
      style={{ color: theme.palette.background.paper }}
    >
      <List>
        {" "}
        <ListItem button key="Back to Home" onClick={handleBack}>
          {" "}
          <ListItemIcon>
            {" "}
            <HomeIcon />{" "}
          </ListItemIcon>{" "}
          <ListItemText primary="Back to Home" />{" "}
        </ListItem>{" "}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, color: theme.palette.background.paper }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Quiz Maker
          </Typography>

          <Box sx={{ flexGrow: 1, color: theme.palette.background.paper }} />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        style={{ color: theme.palette.background.paper }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
