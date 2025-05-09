import Drink from "../models/drinks.model.js";
//
//// Docs: file://./docs/drinks-controller-notes.md
//
// Get all drinks
export const getDrinks = async (req, res) => {
  try {
    const drinks = await Drink.find();

    res.json(drinks);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//
//
// Get drink by ID
export const getDrinkById = async (req, res) => {
  const { id } = req.params;
  try {
    const drink = await Drink.findById(id);
    if (!drink) return res.json({ message: "Drink not found" });
    res.json(drink);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//
//
// Add new drink
export const addDrink = async (req, res) => {
  try {
    const newDrink = new Drink(req.body);

    const savedDrink = await newDrink.save();

    res.json(savedDrink);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//
//
// Update a drink
export const updateDrink = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDrink = await Drink.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDrink) return res.json({ message: "Drink not found" });
    res.json(updatedDrink);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//
//
// Delete a drink
export const deleteDrink = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDrink = await Drink.findByIdAndDelete(id);
    if (!deletedDrink) return res.json({ message: "Drink not found" });
    res.json({ message: "Drink deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
