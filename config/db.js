import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const connectDB = async () => {
//   const mongoURI = process.env.MONGO_URI;
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// };

const connectDB = async () => {
  const mongoURI = process.env.PORT;
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
