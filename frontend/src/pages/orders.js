import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
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
      <p style={{ padding: "30px" }}>
        Please <Link to="/login">login</Link> to view your orders
      </p>
    );
  }

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Your Order History</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>You have not placed any orders yet.</p>
      )}

      {orders.map((order) => (
        <div key={order.id} style={styles.orderCard}>
          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>

          <p style={{ fontSize: "13px", color: "#666" }}>
            Ordered on:{" "}
            {order.createdAt?.toDate().toLocaleString()}
          </p>

          {order.items.map((item) => (
            <div key={item.id} style={styles.itemRow}>
              <img
                src={item.thumbnail}
                alt={item.title}
                style={styles.img}
              />
              <span>
                {item.title} × {item.quantity}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;

const styles = {
  orderCard: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "8px",
  },
  img: {
    width: "45px",
    height: "45px",
    objectFit: "cover",
    borderRadius: "6px",
  },
};
