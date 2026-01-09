import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
const styles = {
  container: {
    maxWidth: "420px",
    margin: "80px auto",
    padding: "30px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "20px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    backgroundColor: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
