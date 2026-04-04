import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function Cart({ cartItems, increaseQty, decreaseQty, user, setCartItems }) {
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 760);

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerWidth <= 760);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ TOTAL FIX
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formattedTotal = Number(totalPrice).toFixed(2);

  const handleCheckout = async () => {
    if (!user) return;

    const totalAmount =
      Math.round(
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) *
          100,
      ) / 100;

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        totalAmount,
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, "carts", user.uid), { items: [] });
      setCartItems([]);
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div
          style={{
            ...styles.hero,
            flexDirection: isCompact ? "column" : "row",
            alignItems: isCompact ? "flex-start" : "stretch",
            padding: isCompact ? "22px" : styles.hero.padding,
          }}
        >
          <div>
            <p style={styles.eyebrow}>Bag summary</p>
            <h2 style={styles.heading}>Shopping cart</h2>
            <span style={styles.subText}>
              {cartItems.length} items in your bag
            </span>
          </div>

          <div style={styles.heroTotal}>
            <span style={styles.heroTotalLabel}>Current total</span>
            <strong style={styles.heroTotalValue}>Rs {formattedTotal}</strong>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Your cart is empty.</p>
            <Link to="/" style={styles.shopBtn}>
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div style={styles.list}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.itemCard,
                    gridTemplateColumns: isCompact
                      ? "1fr"
                      : styles.itemCard.gridTemplateColumns,
                    justifyItems: isCompact ? "flex-start" : "stretch",
                    padding: isCompact ? "16px" : styles.itemCard.padding,
                    gap: isCompact ? "14px" : styles.itemCard.gap,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-4px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={styles.itemImg}
                  />

                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemTitle}>{item.title}</h4>
                    <p style={styles.itemPrice}>
                      Rs {Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  {/* QTY CONTROLS */}
                  <div
                    style={{
                      ...styles.qtyControls,
                      justifySelf: isCompact ? "flex-start" : "stretch",
                    }}
                  >
                    <button
                      style={styles.qtyBtn}
                      onClick={() => decreaseQty(item.id)}
                    >
                      −
                    </button>
                    <span style={styles.qtyValue}>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <p
                    style={{
                      ...styles.lineTotal,
                      textAlign: isCompact ? "left" : styles.lineTotal.textAlign,
                      minWidth: isCompact ? "auto" : styles.lineTotal.minWidth,
                    }}
                  >
                    Rs {Number(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span>Total</span>
                <strong style={{ color: "#7c3aed" }}>
                  Rs {formattedTotal}
                </strong>
              </div>

              {!user ? (
                <p style={styles.loginHint}>
                  Please <Link to="/login">login</Link> to checkout.
                </p>
              ) : (
                <button style={styles.checkoutBtn} onClick={handleCheckout}>
                  Place Order
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

const styles = {
  page: {
    padding: "40px 16px 80px",
    background: "var(--bg)",
    color: "var(--text)",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  hero: {
    borderRadius: "18px",
    padding: "26px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "26px",
    background: "var(--card)",
    border: "1px solid var(--border)",
  },

  eyebrow: {
    fontSize: "12px",
    textTransform: "uppercase",
    color: "gray",
    letterSpacing: "0.1em",
  },

  heading: {
    margin: 0,
    fontSize: "2.2rem",
    fontWeight: "700",
  },

  subText: {
    color: "gray",
  },

  heroTotal: {
    textAlign: "right",
  },

  heroTotalLabel: {
    fontSize: "12px",
    color: "gray",
  },

  heroTotalValue: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#7c3aed",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  // 🔥 CLEAN BUBBLE CARDS
  itemCard: {
    display: "grid",
    gridTemplateColumns: "70px 1fr auto auto",
    alignItems: "center",
    gap: "20px",
    padding: "18px 22px",
    borderRadius: "16px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    transition: "0.2s",
  },

  itemImg: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    objectFit: "cover",
    background: "var(--secondary)",
  },

  itemInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "4px",
  },

  itemTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
  },

  itemPrice: {
    margin: 0,
    color: "gray",
  },

  // 🔥 BUBBLE QTY CONTROL
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#7c3aed15",
    padding: "6px 12px",
    borderRadius: "999px",
  },

  qtyBtn: {
    border: "none",
    background: "white",
    color: "#7c3aed",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "700",
  },

  qtyValue: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "600",
  },

  lineTotal: {
    fontWeight: "700",
    color: "#7c3aed",
    minWidth: "90px",
    textAlign: "right",
  },

  summary: {
    marginTop: "30px",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid var(--border)",
    background: "var(--card)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
  },

  checkoutBtn: {
    marginTop: "16px",
    padding: "12px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  loginHint: {
    marginTop: "10px",
    color: "gray",
  },

  emptyState: {
    padding: "40px",
    borderRadius: "16px",
    border: "1px dashed var(--border)",
    textAlign: "center",
  },

  shopBtn: {
    marginTop: "12px",
    display: "inline-block",
    padding: "10px 16px",
    background: "#7c3aed",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  },
};
