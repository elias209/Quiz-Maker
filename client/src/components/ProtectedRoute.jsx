// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the token exists

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
