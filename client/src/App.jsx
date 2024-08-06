// app.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import Create from "./components/create";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const blackPurpleTheme = createTheme({
  palette: {
    primary: {
      main: "#673ab7", // Purple
    },
    secondary: {
      main: "#000000", // Black
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={blackPurpleTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/create"
            element={<ProtectedRoute element={<Create />} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
