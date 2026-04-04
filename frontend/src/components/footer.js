import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.wrap} className="app-footer">
      <div style={styles.inner} className="panel">
        <div style={styles.brandBlock}>
          <p style={styles.kicker}>SarvaMart</p>
          <h2 style={styles.title} className="section-title">
            Modern shopping, built for every screen.
          </h2>
          <p style={styles.copy}>
            Browse products, manage your cart, and track orders with a cleaner,
            more polished storefront experience.
          </p>
        </div>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/cart" style={styles.link}>
            Cart
          </Link>
          <Link to="/orders" style={styles.link}>
            Orders
          </Link>
          <Link to="/login" style={styles.link}>
            Account
          </Link>
        </div>

        <div style={styles.meta}>
          <span>Secure checkout flow</span>
          <span>Responsive storefront</span>
          <span>Light and dark theme</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

const styles = {
  wrap: {
    position: "relative",
    zIndex: 1,
    padding: "0 16px 24px",
  },
  inner: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "28px",
    borderRadius: "24px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.6fr) repeat(2, minmax(180px, 1fr))",
    gap: "24px",
    alignItems: "start",
    background: "linear-gradient(to right, #6d28d9, #7c3aed)",
  },
  brandBlock: {
    display: "grid",
    gap: "10px",
  },
  kicker: {
    margin: 0,
    color: "var(--primary)",
    fontSize: "0.78rem",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: "clamp(1.4rem, 2vw, 2rem)",
  },
  copy: {
    margin: 0,
    color: "rgba(255,255,255,0.84)",
    lineHeight: 1.7,
    maxWidth: "520px",
  },
  links: {
    display: "grid",
    alignContent: "start",
    gap: "12px",
    justifyItems: "start",
  },
  link: {
    textDecoration: "none",
    fontWeight: 700,
    color: "#ffffff",
  },
  meta: {
    display: "grid",
    alignContent: "start",
    gap: "12px",
    justifyItems: "start",
    color: "rgba(255,255,255,0.84)",
    fontWeight: 600,
  },
};
