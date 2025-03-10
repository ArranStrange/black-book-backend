import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import drinksRouter from "./routes/drinks.routes.js";

const app = express();
const PORT = process.env.PORT || 1000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://black-book-backend.onrender.com",
    "https://black-book-1454c.web.app",
    "http://192.168.0.4:3000",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/auth", authRouter);
app.use("/api", drinksRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
