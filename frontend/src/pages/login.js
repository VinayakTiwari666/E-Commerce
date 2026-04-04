import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.page} className="page-shell">
      <div style={styles.container} className="panel">
        <div style={styles.header}>
          <p className="eyebrow">Welcome back</p>
          <h2 className="section-title" style={styles.title}>
            Sign in to your account
          </h2>
          <p style={styles.copy}>
            Access your orders, your cart, and the current catalog in one place.
          </p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.field}>
            <span style={styles.label}>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p style={styles.footerText}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  page: {
    padding: "52px 16px 80px",
  },
  container: {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "34px",
    borderRadius: "16px",
  },
  header: {
    textAlign: "left",
    marginBottom: "22px",
  },
  title: {
    margin: 0,
    fontSize: "2.2rem",
  },
  copy: {
    margin: "12px 0 0",
    color: "var(--muted)",
    lineHeight: 1.6,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontWeight: 700,
    fontSize: "0.92rem",
  },
  error: {
    color: "#ef4444",
    fontSize: "14px",
    margin: 0,
  },
  footerText: {
    marginTop: "20px",
    color: "var(--muted)",
    textAlign: "center",
  },
};
