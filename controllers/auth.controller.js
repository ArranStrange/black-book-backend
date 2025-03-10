import bcrypt from "bcrypt";
import User from "../models/auth.model.js";

// User registration
export const register = async (req, res) => {
  //requires a username and a password from teh request body (from the frontend form)
  const { username, password } = req.body;

  try {
    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ status: "error", message: "Username already taken" });
    }

    // Hash password
    //10 represents the "Salt Rounds", this is how many times the function is run on the password, the more times the more secure
    const hashedPassword = await bcrypt.hash(password, 10);
    //saves the user from the request
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    res.json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Login
export const login = async (req, res) => {
  console.log("Received login request:", req.body); // Debugging

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
