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
import { colors } from "@mui/material";
import theme from "./theme";
const blackPurpleTheme = createTheme({
  palette: {
    primary: {
      main: colors.deepPurple[200], // Purple
    },
    secondary: {
      main: colors.deepPurple[200],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
