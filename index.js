require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "https://black-book-backend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not defined in the .env file");
  process.exit(1); // Exit if the MONGO_URI is not found
}

// const mongoURI = "mongodb://localhost:27017/black-book";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const drinkSchema = new mongoose.Schema({
  idDrink: String,
  drinkName: String,
  Category: String,
  Glass: String,
  Ice: String,
  Ingredient1: String,
  Ingredient2: String,
  Ingredient3: String,
  Ingredient4: String,
  Ingredient5: String,
  Ingredient6: String,
  Measure1: Number,
  Measure2: Number,
  Measure3: Number,
  Measure4: Number,
  Measure5: Number,
  Measure6: Number,
  DrinkThumb: String,
  Rating: Number,
  Instructions: String,
});
const Drink = mongoose.model("Drink", drinkSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
});
const User = mongoose.model("User", userSchema);

// API route to get all drinks
app.get("/drinks", async (req, res) => {
  try {
    const drinks = await Drink.find(); // Fetch all drinks
    res.json(drinks); // Return drinks as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API route to add a new drink
app.post("/drinks", async (req, res) => {
  const newDrink = new Drink(req.body); // Create a new drink instance with request body
  try {
    const savedDrink = await newDrink.save(); // Save the drink to the database
    res.status(201).json(savedDrink); // Respond with the saved drink
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
});

// Update drink route
app.put("/drinks/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  const updateData = req.body; // Get the data from the request body

  try {
    const updatedDrink = await Drink.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedDrink) {
      return res.status(404).json({ message: "Drink not found" });
    }

    res.status(200).json(updatedDrink); // Send back the updated drink
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating drink" });
  }
});

// API route to delete a drink
app.delete("/drinks/:id", async (req, res) => {
  const { id } = req.params; // Get the drink ID from the URL parameters
  try {
    console.log(id);
    const deletedDrink = await Drink.findByIdAndDelete(id); // Delete the drink by ID
    if (!deletedDrink) {
      return res.status(404).json({ message: "Drink not found" });
      // Handle case where drink is not found
    }
    res.status(200).json({ message: "Drink deleted successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

// User registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login route with bcrypt for password comparison
app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the stored hashed password with the input password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // If login is successful, send a success response
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
