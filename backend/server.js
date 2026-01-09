const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productroutes");


dotenv.config();      // ✅ MUST be before connectDB()
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
