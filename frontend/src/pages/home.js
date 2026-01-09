import React, { useEffect, useState } from "react";
import ProductCard from "../components/productcart";
import logo from "../assets/logo.png";


function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);
const searchedProducts = products.filter(product => {
  const term = searchTerm.toLowerCase();

  return (
    product.title.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );
});


const categories = [...new Set(products.map(p => p.category))];



const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);
return (
  <div style={styles.page}>
    <div style={styles.pageWrapper}>
      {/* Centered logo */}
      <div style={styles.heroLogo}>
        <img src={logo} alt="App Logo" style={styles.heroLogoImg} />
      </div>

      <div style={styles.headerSection}>
        <h2 style={styles.pageTitle}>Latest Products</h2>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* No results */}
      {!loading && searchedProducts.length === 0 && (
        <p style={{ textAlign: "center" }}>
          OOPS❗No products found 😓
        </p>
      )}

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading products...
        </p>
      )}

      {/* Products */}
      {!loading && searchedProducts.length > 0 && (
        <>
          {categories.map((category) => {
            const categoryProducts = searchedProducts.filter(
              (product) => product.category === category
            );

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} style={styles.categorySection}>
                <h2 style={styles.categoryTitle}>
                  {category.toUpperCase()}
                </h2>

                <div style={styles.container}>
                  {categoryProducts.slice(0, 6).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  </div>
);


}

export default Home;
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff7ed 0%, #f5f3ff 50%, #ecfeff 100%)",
  },

  pageWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "25px",
  },

  heroLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 0",
  },

  heroLogoImg: {
    width: "260px",
    height: "140px",
    objectFit: "contain",
    border: "2px solid #ddd",
    borderRadius: "14px",
    padding: "16px",
    backgroundColor: "#fff",
  },

  headerSection: {
    textAlign: "center",
    marginBottom: "50px",
  },

  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  searchInput: {
    padding: "12px 14px",
    width: "320px",
    maxWidth: "90%",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  categorySection: {
    marginBottom: "70px",
  },

  categoryTitle: {
    textAlign: "center",          // ✅ true centering
    marginBottom: "12px",
    marginTop: "20px",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  categoryDivider: {
    width: "60px",
    height: "3px",
    backgroundColor: "#8b5cf6",
    margin: "0 auto 25px",
    borderRadius: "2px",
  },
};






