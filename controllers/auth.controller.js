import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "dotenv";

// User registration
export const register = async (req, res) => {
  //requires a username and a password from teh request body (from the frontend form)
  const { username, password } = req.body;

  try {
    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Username already taken" });
    }

    // Hash password
    //10 represents the "Salt Rounds", this is how many times the function is run on the password, the more times the more secure
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import express from "express";
const app = express();

app.use(express.json()); // ✅ Required to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // ✅ Enables URL-encoded parsing

// User login route
app.post("/auth/users", async (req, res) => {
  console.log("Received login request with body:", req.body); // Debugging log
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
