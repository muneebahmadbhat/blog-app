import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
