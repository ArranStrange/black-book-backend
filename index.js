// black-book-backend/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080; // Use port 8080

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/black-book"; // Ensure this matches your MongoDB setup
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the Drink schema
const drinkSchema = new mongoose.Schema({
  idDrink: String,
  drinkName: String,
  Catagory: String,
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
  Measure5: String,
  Measure6: Number,
  DrinkThumb: String,
  Rating: Number,
  Instructions: String,
});

// Create the Drink model
const Drink = mongoose.model("Drink", drinkSchema);

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

//API route to delete a drink
app.delete("/drinks/:id", async (req, res) => {
  const { id } = req.params; // Get the drink ID from the URL parameters
  try {
    const deletedDrink = await Drink.findByIdAndDelete(id); // Delete the drink by ID
    if (!deletedDrink) {
      return res.status(404).json({ message: "Drink not found" }); // Handle case where drink is not found
    }
    res.status(200).json({ message: "Drink deleted successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
