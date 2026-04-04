import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.page} className="page-shell">
      <div style={styles.container} className="panel">
        <div style={styles.header}>
          <p className="eyebrow">Join the studio</p>
          <h2 className="section-title" style={styles.title}>
            Create your account
          </h2>
          <p style={styles.copy}>
            Set up your profile and keep checkout, orders, and saved items in sync.
          </p>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
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
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

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
