import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import HomePage from "./components/homepage";

export default function App() {
  const theme = createTheme({palette: { primary: {main: "#365271"}}})
  return (
    <div className="App">
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <HomePage/>
      </ThemeProvider>
    </div>
  );
}
