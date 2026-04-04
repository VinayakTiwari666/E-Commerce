import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 760);

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth <= 760);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.emptyState}>
            <p>
              Please <Link to="/login">login</Link> to view your orders.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div
          style={{
            ...styles.header,
            flexDirection: isCompact ? "column" : "row",
            alignItems: isCompact ? "flex-start" : styles.header.alignItems,
            padding: isCompact ? "22px" : styles.header.padding,
          }}
        >
          <div>
            <p style={styles.eyebrow}>Purchase history</p>
            <h2 style={styles.title}>Your order history</h2>
            <p style={styles.subText}>Track everything you have purchased.</p>
          </div>
          <div style={styles.countPill}>{orders.length} orders</div>
        </div>

        {loading && <p style={{ color: "gray" }}>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <div style={styles.emptyState}>
            <p>You have not placed any orders yet.</p>
            <Link to="/" style={styles.shopBtn}>
              Browse products
            </Link>
          </div>
        )}

        {/* ORDERS */}
        {orders.map((order) => (
          <div
            key={order.id}
            style={styles.orderCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {/* TOP */}
            <div style={styles.orderTop}>
              <div>
                <p style={styles.orderLabel}>Total</p>
                <p style={styles.orderTotal}>
                  Rs {Number(order.totalAmount).toFixed(2)}
                </p>
              </div>

              <p style={styles.orderDate}>
                {order.createdAt?.toDate().toLocaleString()}
              </p>
            </div>

            {/* ITEMS */}
            <div style={styles.items}>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.itemRow,
                    alignItems: isCompact ? "flex-start" : styles.itemRow.alignItems,
                  }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={styles.img}
                  />
                  <span style={{ wordBreak: "break-word" }}>
                    {item.title} × {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

const styles = {
  page: {
    padding: "40px 16px 80px",
    background: "var(--bg)",
    color: "var(--text)",
  },

  container: {
    maxWidth: "950px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "28px",
    borderRadius: "18px",
    padding: "26px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: "18px",
    background: "var(--card)",
    border: "1px solid var(--border)",
  },

  eyebrow: {
    margin: 0,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "gray",
  },

  title: {
    margin: "6px 0",
    fontSize: "2.2rem",
    fontWeight: "700",
  },

  subText: {
    color: "gray",
    marginBottom: 0,
  },

  countPill: {
    padding: "10px 16px",
    borderRadius: "999px",
    background: "#7c3aed20",
    color: "#7c3aed",
    fontWeight: 700,
  },

  orderCard: {
    borderRadius: "18px",
    padding: "22px",
    marginBottom: "22px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    transition: "0.3s",
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "18px",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--border)",
  },

  orderLabel: {
    margin: 0,
    color: "gray",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
  },

  orderTotal: {
    margin: 0,
    fontWeight: "700",
    fontSize: "22px",
    color: "#7c3aed",
  },

  orderDate: {
    fontSize: "13px",
    color: "gray",
  },

  items: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "10px",
    borderRadius: "12px",
  },

  img: {
    width: "52px",
    height: "52px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid var(--border)",
  },

  emptyState: {
    padding: "40px",
    borderRadius: "16px",
    border: "1px dashed var(--border)",
    textAlign: "center",
  },

  shopBtn: {
    display: "inline-block",
    marginTop: "14px",
    padding: "10px 16px",
    background: "#7c3aed",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  },
};
