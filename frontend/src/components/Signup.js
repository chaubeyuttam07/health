import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { v4 as uuidv4 } from "uuid"; // Generates unique IDs

const Signup = ({ navigateToLogin }) => {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const newUser = {
      id: uuidv4(), // Generate unique ID
      name,
      email,
      password,
      wallet: 500, // Default wallet balance
    };

    // Simulating storing user data (you can replace this with an API call)
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    alert(`Account created successfully! Your ID: ${newUser.id}`);
    navigateToLogin();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Sign Up</h2>
      <div className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
