import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


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

  return (
    <div style={styles.container}>
      {/* Image */}
      <div style={styles.imageBox}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={styles.image}
        />
      </div>

      {/* Details */}
      <div style={styles.details}>
        <h2>{product.title}</h2>
        <p style={styles.price}>₹ {product.price}</p>

        <p style={styles.rating}>
          ⭐ {product.rating} / 5
        </p>

        <p style={styles.desc}>{product.description}</p>

        <p style={styles.meta}>
          Category: <b>{product.category}</b>
        </p>
        <p style={styles.meta}>
          Brand: <b>{product.brand}</b>
        </p>

        <button
          style={styles.button}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    {/* Reviews Section */}
<div style={styles.reviewsSection}>
  <h3 style={styles.reviewsTitle}>Customer Reviews</h3>

  {!product.reviews || product.reviews.length === 0 ? (
    <p>No reviews yet for this product.</p>
  ) : (
    <div style={styles.reviewsGrid}>
      {product.reviews.map((review, index) => (
        <div key={index} style={styles.reviewCard}>
          <div style={styles.reviewHeader}>
            <div style={styles.avatar}>
              {review.reviewerName[0]}
            </div>
            <div>
              <p style={styles.reviewUser}>{review.reviewerName}</p>
              <p style={styles.reviewRating}>
                ⭐ {review.rating} / 5
              </p>
            </div>
          </div>

          <p style={styles.reviewText}>{review.comment}</p>
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
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    padding: "40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },

  imageBox: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#fff",
  },

  image: {
    width: "100%",
    objectFit: "contain",
  },

  details: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  price: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  rating: {
    color: "#f59e0b",
  },

  desc: {
    lineHeight: "1.6",
  },

  meta: {
    color: "#555",
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
 reviewsSection: {
  marginTop: "50px",
  paddingTop: "30px",
  borderTop: "1px solid #e5e7eb",
},

reviewsTitle: {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "20px",
},
reviewRating: {
  fontSize: "13px",
  color: "#f59e0b",
},


reviewsGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
},

reviewCard: {
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
  backgroundColor: "#8b5cf6",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
},

reviewUser: {
  fontWeight: "bold",
  color: "#111",
},

reviewText: {
  color: "#444",
  lineHeight: "1.6",
  fontSize: "14px",
},
};