// app.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import LandingPage from "./components/LandingPage"; // Import LandingPage
import Home from "./components/home";
import Create from "./components/create";
import Exam from "./components/Exam";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<LandingPage />} />}
          />{" "}
          {/* Protected */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Home />} />}
          />{" "}
          {/* Protected */}
          <Route
            path="/create"
            element={<ProtectedRoute element={<Create />} />}
          />{" "}
          {/* Protected */}
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
