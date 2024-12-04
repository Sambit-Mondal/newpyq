import React, { useState } from "react";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling error messages
  const [loading, setLoading] = useState(false); // For loading state

  const handleLogin = async (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error before new attempt

    try {
      // Make a request to your backend for authentication
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        window.location.href = "/"; // Redirect on successful login
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please check your connection and try again.");
      console.error("Login error", error); // You can keep this line for debugging
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
