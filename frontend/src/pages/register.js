import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Create user document in Firestore
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
    <div style={styles.container}>
      <h2>Create Account</h2>

      <form onSubmit={handleRegister} style={styles.form}>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
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
