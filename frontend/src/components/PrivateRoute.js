import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
