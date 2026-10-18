import { useState } from "react";
import {Link, useNavigate,} from "react-router-dom";
import { loginUser } from "../services/authService";
import { saveUser } from "../utils/storage";

import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      // Search user using email
      const users = await loginUser(cleanEmail);

      console.log("Users returned:", users);

      // No account with this email
      if (users.length === 0) {
        setError("Invalid email or password.");
        return;
      }

      const user = users[0];

      console.log("Found user:", user);
      console.log("Entered password:", password);
      console.log("Stored password:", user.password);

      // Check password
      if (user.password !== password) {
        setError("Invalid email or password.");
        return;
      }

      // Don't store password in LocalStorage
      const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      console.log("Saving user:", loggedInUser);

      saveUser(loggedInUser);

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h1 className="auth-logo">
          JobTrack
        </h1>

        <p className="auth-subtitle">
          Login to your account
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;