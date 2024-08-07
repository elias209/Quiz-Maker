import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material"; // Import Material UI colors

const theme = createTheme({
  palette: {
    mode: "dark", // Set the mode to dark for a black background
    primary: {
      main: colors.deepPurple[500], // Purple for primary color
    },
    secondary: {
      main: colors.deepPurple[300], // Lighter purple for secondary color
    },
    background: {
      default: "#000000", // Set the default background color to black
      paper: "#000000", // Dark background for paper components
    },
  },
});

export default theme;
