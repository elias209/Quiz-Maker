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
import theme from "../theme";

const questionTypes = [
  { value: "open-ended", label: "Open Ended" },
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "true-false", label: "True/False" },
];

export default function Create() {
  const [questionType, setQuestionType] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [extractedText, setExtractedText] = React.useState("");
  const [maxQuestions, setMaxQuestions] = React.useState(5); // Set a default max question limit
  const [quiz, setQuiz] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", file); // Ensure that the file is sent

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
  };

  const handleGenerateQuiz = async () => {
    if (!extractedText || !questionType || !maxQuestions) {
      alert(
        "Please ensure that all fields are filled in and text is extracted."
      );
      return;
    }

    const response = await fetch("http://localhost:3001/generate-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: extractedText,
        questionType: questionType,
        maxQuestions: maxQuestions,
      }),
    });

    const result = await response.json();
    setQuiz(result.quiz);
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: theme.palette.background.paper,
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: theme.palette.primary.main }}
          >
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
                  sx={{ mb: 2 }}
                />
                {file && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {file.name}
                    </Typography>
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
                  value={maxQuestions}
                  onChange={(e) => setMaxQuestions(Number(e.target.value))}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Extract Text
            </Button>
            <Button
              onClick={handleGenerateQuiz}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Quiz
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              maxHeight: 400,
              overflowY: "auto",
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              p: 2,
              mt: 3,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              Extracted Text:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "pre-wrap",
                color: "white",
              }}
            >
              {extractedText}
            </Typography>
          </Box>

          {quiz && (
            <Box
              sx={{
                width: "100%",
                maxHeight: 400,
                overflowY: "auto",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                p: 2,
                mt: 3,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                Generated Quiz:
              </Typography>
              <Box>
                {Array.isArray(quiz) ? (
                  quiz.map((question, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "white", mb: 1 }}
                      >
                        {question.question}
                      </Typography>
                      <ul>
                        {question.options.map((option, i) => (
                          <li key={i}>
                            <Typography variant="body2" sx={{ color: "white" }}>
                              {option}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {JSON.stringify(quiz, null, 2)}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
