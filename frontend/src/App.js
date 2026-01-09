import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "./pages/orders";


import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import { auth, db } from "./firebase";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import ProductDetail from "./pages/productdetail";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  /* ===============================
     🔐 AUTH STATE LISTENER
  ================================ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setCartItems([]); // clear cart on logout
      }
    });

    return () => unsubscribe();
  }, []);

  /* ===============================
     🔁 LOAD CART ON LOGIN
  ================================ */
  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      try {
        const cartRef = doc(db, "carts", user.uid);
        const snap = await getDoc(cartRef);

        if (snap.exists()) {
          setCartItems(snap.data().items || []);
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    loadCart();
  }, [user]);

  /* ===============================
     💾 SAVE CART TO FIRESTORE
  ================================ */
  const saveCartToFirestore = async (uid, items) => {
    try {
      await setDoc(
        doc(db, "carts", uid),
        {
          items,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  /* ===============================
     🛒 CENTRAL CART UPDATER
  ================================ */
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    if (user) {
      saveCartToFirestore(user.uid, updatedCart);
    }
  };

  /* ===============================
     ➕ ADD TO CART
  ================================ */
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  /* ===============================
     ⬆️ INCREASE QTY
  ================================ */
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updatedCart);
  };

  /* ===============================
     ⬇️ DECREASE QTY
  ================================ */
  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  /* ===============================
     🚦 ROUTES
  ================================ */
  return (
    <Router>
      <Navbar user={user} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders user={user} />} />

        <Route
  path="/cart"
  element={
    <Cart
      cartItems={cartItems}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
      user={user}
      setCartItems={setCartItems}
    />
  }
/>


        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              user={user}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


