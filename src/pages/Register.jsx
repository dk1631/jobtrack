import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {getUserByEmail,registerUser,} from "../services/authService";

import "../styles/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check empty fields
    if (
      !cleanName ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Check whether email already exists
      const existingUsers =
        await getUserByEmail(cleanEmail);

      if (existingUsers.length > 0) {
        setError(
          "An account with this email already exists."
        );
        return;
      }

      // Create user object
      const newUser = {
        name: cleanName,
        email: cleanEmail,
        password: password,
      };

      // Send user to JSON Server
      await registerUser(newUser);

      // Registration successful
      navigate("/login");

    } catch (error) {
      console.error(error);

      setError(
        "Unable to create account. Please try again."
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
          Create your account
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* ERROR MESSAGE */}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
            />

          </div>

          {/* BUTTON */}

          <button
            className="auth-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;