import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "30px" }}>Loading product...</p>;
  }

  if (!product) {
    return <p style={{ padding: "30px" }}>Product not found</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div style={styles.page} className="page-shell">
      <div
        style={{
          ...styles.headerBand,
          padding: isCompact ? "20px" : styles.headerBand.padding,
        }}
        className="panel"
      >
        <p className="eyebrow">Product detail</p>
        <h1
          style={{
            ...styles.headerTitle,
            fontSize: isCompact ? "2rem" : styles.headerTitle.fontSize,
          }}
          className="section-title"
        >
          {product.title}
        </h1>
        <p style={styles.headerCopy}>
          Inspect the product, scan the reviews, and add it straight to cart.
        </p>
      </div>

      <div
        style={{
          ...styles.container,
          gap: isCompact ? "24px" : styles.container.gap,
        }}
        className="product-detail"
      >
        <div style={styles.imageBox} className="product-image">
          <img
            src={product.thumbnail}
            alt={product.title}
            style={styles.image}
          />
        </div>

        <div
          style={{
            ...styles.details,
            padding: isCompact ? "22px" : styles.details.padding,
          }}
          className="panel product-info"
        >
          <p style={styles.kicker}>{product.category}</p>
          <h2 className="section-title product-title">{product.title}</h2>
          <p style={styles.price} className="price">Rs {product.price}</p>
          <p style={styles.rating} className="rating">Rating {product.rating} / 5</p>

          <p style={styles.desc} className="description">{product.description}</p>

          <div style={styles.metaRow} className="brand">
            <span style={styles.metaLabel}>Brand</span>
            <span style={styles.metaValue}>{product.brand}</span>
          </div>

          <button
            style={{
              ...styles.button,
              width: isCompact ? "100%" : styles.button.width,
            }}
            className={`btn add-to-cart ${added ? "btn-success" : "btn-primary"}`}
            onClick={handleAddToCart}
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div style={styles.reviewsSection} className="reviews-section">
        <div style={styles.reviewsHeader}>
          <h3 className="section-title">Customer Reviews</h3>
          <p style={styles.subText}>
            Real words from customers who tried it out.
          </p>
        </div>

        {!product.reviews || product.reviews.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>
            No reviews yet for this product.
          </p>
        ) : (
          <div style={styles.reviewsGrid} className="review-grid">
            {product.reviews.map((review, index) => (
              <div key={index} style={styles.reviewCard} className="review-card">
                <div style={styles.reviewHeader}>
                  <div style={styles.avatar}>{review.reviewerName[0]}</div>
                  <div>
                    <p style={styles.reviewUser} className="review-name">{review.reviewerName}</p>
                    <p style={styles.reviewRating}>
                      Rating {review.rating} / 5
                    </p>
                  </div>
                </div>

                <p style={styles.reviewText} className="review-text">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;

const styles = {
  page: {
    padding: "34px 16px 80px",
  },
  headerBand: {
    maxWidth: "1100px",
    margin: "0 auto 22px",
    padding: "24px",
    borderRadius: "20px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "2.8rem",
  },
  headerCopy: {
    margin: "12px 0 0",
    maxWidth: "620px",
    color: "var(--muted)",
    lineHeight: 1.6,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "40px",
    maxWidth: "1100px",
    margin: "0 auto",
    alignItems: "center",
  },
  imageBox: {
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "28px",
    backgroundColor: "var(--card)",
    boxShadow: "var(--shadow-soft)",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    display: "block",
    objectFit: "contain",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    paddingTop: "10px",
    borderRadius: "16px",
    padding: "28px",
  },
  kicker: {
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: "11px",
    color: "var(--muted)",
    margin: 0,
  },
  price: {
    fontSize: "30px",
    fontWeight: "700",
    margin: 0,
    color: "var(--primary)",
  },
  rating: {
    color: "var(--muted)",
    margin: 0,
    fontWeight: "600",
  },
  desc: {
    lineHeight: "1.6",
    color: "var(--muted)",
  },
  metaRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: "12px",
    color: "var(--muted)",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  metaValue: {
    fontWeight: "600",
  },
  button: {
    width: "fit-content",
    padding: "12px 22px",
  },
  reviewsSection: {
    marginTop: "50px",
    paddingTop: "30px",
    borderTop: "1px solid var(--border)",
    maxWidth: "1100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  reviewsHeader: {
    marginBottom: "20px",
  },
  subText: {
    color: "var(--muted)",
  },
  reviewsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  reviewCard: {
    backgroundColor: "var(--card)",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "var(--shadow-soft)",
    border: "1px solid var(--border)",
  },
  reviewHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary), var(--primary-hover))",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  reviewUser: {
    fontWeight: "bold",
    margin: 0,
  },
  reviewRating: {
    fontSize: "13px",
    color: "var(--primary)",
    margin: 0,
  },
  reviewText: {
    color: "var(--muted)",
    lineHeight: "1.6",
    fontSize: "14px",
  },
};
