import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      style={styles.card}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-6px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <Link to={`/product/${product.id}`} style={styles.link}>
        {/* IMAGE */}
        <div style={styles.media}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={styles.image}
          />
          <span style={styles.badge}>{product.category}</span>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <div>
            <h3 style={styles.title}>{product.title}</h3>
            <p style={styles.description}>
              {product.description ||
                "Built for daily use and clean presentation."}
            </p>
          </div>

          <div style={styles.meta}>
            <strong style={styles.price}>
              Rs {Number(product.price).toFixed(2)}
            </strong>
            <span style={styles.rating}>⭐ {product.rating || 4.8}</span>
          </div>
        </div>
      </Link>

      {/* BUTTON */}
      <button
        style={{
          ...styles.button,
          background: added
            ? "#22c55e"
            : "linear-gradient(135deg, #7c3aed, #6d28d9)",
        }}
        onClick={handleAddToCart}
      >
        {added ? "✔ Added" : "Add to Cart"}
      </button>
    </article>
  );
}

export default ProductCard;

const styles = {
  // 🔥 CARD (BUBBLE STYLE)
  card: {
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minHeight: "100%",
    background: "var(--card)",
    border: "1px solid var(--border)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    transition: "0.25s ease",
  },

  link: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    flex: 1,
  },

  // 🔥 IMAGE CONTAINER
  media: {
    position: "relative",
    borderRadius: "14px",
    overflow: "hidden",
    minHeight: "200px",
    background:
      "linear-gradient(to right, #7c3aed10, transparent), var(--secondary)",
    display: "grid",
    placeItems: "center",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    padding: "16px",
    transition: "0.3s",
  },

  // 🔥 CATEGORY BADGE
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#7c3aed",
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "12px",
    flex: 1,
  },

  title: {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: "600",
    lineHeight: 1.3,
  },

  description: {
    margin: "6px 0 0",
    color: "var(--muted)",
    fontSize: "0.9rem",
    lineHeight: 1.5,
  },

  meta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontSize: "1.1rem",
    color: "#7c3aed",
    fontWeight: "700",
  },

  rating: {
    color: "var(--muted)",
    fontWeight: "600",
    fontSize: "0.85rem",
  },

  // 🔥 PREMIUM BUTTON
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.25s",
    boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
  },
};
