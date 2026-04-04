import React, { useEffect, useState } from "react";
import ProductCard from "../components/productcart";
import logo from "../assets/logo.png";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 860);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 860);
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const searchedProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    return (
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section style={styles.page} className="page-shell">
      <div
        style={{
          ...styles.wrapper,
          padding: isMobile ? "0 2px" : undefined,
        }}
      >
        <section
          style={{
            ...styles.hero,
            gridTemplateColumns: isCompact ? "1fr" : "1.4fr 0.9fr",
          }}
        >
          <div style={styles.heroCopy}>
            <p className="eyebrow">Curated storefront</p>
            <h1
              style={{
                ...styles.heroTitle,
                fontSize: isMobile
                  ? "clamp(1.9rem, 10vw, 2.7rem)"
                  : styles.heroTitle.fontSize,
              }}
              className="section-title"
            >
              Better product browsing with a sharper light and dark theme.
            </h1>
            <p style={styles.heroText} className="muted">
              Browse by category, inspect the details, and keep the interface in
              a mode that actually changes the mood of the shop.
            </p>
            <div style={styles.heroActions}>
              <div style={styles.statCard} className="panel">
                <strong style={styles.statValue}>
                  {products.length || "24"}
                </strong>
                <span style={styles.statLabel}>Products loaded</span>
              </div>
              <div style={styles.statCard} className="panel">
                <strong style={styles.statValue}>
                  {categories.length || "6"}
                </strong>
                <span style={styles.statLabel}>Live categories</span>
              </div>
            </div>
          </div>

          <div
            style={{
              ...styles.heroVisual,
              padding: isMobile ? "22px" : styles.heroVisual.padding,
              minHeight: isMobile ? "280px" : styles.heroVisual.minHeight,
            }}
            className="panel"
          >
            <div style={styles.heroBadge}>Featured store</div>
            <img src={logo} alt="Store logo" style={styles.heroLogo} />
            <div style={styles.heroVisualFooter}>
              <span style={styles.heroVisualTitle}>SarvaMart</span>
              <span style={styles.heroVisualText}>
                Structured, faster, clearer
              </span>
            </div>
          </div>
        </section>

        <section
          style={{
            ...styles.filterBar,
            gridTemplateColumns: isCompact ? "1fr" : "1fr minmax(260px, 420px)",
            padding: isMobile ? "20px" : styles.filterBar.padding,
          }}
          className="panel"
        >
          <div style={styles.filterCopy}>
            <p className="eyebrow">Search products</p>
            <h2
              style={{
                ...styles.filterTitle,
                fontSize: isMobile ? "1.8rem" : styles.filterTitle.fontSize,
              }}
              className="section-title"
            >
              Find products faster
            </h2>
            <p style={styles.filterText}>
              Search by product name or category and jump straight to what you
              need.
            </p>
          </div>

          <div
            style={{
              ...styles.searchWrap,
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : styles.searchWrap.alignItems,
              padding: isMobile ? "12px" : styles.searchWrap.padding,
            }}
            className="panel"
          >
            <span
              style={{
                ...styles.searchIcon,
                width: isMobile ? "100%" : "auto",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Search
            </span>
            <input
              type="text"
              placeholder="Search by title or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input prominent-search"
              style={{
                ...styles.searchInput,
                width: "100%",
                minWidth: 0,
              }}
            />
          </div>
        </section>

        {!loading && searchedProducts.length === 0 && (
          <div style={styles.emptyState} className="panel">
            <p style={styles.emptyTitle} className="section-title">
              No matching products
            </p>
            <p className="muted">Try a different title or category keyword.</p>
          </div>
        )}

        {loading && (
          <div style={styles.emptyState} className="panel">
            <p style={styles.emptyTitle} className="section-title">
              Loading products
            </p>
            <p className="muted">Fetching the current catalog.</p>
          </div>
        )}

        {!loading &&
          searchedProducts.length > 0 &&
          categories.map((category) => {
            const categoryProducts = searchedProducts.filter(
              (product) => product.category === category,
            );

            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <section key={category} style={styles.categoryBlock}>
                <div style={styles.categoryHeader}>
                  <div>
                    <p className="eyebrow">Category</p>
                    <h3 style={styles.categoryTitle} className="section-title">
                      {formatCategory(category)}
                    </h3>
                  </div>
                  <span
                    style={{
                      ...styles.categoryCount,
                      alignSelf: isCompact ? "flex-start" : "center",
                    }}
                  >
                    {categoryProducts.length} items
                  </span>
                </div>

                <div
                  style={{
                    ...styles.productRail,
                    ...(isMobile
                      ? {
                          display: "flex",
                          overflowX: "auto",
                          paddingBottom: "8px",
                          scrollSnapType: "x proximity",
                          WebkitOverflowScrolling: "touch",
                        }
                      : {}),
                  }}
                >
                  {categoryProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      style={
                        isMobile
                          ? {
                              minWidth: "260px",
                              flex: "0 0 260px",
                              scrollSnapAlign: "start",
                            }
                          : undefined
                      }
                    >
                      <ProductCard
                        product={product}
                        addToCart={addToCart}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>
    </section>
  );
}

function formatCategory(category) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default Home;

const styles = {
  page: {
    padding: "36px 16px 80px",
  },
  wrapper: {
    maxWidth: "1240px",
    margin: "0 auto",
  },
  hero: {
    display: "grid",
    gap: "24px",
    alignItems: "stretch",
    marginBottom: "28px",
  },
  heroCopy: {
    padding: "8px 0",
  },
  heroTitle: {
    margin: 0,
    maxWidth: "720px",
    fontSize: "clamp(2.2rem, 5.2vw, 4rem)",
    lineHeight: 1,
  },
  heroText: {
    marginTop: "18px",
    maxWidth: "620px",
    fontSize: "1.02rem",
    lineHeight: 1.7,
  },
  heroActions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "28px",
  },
  statCard: {
    minWidth: "170px",
    padding: "18px 20px",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statValue: {
    fontSize: "2rem",
    lineHeight: 1,
  },
  statLabel: {
    color: "var(--muted)",
    fontWeight: 600,
  },
  heroVisual: {
    borderRadius: "20px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "340px",
    background:
      "linear-gradient(to right, #7c3aed10, transparent), var(--card)",
  },
  heroBadge: {
    alignSelf: "flex-start",
    padding: "10px 14px",
    borderRadius: "999px",
    background: "var(--secondary)",
    color: "var(--primary)",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontSize: "0.74rem",
  },
  heroLogo: {
    width: "100%",
    maxWidth: "240px",
    alignSelf: "center",
    objectFit: "contain",
    filter: "drop-shadow(0 22px 24px rgba(124, 58, 237, 0.12))",
  },
  heroVisualFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  heroVisualTitle: {
    fontSize: "1.3rem",
    fontWeight: 800,
  },
  heroVisualText: {
    color: "var(--muted)",
  },
  filterBar: {
    borderRadius: "20px",
    padding: "24px",
    display: "grid",
    gap: "22px",
    alignItems: "end",
    marginBottom: "28px",
  },
  filterCopy: {
    maxWidth: "520px",
  },
  filterTitle: {
    margin: 0,
    fontSize: "2.2rem",
  },
  filterText: {
    margin: "10px 0 0",
    color: "var(--muted)",
    lineHeight: 1.6,
    fontSize: "1rem",
  },
  searchWrap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px",
    borderRadius: "18px",
    boxShadow: "var(--shadow)",
    background:
      "linear-gradient(to right, #7c3aed10, transparent), var(--card)",
  },
  searchIcon: {
    flexShrink: 0,
    padding: "12px 14px",
    borderRadius: "12px",
    background: "var(--primary)",
    color: "#fff",
    fontSize: "0.82rem",
    fontWeight: 800,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  searchInput: {
    fontSize: "1.02rem",
    padding: "18px 18px",
    borderRadius: "14px",
  },
  emptyState: {
    padding: "42px 24px",
    borderRadius: "20px",
    textAlign: "center",
  },
  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "1.8rem",
  },
  categoryBlock: {
    marginBottom: "34px",
  },
  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "14px",
  },
  categoryTitle: {
    margin: 0,
    fontSize: "1.8rem",
  },
  categoryCount: {
    color: "var(--muted)",
    fontWeight: 700,
  },
  productRail: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
};
