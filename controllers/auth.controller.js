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

    const newUser = new User({ username, password: hashedPassword });

    const savedUser = await newUser.save();
    res.json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// User login
export const login = async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
