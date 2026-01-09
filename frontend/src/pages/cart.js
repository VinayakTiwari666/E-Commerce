import React from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Cart({
  cartItems,
  increaseQty,
  decreaseQty,
  user,
  setCartItems,
}) {
  const handleCheckout = async () => {
    if (!user) return;

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    try {
      // 1️⃣ Save order
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        totalAmount,
        createdAt: serverTimestamp(),
      });

      // 2️⃣ Clear cart in Firestore
      await setDoc(doc(db, "carts", user.uid), { items: [] });

      // 3️⃣ Clear cart in UI
      setCartItems([]);

      alert("✅ Order placed successfully!");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px 0" }}>{item.title}</h4>
                <p style={{ margin: 0, color: "#555" }}>
                  ₹ {item.price}
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <p style={{ fontWeight: "bold" }}>
                ₹ {item.price * item.quantity}
              </p>
            </div>
          ))}

          <h3>Total: ₹ {totalPrice}</h3>
        </>
      )}

      {!user ? (
        <p>
          Please <Link to="/login">login</Link> to checkout
        </p>
      ) : (
        <button style={styles.checkoutBtn} onClick={handleCheckout}>
          Fake Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;

const styles = {
  checkoutBtn: {
    marginTop: "20px",
    padding: "14px",
    width: "100%",
    backgroundColor: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};



