// LandingPage.jsx
import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, black, #9c27b0)", // Set gradient background
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        Welcome to the Online Quiz Platform
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        Test your knowledge and improve your skills!
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/dashboard"
          sx={{ color: "white", backgroundColor: "#673ab7" }} // Adjust button color as needed
        >
          Dashboard
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/create"
          sx={{ color: "white", backgroundColor: "#673ab7" }} // Adjust button color as needed
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
