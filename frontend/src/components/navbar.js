import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar({ user, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);

  const username = user?.email
    ? user.email.split("@")[0].split(".")[0]
    : "";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
      if (window.innerWidth > 920) {
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
    <header
      style={{
        ...styles.wrap,
        padding: isMobile ? "12px 12px 0" : styles.wrap.padding,
      }}
    >
      <nav
        style={{
          ...styles.nav,
          padding: isMobile ? "14px 16px" : styles.nav.padding,
          borderRadius: isMobile ? "18px" : styles.nav.borderRadius,
          alignItems: isMobile ? "flex-start" : styles.nav.alignItems,
        }}
        className="panel navbar"
      >
        <Link
          to="/"
          style={{
            ...styles.brandBlock,
            gap: isMobile ? "12px" : styles.brandBlock.gap,
            maxWidth: isMobile ? "calc(100% - 64px)" : "none",
          }}
          className="brand-block"
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              ...styles.logoShell,
              width: isMobile ? "54px" : styles.logoShell.width,
              height: isMobile ? "54px" : styles.logoShell.height,
              borderRadius: isMobile ? "16px" : styles.logoShell.borderRadius,
            }}
          >
            <div style={styles.logoGlow} />
            <img src={logo} alt="SarvaMart logo" style={styles.logoImg} />
          </div>

          <div style={styles.brandTextBlock}>
            <span style={styles.brandOverline}>Sarvam Mart</span>
            <span
              style={{
                ...styles.brandName,
                fontSize: isMobile ? "1.35rem" : styles.brandName.fontSize,
              }}
              className="section-title"
            >
              SarvaMart
            </span>
            {!isMobile && (
              <span style={styles.brandTagline}>
                Daily shopping, sharper interface
              </span>
            )}
          </div>
        </Link>

        {isMobile && (
          <button
            type="button"
            style={styles.mobileToggle}
            className={`btn btn-secondary mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        )}

        <div
          style={{
            ...styles.menu,
            ...(isMobile ? { flexDirection: "column", alignItems: "stretch" } : {}),
            ...(isMobile ? (menuOpen ? styles.mobileMenu : styles.mobileMenuHidden) : {}),
          }}
        >
          <div style={styles.navPill} className="nav-pill navbar-links">
            <NavLink to="/" label="Home" setMenuOpen={setMenuOpen} />
            <NavLink to="/cart" label="Cart" setMenuOpen={setMenuOpen} />
            {user && (
              <NavLink to="/orders" label="Orders" setMenuOpen={setMenuOpen} />
            )}
            {!user && (
              <>
                <NavLink to="/login" label="Login" setMenuOpen={setMenuOpen} />
                <NavLink to="/register" label="Register" setMenuOpen={setMenuOpen} />
              </>
            )}
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={onToggleTheme}
              style={styles.themeBtn}
              className="btn btn-secondary navbar-button"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>

            {user && (
              <span style={styles.greeting}>Hi, {formatName(username)}</span>
            )}

            {user && (
              <button
                type="button"
                className="btn btn-primary navbar-button"
                style={styles.logoutBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, label, setMenuOpen }) {
  return (
    <Link
      to={to}
      style={styles.link}
      className="nav-link navbar-link"
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </Link>
  );
}

function formatName(name) {
  if (!name) {
    return "";
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default Navbar;

const styles = {
  wrap: {
    position: "sticky",
    top: 0,
    zIndex: 12,
    padding: "18px 16px 0",
  },
  nav: {
    maxWidth: "1240px",
    margin: "0 auto",
    borderRadius: "20px",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    backdropFilter: "blur(14px)",
  },
  brandBlock: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    minWidth: 0,
    textDecoration: "none",
    color: "inherit",
  },
  logoShell: {
    position: "relative",
    width: "62px",
    height: "62px",
    borderRadius: "18px",
    background: "linear-gradient(145deg, var(--primary) 0%, var(--primary-hover) 100%)",
    display: "grid",
    placeItems: "center",
    boxShadow: "var(--shadow-soft)",
    overflow: "hidden",
    flexShrink: 0,
  },
  logoGlow: {
    position: "absolute",
    inset: "-30%",
    background: "radial-gradient(circle, rgba(255,255,255,0.28), transparent 55%)",
  },
  logoImg: {
    position: "relative",
    width: "32px",
    height: "32px",
    objectFit: "contain",
  },
  brandTextBlock: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  brandOverline: {
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    fontWeight: 800,
    color: "rgba(255,255,255,0.78)",
  },
  brandName: {
    fontSize: "1.65rem",
    lineHeight: 1,
    fontWeight: 700,
    marginTop: "2px",
  },
  brandTagline: {
    marginTop: "4px",
    color: "rgba(255,255,255,0.84)",
    fontSize: "0.84rem",
    whiteSpace: "nowrap",
  },
  mobileToggle: {
    minWidth: "52px",
    minHeight: "52px",
    padding: "0",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flex: 1,
  },
  navPill: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    fontWeight: 700,
    fontSize: "0.95rem",
    padding: "10px 16px",
    borderRadius: "999px",
    transition: "background 0.18s ease, color 0.18s ease",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    flexWrap: "wrap",
  },
  themeBtn: {
    minWidth: "118px",
    borderRadius: "12px",
  },
  greeting: {
    padding: "10px 14px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.92)",
    fontWeight: 700,
  },
  logoutBtn: {
    minWidth: "100px",
  },
  mobileMenu: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 0,
    right: 0,
    margin: "0 16px",
    padding: "18px",
    borderRadius: "20px",
    background: "linear-gradient(to right, #6d28d9, #7c3aed)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "var(--shadow)",
    display: "grid",
    gap: "16px",
  },
  mobileMenuHidden: {
    display: "none",
  },
};
