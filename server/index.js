// index.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import CORS

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON bodies

// Create MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_URL, // Database host
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASS, // Database password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT, // Database port
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Signup route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const checkQuery = "SELECT * FROM users WHERE username = ?";
  connection.query(checkQuery, [username], async (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error checking username", error });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    connection.query(query, [username, hashedPassword], (error) => {
      if (error) {
        return res.status(500).json({ message: "Error creating user", error });
      }
      res.status(201).json({ message: "User created successfully" });
    });
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  connection.query(query, [username], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error fetching user", error });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
});

// Start the server
const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
