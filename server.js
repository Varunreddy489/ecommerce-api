import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";
import { authRoutes } from "./routes/auth.route.js";
import { cartRoutes } from "./routes/cart.route.js";
import { couponRoutes } from "./routes/coupon.route.js";
import { productRoutes } from "./routes/product.route.js";
import { paymentRoutes } from "./routes/payment.route.js";
import { analyticsRoutes } from "./routes/analytics.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
