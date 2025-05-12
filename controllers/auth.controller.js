import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
//
//
//// Docs: file://./docs/auth-controller-notes.md
//
//
//
//
export const register = async (req, res) => {
  const { username, password, firstName, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ status: "error", message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      email,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//
//
//
//
//
//
//LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide a username and password" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }

    res.status(200).json({ status: 200, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ status: 401, message: error.message });
  }
};
