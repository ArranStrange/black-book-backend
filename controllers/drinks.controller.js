import Drink from "../models/drinks.model.js";
//
//
// Get all drinks
export const getDrinks = async (req, res) => {
  try {
    //uses the the find() method with no params to return the entire array of drinks
    const drinks = await Drink.find();
    //returns the drinks array
    res.json(drinks);
    //catched and returns any error and a message
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
    // creates a new instance of the Drink model
    // sets the variable newDrink to the new Drink model containing req.body
    const newDrink = new Drink(req.body);
    // uses .save() method pushing the newDrink to the DB
    const savedDrink = await newDrink.save();
    //returns the details of the savedDrink - including the new mongo made ID
    res.json(savedDrink);
    //handles errors and returns an error message
  } catch (error) {
    res.json({ message: error.message });
  }
};
//
//
// Update a drink
export const updateDrink = async (req, res) => {
  //extracts the id from the request object
  const { id } = req.params;

  try {
    //findByIdAndUpdate is a mongoDb method
    // finding the object by the id, and updates it with the request body
    const updatedDrink = await Drink.findByIdAndUpdate(id, req.body, {
      //new tells mongoose to return the new object
      new: true,
    });
    if (
      // Error handling
      // if the updated drink isn't found by ID the error message is returned
      !updatedDrink
    )
      return res.json({ message: "Drink not found" });
    // returns the updated drink
    res.json(updatedDrink);
  } catch (error) {
    res.json({ message: error.message });
  }
};
//
//
// Delete a drink
export const deleteDrink = async (req, res) => {
  // takes a argument of the request param ID
  const { id } = req.params;
  try {
    //uses the mongoDB method findByIdAndDelete with the id
    const deletedDrink = await Drink.findByIdAndDelete(id);
    //if the drink id cannot be matched returns this error message
    if (!deletedDrink) return res.json({ message: "Drink not found" });
    //otherwise will return the success message
    res.json({ message: "Drink deleted successfully" });
    //handles errors
  } catch (error) {
    res.json({ message: error.message });
  }
};
