// black-book-backend/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080; // Use port 8080

// Middleware
app.use(cors());
app.use(express.json());

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
