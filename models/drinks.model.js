import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema({
  idDrink: { type: String, unique: true, required: true },
  drinkName: String,
  shortDescription: String,
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

export default Drink;
