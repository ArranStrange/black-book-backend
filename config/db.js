import mongoose from "mongoose";
import dotenv from "dotenv";

// const connectDB = async () => {
//   const mongoURI = process.env.MONGO_URI;
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// };

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error("❌ MONGO_URI not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
