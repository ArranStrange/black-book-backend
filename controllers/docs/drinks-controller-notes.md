# Drinks Controller Notes

---

## Model Used

- `Drink`: Mongoose model representing a drink entity in the MongoDB collection.

---

## Get All Drinks

### `getDrinks`

- Uses the Mongoose `.find()` method with no parameters to return all drink entries from the database.
- The result is sent back as a JSON array.
- Errors are caught and returned as a message in the response.

```js
const drinks = await Drink.find();
res.json(drinks);
```

---

## Get Drink by ID

### `getDrinkById`

- takes the `id` from the request parameters.
- Uses `Drink.findById(id)` to look up the drink with the corosponding ID.
- If not found, returns `"Drink not found"` message.
- If found, returns the drink object.

```js
const drink = await Drink.findById(id);
```

---

## Add New Drink

### `addDrink`

- Creates a new instance of the `Drink` model using `req.body`.
- Calls `.save()` on the new instance to insert it into the database.
- Returns the saved document, including the generated MongoDB ID.

```js
const newDrink = new Drink(req.body);
const savedDrink = await newDrink.save();
```

---

## Update a Drink

### `updateDrink`

- Takes the `id` from the request parameters.
- Uses `findByIdAndUpdate(id, req.body, { new: true })` to:

  - Find the drink by ID
  - Update it with the request body
  - Return the updated version

- If the drink is not found, returns `"Drink not found"`.
- Returns the updated drink document.

```js
const updatedDrink = await Drink.findByIdAndUpdate(id, req.body, { new: true });
```

---

## Delete a Drink

### `deleteDrink`

- Gets the drink `id` from the request parameters.
- Uses `findByIdAndDelete(id)` to remove the drink.
- If the ID is not found, returns `"Drink not found"`.
- Otherwise, returns a success message: `"Drink deleted successfully"`.

```js
const deletedDrink = await Drink.findByIdAndDelete(id);
```
