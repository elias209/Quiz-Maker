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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      questionType: data.get("questionType"),
      maxQuestions: data.get("maxQuestions"),
      file: data.get("file"),
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    // Optionally, reset the file input as well
    document.getElementById("file-input").value = ""; // Reset input field
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Drawer />
      <Container component="main" maxWidth="xs">
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
