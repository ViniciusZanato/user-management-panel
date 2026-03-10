import { Suspense, lazy, useMemo, useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  CssBaseline,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import { getTheme } from "./theme/theme";

const UsersPage = lazy(() => import("./pages/usersPage"));

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("themeMode") as "light" | "dark") ||
      (prefersDarkMode ? "dark" : "light"),
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        }
      >
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
        <UsersPage />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
