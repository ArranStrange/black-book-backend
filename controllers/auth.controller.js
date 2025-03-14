import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
//
//
//
//
//
//
//
// REGISTRATION
export const register = async (req, res) => {
  //accepts a username and a password from teh request body (from the frontend form)
  const { username, password } = req.body;

  try {
    // Check if username exists against the DB
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      //if the user exists then returns the error below
      return res.json({ status: "error", message: "Username already taken" });
    }
    // if the user doesn't exist then is hashs the password provided
    // Hash password
    //10 represents the "Salt Rounds", this is how many times the function is run on the password, the more times the more secure
    const hashedPassword = await bcrypt.hash(password, 10);
    //saves the user from the request and the hased password to the variable newUser
    const newUser = new User({ username, password: hashedPassword });
    //uses mongoDB to save the new User to the DB
    const savedUser = await newUser.save();
    //response with a message and the savedUser object
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    //catches and responds with an error if any occure
    res.status(500).json({ message: error.message });
  }
};
//
//
//
//
//
//
//
//LOGIN
export const login = async (req, res) => {
  //extracts two parameters from the request body, username and password
  const { username, password } = req.body;
  //if username and password were not provided in the request body it will return the message below
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "Please provide a username and password" });
  }
  // if they exist then the findOne method is used to search the database and match the username
  // this is then saved in the variable user
  try {
    const user = await User.findOne({ username });
    //if user doesn't exist then it will respond with this error
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }
    // otherwise, we use bcrypt again to unhash the password and check if it is a match
    const isMatch = await bcrypt.compare(password, user.password);
    //if it isn't a match respond with an error message
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid username or password" });
    }
    // otherwise, respond with login successful
    res.status(200).json({ status: 200, message: "Login successful" });
  } catch (error) {
    //catch any errors and respond with the error message
    res.status(500).json({ status: 401, message: error.message });
  }
};

// 200 OK: The request was successful
// 201 Created: A new resource has been successfully created as a result of the request

// 400 Bad Request: The server could not understand the request due to invalid syntax
// 401 Unauthorized: Authentication is required, or the provided credentials are invalid

// 500 Internal Server Error
