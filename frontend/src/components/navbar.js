import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const PURPLE = "#8b5cf6";

function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Username derived ONLY from user prop
  const username = user?.email
    ? user.email.split("@")[0].split(".")[0]
    : "";

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      {/* LEFT: Logo */}
      <Link to="/" style={styles.logoContainer}>
        <img src={logo} alt="App Logo" style={styles.logoImg} />
      </Link>

      {/* HAMBURGER ICON (mobile only) */}
      {isMobile && (
        <div
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      )}

      {/* LINKS */}
      <div
        style={{
          ...styles.links,
          ...(isMobile
            ? menuOpen
              ? styles.mobileMenu
              : { display: "none" }
            : {}),
        }}
      >
        <NavLink to="/" label="HOME" setMenuOpen={setMenuOpen} />

        {!user && (
          <>
            <NavLink to="/login" label="LOGIN" setMenuOpen={setMenuOpen} />
            <NavLink to="/register" label="REGISTER" setMenuOpen={setMenuOpen} />
          </>
        )}

        <NavLink to="/cart" label="CART" setMenuOpen={setMenuOpen} />
        {user && (
  <NavLink
    to="/orders"
    label="ORDERS"
    setMenuOpen={setMenuOpen}
  />
)}


        {user && (
          <>
            <span style={styles.greeting}>
              Hi, {username.charAt(0).toUpperCase() + username.slice(1)} 👋
            </span>

            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

/* 🔁 Reusable nav link component */
function NavLink({ to, label, setMenuOpen }) {
  return (
    <Link
    
      to={to}
      style={styles.link}
      onClick={() => setMenuOpen(false)}
      onMouseEnter={(e) => {
        e.target.style.color = PURPLE;
        e.target.style.transform = "scale(1.1)";
        e.target.style.borderBottom = `2px solid ${PURPLE}`;
        e.target.style.paddingBottom = "4px";
      }}
      onMouseLeave={(e) => {
        e.target.style.color = "#fff";
        e.target.style.transform = "scale(1)";
        e.target.style.borderBottom = "none";
        e.target.style.paddingBottom = "0";
      }}
      
    >

      {label}
    </Link>
  );
}

export default Navbar;

const styles = {
  nav: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#111",
  color: "#fff",

  position: "sticky",       // 👈 better than relative
  top: 0,
  zIndex: 3000,
},

  logoContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },

  logoImg: {
    height: "40px",
    width: "40px",
    objectFit: "contain",
  },

  hamburger: {
    fontSize: "26px",
    cursor: "pointer",
    color: "#fff",
  },

  links: {
    display: "flex",
    gap: "20px",
  },

  link: {
  color: "#fff",                      // 👈 initial white
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
  position: "relative",
  transition: "all 0.25s ease",       // 👈 smooth color + scale
},


  /* Mobile dropdown menu */
  mobileMenu: {
  position: "fixed",        // 👈 KEY CHANGE
  top: "64px",              // 👈 height of navbar
  left: 0,
  width: "100%",
  backgroundColor: "#111",

  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "25px",

  zIndex: 2000,             // 👈 ensures it’s above content
},
greeting: {
  color: "#fff",
  fontWeight: "600",
  marginRight: "15px",
},


};