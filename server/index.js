require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse"); // Import pdf-parse for PDF text extraction
const mammoth = require("mammoth"); // Import mammoth for DOCX text extraction

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload()); // Enable file upload

// Log environment variables to ensure they are loaded correctly
console.log("ENV VARIABLES:");
console.log("APP_PORT:", process.env.APP_PORT);
console.log("DB_URL:", process.env.DB_URL);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

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

// File parsing functions
const parsePDF = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF file:", error);
    throw new Error("Could not parse PDF file.");
  }
};

const parseDOCX = async (fileBuffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing DOCX file:", error);
    throw new Error("Could not parse DOCX file.");
  }
};

// File upload endpoint
app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("No file uploaded.");
  }

  const file = req.files.file;

  console.log(`Received file: ${file.name} of type: ${file.mimetype}`);

  try {
    let textContent = "";

    if (file.mimetype === "application/pdf") {
      textContent = await parsePDF(file.data);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      textContent = await parseDOCX(file.data);
    } else {
      return res.status(400).send("Unsupported file type.");
    }

    console.log("Extracted text:", textContent); // Log the extracted text
    res.json({ text: textContent }); // Return the extracted text
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file.");
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

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
