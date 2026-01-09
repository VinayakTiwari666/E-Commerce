
import React, { useState } from "react";

import { Link } from "react-router-dom";


function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);
  return (
    <div style={styles.cardWrapper}>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={styles.imageWrapper}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={styles.image}
            />
          </div>

          <h3>{product.title}</h3>
          <p>₹ {product.price}</p>

          <button
  style={{
    ...styles.button,
    backgroundColor: added ? "#16a34a" : "#8b5cf6",
    cursor: added ? "default" : "pointer",
  }}
  disabled={added}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    setAdded(true);

    // optional reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  }}
>
  {added ? "Added ✓" : "Add to Cart"}
</button>

        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
const styles = {
  cardWrapper: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
  },

  card: {
    padding: "15px",                 // ✅ spacing restored
    display: "flex",                 // ✅ layout restored
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.2s ease",
  },

  imageWrapper: {
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    borderRadius: "8px",
    backgroundColor: "#f3f3f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },

  button: {
    marginTop: "auto",
    padding: "12px",
    backgroundColor: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",

  },

};

