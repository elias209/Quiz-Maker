import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate } from "react-router-dom";

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
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Create Quiz" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};
