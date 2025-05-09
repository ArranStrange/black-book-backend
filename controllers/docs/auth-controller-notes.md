# Auth Controller Notes

---

## 🔐 Registration (`register`)

1. **Receive input from the frontend form**:
   ```js
   const { username, password } = req.body;
   ```

````

2. **Check if the username already exists** in the database:

   ```js
   const existingUser = await User.findOne({ username });
   if (existingUser) {
     return res.json({ status: "error", message: "Username already taken" });
   }
   ```

3. **Hash the password**:

   - `bcrypt.hash(password, 10)` is used.
   - `10` is the **salt rounds** — the number of times the hash function is applied.
   - More salt rounds = more secure, but also more CPU intensive.

4. **Create and save a new user**:

   ```js
   const newUser = new User({ username, password: hashedPassword });
   const savedUser = await newUser.save();
   ```

5. **Respond with success**:

   ```js
   res
     .status(201)
     .json({ message: "User registered successfully", user: savedUser });
   ```

6. **Error handling**:

   ```js
   res.status(500).json({ message: error.message });
   ```

---

## 🔑 Login Flow (`login`)

### 🔸 Step-by-Step Breakdown

1. **Extract credentials from the request body**:

   ```js
   const { username, password } = req.body;
   ```

2. **Check if both username and password are provided**:

   ```js
   if (!username || !password) {
     return res
       .status(400)
       .json({ message: "Please provide a username and password" });
   }
   ```

3. **Attempt to find the user in the database**:

   ```js
   const user = await User.findOne({ username });
   if (!user) {
     return res.status(401).json({ message: "Invalid username or password" });
   }
   ```

4. **Compare the entered password to the hashed one**:

   ```js
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     return res.status(401).json({ message: "Invalid username or password" });
   }
   ```

5. **Return a success response**:

   ```js
   res.status(200).json({ message: "Login successful" });
   ```

6. **Error handling**:

   ```js
   res.status(500).json({ message: error.message });
   ```

---

## 📘 HTTP Status Codes Reference

| Code | Meaning                                                    |
| ---- | ---------------------------------------------------------- |
| 200  | OK — The request was successful                            |
| 201  | Created — A new resource was created                       |
| 400  | Bad Request — Invalid request syntax                       |
| 401  | Unauthorized — Invalid or missing credentials              |
| 500  | Internal Server Error — Something went wrong on the server |

---

## 📦 Related Modules

- `bcrypt`: Library used for password hashing and comparison
- `User`: Mongoose model representing users in the database

```

---
````
