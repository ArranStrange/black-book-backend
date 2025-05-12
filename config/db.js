import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load the appropriate .env file
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Log the loaded environment (for debugging only – remove in production)
console.log("MONGO_URI received:", process.env.MONGO_URI);

// MongoDB connection
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("❌ MONGO_URI not defined.");
    process.exit(1); // Exit process with failure
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
