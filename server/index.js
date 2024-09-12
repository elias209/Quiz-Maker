require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Log environment variables
console.log("ENV VARIABLES:");
console.log("APP_PORT:", process.env.APP_PORT);
console.log("DB_URL:", process.env.DB_URL);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Example function to use OpenAI
const generateResponse = async (prompt) => {
  try {
    const response = await openai.complete({
      engine: "davinci",
      prompt: prompt,
      maxTokens: 150,
      temperature: 0.7,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Could not generate response.");
  }
};

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

    console.log("Extracted text:", textContent);
    res.json({ text: textContent });
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

// /generate-quiz endpoint
app.post("/generate-quiz", async (req, res) => {
  const { text, questionType, maxQuestions } = req.body;

  console.log("Received request to generate quiz:", {
    text,
    questionType,
    maxQuestions,
  });

  try {
    // Dummy function for generating quiz
    const generateQuiz = async (text, questionType, maxQuestions) => {
      // Replace this with your actual quiz generation logic
      return {
        questions: [
          {
            question: "Sample Question 1",
            options: ["Option A", "Option B"],
            answer: "Option A",
          },
          {
            question: "Sample Question 2",
            options: ["Option C", "Option D"],
            answer: "Option D",
          },
        ].slice(0, maxQuestions),
      };
    };

    const quiz = await generateQuiz(text, questionType, maxQuestions);
    res.json({ quiz });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ error: "Error generating quiz" });
  }
});

// Start the server
const PORT = process.env.APP_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
