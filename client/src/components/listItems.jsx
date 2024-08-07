import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate } from "react-router-dom";
import theme from "../theme"; // Import your theme

export const mainListItems = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleCreateQuiz = () => {
    navigate("/create"); // Navigate to the Create Quiz page
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to login page
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleCreateQuiz}>
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          {" "}
          {/* Set icon color from theme */}
          <LayersIcon />
        </ListItemIcon>
        <ListItemText
          primary="Create Quiz"
          sx={{ color: theme.palette.primary.main }}
        />{" "}
        {/* Set text color from theme */}
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon sx={{ color: theme.palette.primary.main }}>
          {" "}
          {/* Set icon color from theme */}
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          sx={{ color: theme.palette.primary.main }}
        />{" "}
        {/* Set text color from theme */}
      </ListItemButton>
    </React.Fragment>
  );
};
