import {
  getDrinks,
  getDrinkById,
  addDrink,
  updateDrink,
  deleteDrink,
} from "../controllers/drinks.controller.js";
import express from "express";

const drinksRouter = express.Router();

drinksRouter.get("/drinks", getDrinks);
drinksRouter.get("/drinks/:id", getDrinkById);
drinksRouter.post("/drinks", addDrink);
drinksRouter.put("/drinks/:id", updateDrink);
drinksRouter.delete("/drinks/:id", deleteDrink);

export default drinksRouter;
