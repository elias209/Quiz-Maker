import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionIcon from "@mui/icons-material/Description"; // Import an icon for the Exam page
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

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const handleExam = () => {
    navigate("/exam"); // Navigate to the Exam page
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
      style={{ color: theme.palette.primary.main }} // Set the text color for the drawer
    >
      <List>
        <ListItem button key="Back to Home" onClick={handleBack}>
          <ListItemIcon>
            <HomeIcon style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItem>
        <ListItem button key="Refresh" onClick={handleRefresh}>
          <ListItemIcon>
            <RefreshIcon style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText primary="Refresh" />
        </ListItem>
        <ListItem button key="Exam" onClick={handleExam}>
          <ListItemIcon>
            <DescriptionIcon style={{ color: theme.palette.primary.main }} />
          </ListItemIcon>
          <ListItemText primary="Exam" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        color: theme.palette.background.paper,
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: theme.palette.background.paper }}
      >
        <Toolbar style={{ backgroundColor: theme.palette.background.paper }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon style={{ color: theme.palette.primary.main }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: theme.palette.primary.main }}
          >
            Quiz Maker
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </Box>
  );
}
