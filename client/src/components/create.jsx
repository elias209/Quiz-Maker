import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Drawer from "./Drawer";

const questionTypes = [
  { value: "open-ended", label: "Open Ended" },
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "true-false", label: "True/False" },
];

const defaultTheme = createTheme();

export default function Create() {
  const [questionType, setQuestionType] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [extractedText, setExtractedText] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    console.log(result); // Print the server response to the console
    if (result.text) {
      setExtractedText(result.text); // Store the extracted text in state
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.getElementById("file-input").value = ""; // Reset input field
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Drawer />
      <Container component="main" maxWidth="lg">
        {" "}
        {/* Change maxWidth to lg */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Quiz
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  inputProps={{
                    accept:
                      "text/plain,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  }}
                  fullWidth
                  variant="outlined"
                  name="file"
                  id="file-input"
                  onChange={handleFileChange}
                  sx={{ mb: 2 }} // Add margin below to separate from other fields
                />
                {file && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">{file.name}</Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleRemoveFile}
                    >
                      Remove
                    </Button>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Question Type"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  fullWidth
                  variant="outlined"
                  name="questionType"
                >
                  {questionTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Max Amount of Questions"
                  fullWidth
                  variant="outlined"
                  name="maxQuestions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Quiz
            </Button>
          </Box>

          {/* Container for displaying extracted text */}
          <Box
            sx={{
              width: "100%", // Make the container full width
              maxHeight: 400, // Set a max height
              overflowY: "auto", // Enable vertical scrolling
              border: "1px solid #ccc", // Optional: Add a border
              borderRadius: 2, // Optional: Rounded corners
              p: 2, // Padding
              mt: 3, // Margin top
              bgcolor: "#f5f5f5", // Optional: Background color
            }}
          >
            <Typography variant="h6">Extracted Text:</Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {extractedText} {/* Display the extracted text */}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
