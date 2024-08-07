import React, { useState, useEffect } from "react";
import { Box, LinearProgress, Typography, Button, Slide } from "@mui/material";
import theme from "../theme"; // Ensure your theme is imported

const questionsData = [
  {
    question: "What is the capital of France?",
    options: [
      { answer: "Berlin", letter: "a", isCorrect: false },
      { answer: "Madrid", letter: "b", isCorrect: false },
      { answer: "Paris", letter: "c", isCorrect: true },
      { answer: "Rome", letter: "d", isCorrect: false },
    ],
  },
  // ... other questions
];

const Exam = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(60); // Set timer for 60 seconds
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (timer > 0 && !quizFinished) {
      const id = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
    } else if (timer === 0) {
      handleFinishQuiz();
    }
    return () => clearInterval(intervalId); // Cleanup the interval on unmount or when timer changes
  }, [timer, quizFinished]);

  const handleAnswerSelect = (option) => {
    setSelectedOption(option);
    setIsCorrect(option.isCorrect);

    // Update score if the answer is correct
    if (option.isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Update progress bar
    setProgress((prev) => Math.min(prev + 100 / questionsData.length, 100));
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    const nextQuestionIndex = currentQuestionIndex + 1;

    // Check if we reached the end of the quiz
    if (nextQuestionIndex >= questionsData.length) {
      handleFinishQuiz();
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleFinishQuiz = () => {
    clearInterval(intervalId); // Stop the timer
    setQuizFinished(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setProgress(0);
    setScore(0);
    setTimer(60); // Reset the timer to 60 seconds
    setQuizFinished(false);
    clearInterval(intervalId); // Clear any existing interval
    setIntervalId(null);
  };

  // Destructure question and options only if quiz is not finished
  const currentQuestion = !quizFinished
    ? questionsData[currentQuestionIndex]
    : null;
  const question = currentQuestion ? currentQuestion.question : "";
  const options = currentQuestion ? currentQuestion.options : [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "black",
        color: theme.palette.primary.main,
        padding: "0 20%",
      }}
    >
      {/* Timer Display - conditionally rendered */}
      {!quizFinished && (
        <Typography variant="h5" sx={{ mb: 4 }}>
          Time Remaining: {timer}s
        </Typography>
      )}

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "100%", mb: 4, bgcolor: theme.palette.grey[800] }}
      />

      {quizFinished ? (
        // Show Score and Restart/Quit options
        <Slide direction="up" in={true}>
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography variant="h4">Quiz Finished!</Typography>
            <Typography variant="h5">
              Your Score: {score} out of {questionsData.length}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleRestartQuiz}
              sx={{ mt: 2, color: theme.palette.primary.main }}
            >
              Restart Quiz
            </Button>
            <Button
              variant="outlined"
              onClick={() => (window.location.href = "/home")}
              sx={{ mt: 2, color: theme.palette.primary.main }}
            >
              Quit to Home
            </Button>
          </Box>
        </Slide>
      ) : (
        // Question and Answer Options
        <>
          {/* Question Text Box */}
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              textAlign: "left",
              color: theme.palette.primary.main,
            }}
          >
            {question}
          </Typography>

          {/* Answer Options */}
          <Box sx={{ width: "100%" }}>
            {options.map((option, index) => (
              <Button
                key={index}
                variant="contained"
                onClick={() => handleAnswerSelect(option)}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  mb: 2,
                  bgcolor: selectedOption
                    ? isCorrect
                      ? "green"
                      : "red"
                    : theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: selectedOption
                      ? isCorrect
                        ? "green"
                        : "red"
                      : theme.palette.primary.dark,
                  },
                  color: "white",
                  padding: "10px 20px",
                  transition: "background-color 0.3s",
                }}
              >
                {option.letter}) {option.answer}
              </Button>
            ))}
          </Box>

          {selectedOption && (
            <Slide direction="up" in={true}>
              <Box
                sx={{
                  mt: 4,
                  textAlign: "left",
                  color: "white",
                }}
              >
                <Typography variant="h6">
                  {isCorrect ? "Correct!" : "Incorrect!"}
                </Typography>
                <Typography variant="body1">
                  Correct Answer: {options.find((opt) => opt.isCorrect).answer}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleNextQuestion}
                  sx={{ mt: 2, color: theme.palette.primary.main }}
                >
                  Next Question
                </Button>
              </Box>
            </Slide>
          )}
        </>
      )}
    </Box>
  );
};

export default Exam;
