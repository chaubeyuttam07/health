import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Booking from "./components/Booking";
import Wallet from "./components/Wallet";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AuthProvider from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
          <div className="container">
            <Link className="navbar-brand text-primary font-bold" to="/">
              HealthCare App
            </Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/booking">
                Booking
              </Link>
              <Link className="nav-link" to="/wallet">
                Wallet
              </Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/booking"
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path="/wallet"
              element={
                <PrivateRoute>
                  <Wallet />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
