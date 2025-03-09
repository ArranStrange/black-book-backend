import Drink from "../models/drinks.model.js"; // Ensure correct import

// Get all drinks
export const getDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find().sort({ drinkName: 1 });
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get drink by ID
export const getDrinkById = async (req, res) => {
  const { id } = req.params;
  try {
    const drink = await Drink.findById(id);
    if (!drink) return res.status(404).json({ message: "Drink not found" });
    res.json(drink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new drink
export const addDrink = async (req, res) => {
  try {
    const newDrink = new Drink(req.body);
    const savedDrink = await newDrink.save();
    res.status(201).json(savedDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a drink
export const updateDrink = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDrink = await Drink.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDrink)
      return res.status(404).json({ message: "Drink not found" });
    res.json(updatedDrink);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a drink
export const deleteDrink = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDrink = await Drink.findByIdAndDelete(id);
    if (!deletedDrink)
      return res.status(404).json({ message: "Drink not found" });
    res.json({ message: "Drink deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
